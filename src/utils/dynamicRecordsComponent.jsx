/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { parse } from 'query-string';
import {
  upperFirst,
  isFunction,
  isPlainObject,
  isString,
  forEach,
  toInteger,
  get,
  findIndex,
  isUndefined
} from 'lodash';
import { generateUri } from '@qt/web-core';
import ColumnTypes from './ColumnTypes';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';

function generateService({ api: { fetch } = {}, actions, primaryKey }) {
  const service = {
    fetch: async ({ path, ...params }) =>
      fetch ? fetch({ path, query: params }) : request.get(path, { params })
  };

  forEach(actions, action => {
    if (action === 'create') {
      service.create = async ({ path, body }) =>
        request.post(`${path}`, { body });
    } else if (action === 'edit' || action === 'inlineEdit') {
      service.edit = async ({ path, body }) =>
        request.put(`${path}/${get(body, primaryKey)}`, { body });
    } else if (action === 'remove') {
      service.remove = async ({ path, body }) =>
        request.remove(`${path}/${get(body, primaryKey)}`);
    } else if (action === 'order') {
      service.order = async ({ path, body }) =>
        request.put(`${path}/${get(body, primaryKey)}`, { body });
    }
  });

  return service;
}

function generateModel({ namespace, actions, table, orderKey }, service) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  const model = {
    namespace,
    state: Immutable.fromJS({
      table,
      records: [],
      total: 0,
      error: null
    }),
    reducers: {
      save(
        state,
        {
          payload: { records, total }
        }
      ) {
        return state.merge(Immutable.fromJS({ records, total }));
      },
      saveFilters(
        state,
        {
          payload: { filters, index }
        }
      ) {
        return state.set(
          'table',
          state
            .get('table')
            .setIn([index, 'filters'], filters)
            .setIn(
              [index, 'enabledFilters'],
              filters.filter(({ disabled }) => !disabled)
            )
        );
      },
      saveModalFilters(
        state,
        {
          payload: { filters, index }
        }
      ) {
        return state.set(
          'table',
          state.get('table').setIn([index, 'modalFilters'], filters)
        );
      },
      saveError(
        state,
        {
          payload: { error }
        }
      ) {
        return state.set('error', error);
      }
    },
    effects: {
      fetch: [
        function* fetch(
          { payload: { path, page, pagesize, sort, search = {}, filter = {} } },
          { call, put }
        ) {
          yield put({ type: 'saveError', payload: { error: null } });
          const currentFiler = { ...filter, ...search };

          for (let i = 0; i < table.length; i += 1) {
            if (isFunction(table[i].filters)) {
              yield put({
                type: 'getFilters',
                payload: {
                  index: i,
                  filtersFunc: table[i].filters,
                  currentFiler
                }
              });
            }
          }

          try {
            const { items: records, total } = yield call(service.fetch, {
              path,
              page,
              pagesize,
              filter: JSON.stringify(currentFiler),
              order: sort
            });
            yield put({ type: 'save', payload: { total, records } });
          } catch (error) {
            yield put({ type: 'saveError', payload: { error } });
          }
        },
        { type: 'takeLatest' }
      ],
      *getFilters(
        {
          payload: { index, filtersFunc, currentFiler }
        },
        { call, put }
      ) {
        const filters = yield call(filtersFunc, currentFiler);
        yield put({ type: 'saveFilters', payload: { index, filters } });
      },
      *updateModalFilters(
        {
          payload: { mapKey, formFieldsValue }
        },
        { call, put }
      ) {
        const index = findIndex(table, ({ mapKey: mk }) => mk === mapKey);
        const targetTable = table[index];
        if (targetTable && isFunction(targetTable.filters)) {
          const filters = yield call(targetTable.filters, formFieldsValue);
          yield put({ type: 'saveModalFilters', payload: { index, filters } });
        }
      }
    }
  };

  forEach(actions, action => {
    if (action === 'create') {
      model.effects.create = function* modelCreate(
        { payload: { path, body } },
        { call }
      ) {
        yield call(service.create, { path, body });
      };
    } else if (action === 'edit' || action === 'inlineEdit') {
      model.effects.edit = function* modelEdit(
        { payload: { path, body } },
        { call }
      ) {
        yield call(service.edit, { path, body });
      };
    } else if (action === 'remove') {
      model.effects.remove = function* modelRemove(
        { payload: { path, body } },
        { call }
      ) {
        yield call(service.remove, { path, body });
      };
    } else if (action === 'order') {
      model.effects.order = function* modelOrder(
        { payload: { path, body, diff } },
        { call }
      ) {
        yield call(service.order, {
          path,
          body: { ...body, [orderKey]: body[orderKey] + diff }
        });
      };
    }
  });

  return model;
}

function generateRecordsPage(
  {
    api: { host, path, defaultFilter },
    namespace,
    actions,
    primaryKey,
    searchFields,
    fixedSort,
    defaultSort,
    table,
    defaultFilter: defaultFilterQuery
  },
  component
) {
  const customActions = actions.filter(action => isPlainObject(action));
  const customGlobalActions = customActions.filter(
    ({ global, multiple }) => global && !multiple
  );
  const customMultipleActions = customActions.filter(
    ({ multiple }) => multiple
  );
  const customRowActions = customActions.filter(({ global }) => !global);
  const customMultipleEdits = table.filter(({ multipleEdit }) => multipleEdit);

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
          searchFields={searchFields}
          defaultFilter={defaultFilterQuery}
          customMultipleEdits={customMultipleEdits}
        />
      );
    }
  }

  const filterSelector = createSelector(
    [queries => queries.filter],
    filter => {
      try {
        return JSON.parse(filter);
      } catch (e) {
        return {};
      }
    }
  );

  const searchSelector = createSelector(
    [queries => queries.search],
    search => {
      try {
        return JSON.parse(search);
      } catch (e) {
        return {};
      }
    }
  );

  const tableSelector = createSelector(
    [state => state[namespace].get('table')],
    sche => sche.toJS()
  );

  const filterInGroupTables = createSelector(
    [state => state[namespace].get('table')],
    sche => {
      const tables = sche.toJS();
      return tables.filter(
        ({ type, canFilter, invisible, filterTree }) =>
          canFilter &&
          (type === ColumnTypes.date ||
            type === ColumnTypes.datetime ||
            type === ColumnTypes.number ||
            invisible ||
            filterTree)
      );
    }
  );

  const mapStateToProps = (state, props) => {
    const queries = parse(props.location.search);
    return {
      filter: filterSelector(queries),
      page: queries.page ? toInteger(queries.page) : 1,
      pagesize: queries.pagesize ? toInteger(queries.pagesize) : 10,
      records: state[namespace].get('records'),
      table: tableSelector(state),
      filterInGroupTables: filterInGroupTables(state),
      search: searchSelector(queries) || {},
      sort: queries.sort || '',
      total: state[namespace].get('total'),
      isLoading: state.loading.effects[`${namespace}/fetch`],
      error: state[namespace].get('error')
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const {
      match: { params: matchParams },
      history,
      location
    } = ownProps;

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
      fetch: async ({ page, pagesize, sort, search, filter = {} }) => {
        const queries = parse(location.search);

        if (
          (fixedSort && fixedSort !== sort) ||
          ((defaultSort || defaultFilterQuery) &&
            (!queries || Object.keys(queries).length === 0))
        ) {
          const uri = generateUri(window.location.href, {
            filter: JSON.stringify(defaultFilterQuery),
            sort: fixedSort || defaultSort
          });
          history.replace(
            uri.href.substring(uri.origin.length, uri.href.length)
          );

          return Promise.resolve();
        }

        return dispatch({
          type: `${namespace}/fetch`,
          payload: {
            page,
            pagesize,
            sort,
            search,
            filter: { ...filter, ...apiDefaultFilter },
            path: apiPath
          }
        });
      },
      updateModalFilters: async (mapKey, formFieldsValue) =>
        dispatch({
          type: `${namespace}/updateModalFilters`,
          payload: {
            mapKey,
            formFieldsValue
          }
        }),
      updatePage: async ({ page, pagesize, sort, search, filter }) => {
        const newQuery = {
          page,
          pagesize,
          sort,
          filter: isUndefined(filter) ? filter : JSON.stringify(filter),
          search: isUndefined(search) ? search : JSON.stringify(search)
        };
        forEach(newQuery, (v, key) => {
          if (isUndefined(v)) delete newQuery[key];
        });
        const uri = generateUri(window.location.href, newQuery);
        history.push(uri.href.substring(uri.origin.length, uri.href.length));
      }
    };

    forEach(actions, action => {
      if (action === 'create') {
        props.create = async body =>
          dispatch({
            type: `${namespace}/create`,
            payload: { path: apiPath, body: { ...body, ...apiDefaultFilter } }
          });
      } else if (action === 'edit' || action === 'inlineEdit') {
        props[action] = async body =>
          dispatch({
            type: `${namespace}/edit`,
            payload: { path: apiPath, body }
          });
      } else if (action === 'remove') {
        props.remove = async body =>
          dispatch({
            type: `${namespace}/remove`,
            payload: { path: apiPath, body }
          });
      } else if (action === 'order') {
        props.order = async (body, diff) =>
          dispatch({
            type: `${namespace}/order`,
            payload: { path: apiPath, body, diff }
          });
      } else if (action === 'create_in_new_page') {
        props.hasCreateNew = true;
      }
    });

    return props;
  };

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Page)
  );
}

function generateDynamicRecordsComponent({ app, config, component }) {
  const service = generateService(config);
  const model = generateModel(config, service);
  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordsPage(config, component))
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
      resolve: () =>
        config().then(c =>
          generateDynamicRecordsComponent({
            app,
            config: c.default || c,
            component
          })
        )
    });
  }

  return generateDynamicRecordsComponent({ app, config, component });
}
