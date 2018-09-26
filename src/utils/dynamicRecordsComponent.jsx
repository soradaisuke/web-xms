/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'react-router';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { parse } from 'query-string';
import {
  upperFirst, isFunction, isPlainObject, isString, forEach, toInteger,
} from 'lodash';
import generateUri from './generateUri';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import DataType from '../constants/DataType';

const { ORDER } = DataType;

function generateService({ actions }) {
  const service = {
    fetch: async ({ path, ...params }) => request.get(path, { params }),
  };

  forEach(actions, (action) => {
    if (action === 'create') {
      service.create = async ({ path, body }) => request.post(`${path}`, { body });
    } else if (action === 'edit') {
      service.edit = async ({ path, body }) => request.put(`${path}/${body.id}`, { body });
    } else if (action === 'remove') {
      service.remove = async ({ path, id }) => request.remove(`${path}/${id}`);
    } else if (action === 'order') {
      service.order = async ({ path, body }) => request.put(`${path}/${body.id}`, { body });
    }
  });

  return service;
}

function generateModel({ namespace, actions, schema }, service, app) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }
  let defaultSort;
  let orderField;
  const searchFileds = [];
  forEach(schema, (definition, index) => {
    if (definition.sort && definition.defaultSort) {
      defaultSort = `${definition.key} ${definition.defaultSort}`;
    }
    if (definition.search) {
      searchFileds.push({ key: definition.key, title: definition.title });
    }
    if (definition.type === ORDER) {
      orderField = definition.key;
    }
    if (isFunction(definition.filters)) {
      definition.filters().then(filters => (
        app._store.dispatch({ // eslint-disable-line no-underscore-dangle
          type: `${namespace}/saveFilters`,
          payload: {
            filters, index,
          },
        })
      ));
    }
  });

  const model = {
    namespace,
    state: Immutable.fromJS({
      schema,
      records: [],
      total: 0,
      defaultSort,
      canSearch: searchFileds.length > 0,
      searchPlaceHolder: searchFileds.map(filed => filed.title).join('、'),
    }),
    reducers: {
      save(state, { payload: { records, total } }) {
        return state.merge(Immutable.fromJS({ records, total }));
      },
      saveFilters(state, { payload: { filters, index } }) {
        return state.set('schema', state.get('schema').setIn([index, 'filters'], filters));
      },
    },
    effects: {
      * fetch({
        payload: {
          path, page, pagesize, sort, search, filter = {},
        },
      }, { call, put }) {
        const f = filter;

        if (search) {
          if (searchFileds.length === 1) {
            f[searchFileds[0].key] = search;
          } else {
            f.$or = searchFileds.reduce((acc, field) => {
              acc.push({ [field.key]: search });
              return acc;
            }, []);
          }
        }

        const { items: records, total } = yield call(service.fetch, {
          path, page, pagesize, filter: JSON.stringify(f), order: sort,
        });
        yield put({ type: 'save', payload: { total, records } });
      },
    },
  };

  forEach(actions, (action) => {
    if (action === 'create') {
      model.effects.create = function* modelCreate({ payload: { path, body } }, { call }) {
        yield call(service.create, { path, body });
      };
    } else if (action === 'edit') {
      model.effects.edit = function* modelEdit({ payload: { path, body } }, { call }) {
        yield call(service.edit, { path, body });
      };
    } else if (action === 'remove') {
      model.effects.remove = function* modelRemove({ payload: { path, id } }, { call }) {
        yield call(service.remove, { path, id });
      };
    } else if (action === 'order') {
      model.effects.order = function* modelOrder({ payload: { path, body, diff } }, { call }) {
        yield call(service.order, {
          path, body: { ...body, [orderField]: body[orderField] + diff },
        });
      };
    }
  });

  return model;
}

function generateRecordsPage({
  namespace, actions, api: { path, defaultFilter },
}, component) {
  const customActions = actions.filter(action => isPlainObject(action));

  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordsPage
          {...this.props}
          component={component}
          customActions={customActions}
        />
      );
    }
  }

  const filterSelector = createSelector(
    [
      queries => queries.filter,
    ],
    (filter) => {
      try {
        return JSON.parse(filter);
      } catch (e) {
        return {};
      }
    },
  );

  const schemaSelector = createSelector(
    [
      state => state[namespace].get('schema'),
    ],
    schema => schema.toJS(),
  );

  const mapStateToProps = (state) => {
    const queries = parse(window.location.search);
    return {
      filter: filterSelector(queries),
      schema: schemaSelector(state),
      canSearch: state[namespace].get('canSearch'),
      searchPlaceHolder: state[namespace].get('searchPlaceHolder'),
      page: queries.page ? toInteger(queries.page) : 1,
      pagesize: queries.pagesize ? toInteger(queries.pagesize) : 10,
      sort: queries.sort || state[namespace].get('defaultSort'),
      search: queries.search,
      records: state[namespace].get('records'),
      total: state[namespace].get('total'),
      searchFileds: state[namespace].get('searchFileds'),
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: matchParams } } = ownProps;

    let apiDefaultFilter = {};
    if (isFunction(defaultFilter)) {
      apiDefaultFilter = defaultFilter(matchParams);
    } else if (isPlainObject(defaultFilter)) {
      apiDefaultFilter = defaultFilter;
    }

    let apiPath = '';
    if (isFunction(path)) {
      apiPath = path(matchParams);
    } else if (isString(path)) {
      apiPath = path;
    }

    const props = {
      fetch: async ({
        page, pagesize, sort, search, filter = {},
      }) => dispatch({
        type: `${namespace}/fetch`,
        payload: {
          page, pagesize, sort, search, filter: { ...filter, ...apiDefaultFilter }, path: apiPath,
        },
      }),
      async updatePage({
        page, pagesize, sort, search, filter = {},
      }) {
        const uri = generateUri(window.location.href, {
          page, pagesize, search, sort, filter: JSON.stringify(filter),
        });
        return dispatch(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
      },
    };

    forEach(actions, (action) => {
      if (action === 'create') {
        props.create = async body => dispatch({ type: `${namespace}/create`, payload: { path: apiPath, body: { ...body, ...apiDefaultFilter } } });
      } else if (action === 'edit') {
        props.edit = async body => dispatch({ type: `${namespace}/edit`, payload: { path: apiPath, body } });
      } else if (action === 'remove') {
        props.remove = async id => dispatch({ type: `${namespace}/remove`, payload: { path: apiPath, id } });
      } else if (action === 'order') {
        props.order = async (body, diff) => dispatch({ type: `${namespace}/order`, payload: { path: apiPath, body, diff } });
      }
    });

    return props;
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordsComponent({ app, config, component }) {
  const service = generateService(config);
  const model = generateModel(config, service, app);
  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordsPage(config, component)),
  });
}

export default function dynamicRecordsComponent({ app, config, component }) {
  if (!app) {
    throw new Error('dynamicRecordsComponent: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecordsComponent: config is required');
  }

  if (isFunction(config)) {
    return dynamic({
      app,
      resolve: () => config().then(c => (
        generateDynamicRecordsComponent({ app, config: c.default || c, component })
      )),
    });
  }

  return generateDynamicRecordsComponent({ app, config, component });
}
