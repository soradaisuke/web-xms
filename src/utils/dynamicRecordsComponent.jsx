/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { parse } from 'query-string';
import {
  upperFirst, isFunction, isPlainObject, isString, forEach, toInteger,
} from 'lodash';
import { generateUri } from 'web-core';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';

function generateService({ actions, primaryKey }) {
  const service = {
    fetch: async ({ path, ...params }) => request.get(path, { params }),
  };

  forEach(actions, (action) => {
    if (action === 'create') {
      service.create = async ({ path, body }) => request.post(`${path}`, { body });
    } else if (action === 'edit') {
      service.edit = async ({ path, body }) => request.put(`${path}/${body[primaryKey]}`, { body });
    } else if (action === 'remove') {
      service.remove = async ({ path, body }) => request.remove(`${path}/${body[primaryKey]}`);
    } else if (action === 'order') {
      service.order = async ({ path, body }) => request.put(`${path}/${body[primaryKey]}`, { body });
    }
  });

  return service;
}

function generateModel({
  namespace, actions, schema, orderKey,
}, service) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  const model = {
    namespace,
    state: Immutable.fromJS({
      schema,
      records: [],
      total: 0,
    }),
    reducers: {
      save(state, { payload: { records, total } }) {
        return state.merge(Immutable.fromJS({ records, total }));
      },
      saveFilters(state, { payload: { filters, index } }) {
        return state.set('schema', state.get('schema').setIn([index, 'filters'], filters).setIn([index, 'enabledFilters'], filters.filter(({ disabled }) => !disabled)));
      },
    },
    effects: {
      fetch: [function* fetch(
        {
          payload: {
            path, page, pagesize, sort, search = {}, filter = {},
          },
        },
        { call, put },
      ) {
        const currentFiler = { ...filter, ...search };

        for (let i = 0; i < schema.length; i += 1) {
          if (isFunction(schema[i].filters)) {
            yield put({ type: 'getFilters', payload: { index: i, filtersFunc: schema[i].filters, currentFiler } });
          }
        }

        const { items: records, total } = yield call(service.fetch, {
          path, page, pagesize, filter: JSON.stringify(currentFiler), order: sort,
        });
        yield put({ type: 'save', payload: { total, records } });
      }, { type: 'takeLatest' }],
      * getFilters({ payload: { index, filtersFunc, currentFiler } }, { call, put }) {
        const filters = yield call(filtersFunc, currentFiler);
        yield put({ type: 'saveFilters', payload: { index, filters } });
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
      model.effects.remove = function* modelRemove({ payload: { path, body } }, { call }) {
        yield call(service.remove, { path, body });
      };
    } else if (action === 'order') {
      model.effects.order = function* modelOrder({ payload: { path, body, diff } }, { call }) {
        yield call(service.order, {
          path, body: { ...body, [orderKey]: body[orderKey] + diff },
        });
      };
    }
  });

  return model;
}

function generateRecordsPage({
  namespace, actions, api: { host, path, defaultFilter },
  primaryKey, searchFileds, defaultSort, defaultFilter: defaultFilterQuery,
}, component) {
  const customActions = actions.filter(action => isPlainObject(action));
  const customGlobalActions = customActions.filter(({ global }) => global);
  const customMultipleActions = customActions.filter(({ multiple }) => multiple);
  const customRowActions = customActions.filter(({ global }) => !global);

  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordsPage
          {...this.props}
          component={component}
          primaryKey={primaryKey}
          customGlobalActions={customGlobalActions}
          customMultipleActions={customMultipleActions}
          customRowActions={customRowActions}
          searchFileds={searchFileds}
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

  const searchSelector = createSelector(
    [
      queries => queries.search,
    ],
    (search) => {
      try {
        return JSON.parse(search);
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

  const mapStateToProps = (state, props) => {
    const queries = parse(props.location.search);
    return {
      filter: filterSelector(queries),
      page: queries.page ? toInteger(queries.page) : 1,
      pagesize: queries.pagesize ? toInteger(queries.pagesize) : 10,
      records: state[namespace].get('records'),
      schema: schemaSelector(state),
      search: searchSelector(queries) || {},
      sort: queries.sort || '',
      total: state[namespace].get('total'),
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: matchParams }, history, location } = ownProps;

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
    if (host) {
      apiPath = `${host}${apiPath}`;
    }

    const props = {
      fetch: async ({
        page, pagesize, sort, search, filter = {},
      }) => {
        const queries = parse(location.search);

        if ((defaultSort || defaultFilterQuery)
          && (!queries || Object.keys(queries).length === 0)) {
          const uri = generateUri(window.location.href, {
            filter: JSON.stringify(defaultFilterQuery),
            sort: defaultSort,
          });
          history.replace(uri.href.substring(uri.origin.length, uri.href.length));

          return Promise.resolve();
        }

        return dispatch({
          type: `${namespace}/fetch`,
          payload: {
            page, pagesize, sort, search, filter: { ...filter, ...apiDefaultFilter }, path: apiPath,
          },
        });
      },
      updatePage: async ({
        page, pagesize, sort, search, filter = {},
      }) => {
        const uri = generateUri(window.location.href, {
          page, pagesize, sort, filter: JSON.stringify(filter), search: JSON.stringify(search),
        });
        history.push(uri.href.substring(uri.origin.length, uri.href.length));
      },
    };

    forEach(actions, (action) => {
      if (action === 'create') {
        props.create = async body => dispatch({ type: `${namespace}/create`, payload: { path: apiPath, body: { ...body, ...apiDefaultFilter } } });
      } else if (action === 'edit') {
        props.edit = async body => dispatch({ type: `${namespace}/edit`, payload: { path: apiPath, body } });
      } else if (action === 'remove') {
        props.remove = async body => dispatch({ type: `${namespace}/remove`, payload: { path: apiPath, body } });
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
  const model = generateModel(config, service);
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
