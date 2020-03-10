/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'react-router-dom';
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
  size,
  isUndefined,
  split
} from 'lodash';
import { generateUri } from '@qt/web-core';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';

function generateService({ api: { fetch } = {} }) {
  const service = {
    fetch: async ({ path, page, pagesize, filter, order }) =>
      fetch
        ? fetch({ path, query: { page, pagesize, filter, order } })
        : request.get(path, {
            params: {
              page,
              pagesize,
              order,
              filter: JSON.stringify(filter)
            }
          }),
    remove: async ({ path, id }) =>
      request.remove(`${split(path, '?')[0]}/${id}`),
    create: async ({ path, body }) =>
      request.post(`${split(path, '?')[0]}`, { body }),
    edit: async ({ path, id, body }) =>
      request.put(`${split(path, '?')[0]}/${id}`, { body })
  };

  return service;
}

function generateModel({ namespace, table }, service) {
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
          { payload: { path, page, pagesize, sort, filter = {} } },
          { call, put }
        ) {
          yield put({ type: 'saveError', payload: { error: null } });

          try {
            const { items: records, total } = yield call(service.fetch, {
              path,
              page,
              pagesize,
              filter,
              order: sort
            });
            yield put({ type: 'save', payload: { total, records } });
          } catch (error) {
            yield put({ type: 'saveError', payload: { error } });
          }
        },
        { type: 'takeLatest' }
      ],
      remove: function* modelRemove({ payload: { path, id } }, { call }) {
        return yield call(service.remove, { path, id });
      },
      create: function* modelCreate({ payload: { path, body } }, { call }) {
        return yield call(service.create, { path, body });
      },
      edit: function* modelEdit({ payload: { path, id, body } }, { call }) {
        return yield call(service.edit, { path, id, body });
      }
    }
  };

  return model;
}

function generateQuery({ namespace, inline, query }) {
  if (inline) {
    return { [namespace]: encodeURIComponent(JSON.stringify(query)) };
  }

  return query;
}

function getQuery({ namespace, inline, search }) {
  let queries = parse(search);

  if (inline) {
    try {
      queries = JSON.parse(decodeURIComponent(queries[namespace]));
    } catch (e) {
      queries = {};
    }
  }

  return queries;
}

function generateRecordsPage(
  {
    api: { host, path, fixedFilter, defaultBody, defaultFilter },
    namespace,
    actions,
    table,
    defaultPageSize = 10,
    tableScroll,
    paginationComponentProps = {}
  },
  component,
  inline
) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordsPage
          {...this.props}
          component={component}
          table={table}
          actions={actions}
          tableScroll={tableScroll}
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

  const mapStateToProps = (state, props) => {
    const queries = getQuery({
      namespace,
      inline,
      search: props.location.search
    });

    return {
      paginationComponentProps,
      filter: filterSelector(queries),
      page: queries.page ? toInteger(queries.page) : 1,
      pagesize: queries.pagesize
        ? toInteger(queries.pagesize)
        : defaultPageSize,
      records: state[namespace].get('records'),
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

    let fetchApiFixedFilter = {};
    if (isFunction(fixedFilter)) {
      fetchApiFixedFilter = fixedFilter(matchParams);
    } else if (isPlainObject(fixedFilter)) {
      fetchApiFixedFilter = fixedFilter;
    }

    let createApiDefaultBody = {};
    if (isFunction(defaultBody)) {
      createApiDefaultBody = defaultBody(matchParams);
    } else if (isPlainObject(defaultBody)) {
      createApiDefaultBody = defaultBody;
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

    let apiDefaultFilter;
    if (isFunction(defaultFilter)) {
      apiDefaultFilter = defaultFilter(matchParams);
    } else if (isPlainObject(defaultFilter)) {
      apiDefaultFilter = defaultFilter;
    }

    const props = {
      fetch: async ({ page, pagesize, sort, filter = {} }) => {
        const preQueries = parse(location.search);
        const queries = getQuery({
          namespace,
          inline,
          search: location.search
        });

        if (
          (table.getFixedSortOrder() && table.getFixedSortOrder() !== sort) ||
          ((table.getDefaultSortOrder() ||
            table.getDefaultFilter() ||
            (apiDefaultFilter && size(apiDefaultFilter))) &&
            (!queries || Object.keys(queries).length === 0))
        ) {
          const uri = generateUri(
            window.location.href.substring(
              0,
              window.location.href.length - window.location.search.length
            ),
            {
              ...preQueries,
              ...generateQuery({
                namespace,
                inline,
                query: {
                  filter: JSON.stringify({
                    ...(table.getDefaultFilter() || {}),
                    ...apiDefaultFilter
                  }),
                  sort: table.getFixedSortOrder() || table.getDefaultSortOrder()
                }
              })
            }
          );
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
            filter: { ...filter, ...fetchApiFixedFilter },
            path: apiPath
          }
        });
      },
      remove: async ({ id }) =>
        dispatch({
          type: `${namespace}/remove`,
          payload: { path: apiPath, id }
        }),
      updatePage: async ({ page, pagesize, sort, filter }) => {
        const newQuery = {
          page,
          pagesize,
          sort,
          filter: isUndefined(filter) ? filter : JSON.stringify(filter)
        };
        forEach(newQuery, (v, key) => {
          if (key !== 'sort' && (isUndefined(v) || v === '')) {
            delete newQuery[key];
          }
        });
        const preQueries = parse(window.location.search);
        const uri = generateUri(
          window.location.href.substring(
            0,
            window.location.href.length - window.location.search.length
          ),
          {
            ...preQueries,
            ...generateQuery({ namespace, inline, query: newQuery })
          }
        );
        history.push(uri.href.substring(uri.origin.length, uri.href.length));
      },
      create: async ({ body }) =>
        dispatch({
          type: `${namespace}/create`,
          payload: {
            path: apiPath,
            body: { ...createApiDefaultBody, ...body }
          }
        }),
      edit: async ({ id, body }) =>
        dispatch({
          type: `${namespace}/edit`,
          payload: {
            path: apiPath,
            id,
            body: { ...createApiDefaultBody, ...body }
          }
        })
    };

    return props;
  };

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Page)
  );
}

function generateDynamicRecordsComponent({ app, config, component, inline }) {
  const service = generateService(config);
  const model = generateModel(config, service);
  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () =>
      Promise.resolve(generateRecordsPage(config, component, inline))
  });
}

export default function dynamicRecordsComponent({
  app,
  config,
  component,
  inline
}) {
  if (!app) {
    throw new Error('dynamicRecordsComponent: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecordsComponent: config is required');
  }

  return generateDynamicRecordsComponent({ app, config, component, inline });
}
