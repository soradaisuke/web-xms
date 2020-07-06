/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import React, { useMemo, useCallback } from 'react';
import {
  withRouter,
  useLocation,
  useHistory,
  useParams
} from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'dva';
import { parse } from 'query-string';
import {
  isFunction,
  isPlainObject,
  isString,
  forEach,
  toInteger,
  size,
  isBoolean,
  isUndefined,
  split
} from 'lodash';
import { generateUri } from '@qt/web-common';
import Immutable from 'immutable';
import PageDataContext from '../contexts/PageDataContext';
import showError from './showError';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import RecordPage from '../pages/RecordPage';
import RecordFormPage from '../pages/RecordFormPage';
import PageConfigContext from '../contexts/PageConfigContext';

function generateService({ fetch, create, edit, remove } = {}) {
  return {
    fetchAll: ({ path, page, pagesize, filter, order }) =>
      fetch?.({ path, query: { page, pagesize, filter, order } }) ??
      request.get(path, {
        params: {
          page,
          pagesize,
          order,
          filter: JSON.stringify(filter)
        }
      }),
    fetch: ({ path, id }) =>
      fetch?.({ path, id }) ?? request.get(`${path}${id ? `/${id}` : ''}`),
    create: ({ path, body }) =>
      create?.({ path, body }) ??
      request.post(`${split(path, '?')[0]}`, { body }),
    edit: ({ path, id, body }) =>
      edit?.({ path, id, body }) ??
      request.put(`${split(path, '?')[0]}${id ? `/${id}` : ''}`, { body }),
    remove: ({ path, id }) =>
      remove?.({ path, id }) ??
      request.remove(`${split(path, '?')[0]}${id ? `/${id}` : ''}`)
  };
}

function generateModel({ namespace, service }) {
  const initialState = Immutable.fromJS({
    records: [],
    record: null,
    total: 0
  });

  return {
    namespace,
    state: initialState,
    reducers: {
      saveRecords(state, { payload: { records, total } }) {
        return state
          .set('records', Immutable.fromJS(records))
          .set('total', total);
      },
      saveRecord(state, { payload: { record } }) {
        return state.set('record', record);
      },
      reset() {
        return initialState;
      }
    },
    effects: {
      fetchAll: [
        function* fetchAll(
          { payload: { path, page, pagesize, sort, filter = {} } },
          { call, put }
        ) {
          try {
            const { items: records, total } = yield call(service.fetchAll, {
              path,
              page,
              pagesize,
              filter,
              order: sort
            });
            yield put({ type: 'saveRecords', payload: { total, records } });
          } catch (error) {
            yield put({
              type: 'saveRecords',
              payload: { total: 0, records: [] }
            });
            showError(error.message);
          }
        },
        { type: 'takeLatest' }
      ],
      fetch: [
        function* fetch({ payload: { path, id } }, { call, put }) {
          const record = yield call(service.fetch, { path, id });
          yield put({ type: 'saveRecord', payload: { record } });
        },
        { type: 'takeLatest' }
      ],
      *create({ payload: { path, body } }, { call }) {
        return yield call(service.create, { path, body });
      },
      *edit({ payload: { path, id, body } }, { call }) {
        return yield call(service.edit, { path, id, body });
      },
      *remove({ payload: { path, id } }, { call }) {
        return yield call(service.remove, { path, id });
      }
    }
  };
}

function generateQuery({ namespace, inline, query }) {
  if (inline) {
    return { [namespace]: encodeURIComponent(JSON.stringify(query)) };
  }

  return query;
}

function useApiPath({ path, host }) {
  const matchParams = useParams();

  return useMemo(() => {
    let apiPath = '';
    if (isFunction(path)) {
      apiPath = path(matchParams);
    } else if (isString(path)) {
      apiPath = path;
    }
    if (host) {
      apiPath = `${host}${apiPath}`;
    }
    return apiPath;
  }, [host, matchParams, path]);
}

function useCreateApiDefaultBody(defaultBody) {
  const matchParams = useParams();

  return useMemo(() => {
    if (isFunction(defaultBody)) {
      return defaultBody(matchParams);
    }
    if (isPlainObject(defaultBody)) {
      return defaultBody;
    }
    return null;
  }, [defaultBody, matchParams]);
}

function useCreate({ createApiDefaultBody, apiPath, namespace }) {
  const dispatch = useDispatch();

  return useCallback(
    ({ body }) =>
      dispatch({
        type: `${namespace}/create`,
        payload: {
          path: apiPath,
          body: { ...createApiDefaultBody, ...body }
        }
      }),
    [dispatch, namespace, apiPath, createApiDefaultBody]
  );
}

function useFetch({ apiPath, namespace }) {
  const dispatch = useDispatch();

  return useCallback(
    ({ id } = {}) =>
      dispatch({
        type: `${namespace}/fetch`,
        payload: { path: apiPath, id }
      }),
    [dispatch, namespace, apiPath]
  );
}

function useEdit({ apiPath, namespace }) {
  const dispatch = useDispatch();

  return useCallback(
    ({ id, body }) =>
      dispatch({
        type: `${namespace}/edit`,
        payload: {
          path: apiPath,
          id,
          body
        }
      }),
    [apiPath, dispatch, namespace]
  );
}

function useReset({ namespace }) {
  const dispatch = useDispatch();

  return useCallback(() => dispatch({ type: `${namespace}/reset` }), [
    dispatch,
    namespace
  ]);
}

function useRemove({ apiPath, namespace }) {
  const dispatch = useDispatch();

  return useCallback(
    ({ id }) =>
      dispatch({
        type: `${namespace}/remove`,
        payload: { path: apiPath, id }
      }),
    [apiPath, dispatch, namespace]
  );
}

function generateRecordsPage(
  {
    api: { host, path, fixedFilter, defaultBody, defaultFilter },
    namespace,
    table,
    tableProps = {},
    formProps = {},
    filterFormProps = {}
  },
  component,
  inline
) {
  function Page(props) {
    const location = useLocation();
    const { queries, globalQueries } = useMemo(() => {
      const gq = parse(location.search);
      let q = gq;

      if (inline) {
        try {
          q = JSON.parse(decodeURIComponent(gq[namespace]));
        } catch (e) {
          q = {};
        }
      }

      return { queries: q, globalQueries: gq };
    }, [location.search]);

    const filter = useMemo(() => {
      try {
        return JSON.parse(queries.filter);
      } catch (e) {
        return {};
      }
    }, [queries.filter]);

    const page = useMemo(() => (queries.page ? toInteger(queries.page) : 1), [
      queries.page
    ]);
    const pagesize = useMemo(
      () =>
        queries.pagesize
          ? toInteger(queries.pagesize)
          : tableProps.pagination?.defaultPageSize ?? 10,
      [queries.pagesize]
    );
    const sort = useMemo(() => queries.sort || '', [queries.sort]);

    const { records, total, isLoading } = useSelector(
      state => ({
        records: state[namespace].get('records'),
        total: state[namespace].get('total'),
        isLoading: state.loading.effects[`${namespace}/fetchAll`]
      }),
      shallowEqual
    );

    const history = useHistory();
    const matchParams = useParams();

    const fetchApiFixedFilter = useMemo(() => {
      if (isFunction(fixedFilter)) {
        return fixedFilter(matchParams);
      }
      if (isPlainObject(fixedFilter)) {
        return fixedFilter;
      }
      return null;
    }, [matchParams]);

    const createApiDefaultBody = useCreateApiDefaultBody(defaultBody);

    const apiDefaultFilter = useMemo(() => {
      if (isFunction(defaultFilter)) {
        return defaultFilter(matchParams);
      }
      if (isPlainObject(defaultFilter)) {
        return defaultFilter;
      }
      return null;
    }, [matchParams]);

    const apiPath = useApiPath({ path, host });

    const dispatch = useDispatch();

    const fetch = useCallback(
      // eslint-disable-next-line no-shadow
      ({ page, pagesize, sort, filter = {} }) => {
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
              ...globalQueries,
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
          type: `${namespace}/fetchAll`,
          payload: {
            page,
            pagesize,
            sort,
            filter: { ...filter, ...fetchApiFixedFilter },
            path: apiPath
          }
        });
      },
      [
        apiPath,
        fetchApiFixedFilter,
        apiDefaultFilter,
        queries,
        globalQueries,
        history,
        dispatch
      ]
    );

    const updatePage = useCallback(
      // eslint-disable-next-line no-shadow
      ({ page, pagesize, sort, filter }) => {
        const newFilter = { ...(filter || {}) };
        forEach(newFilter, (v, key) => {
          if (!v && v !== 0 && !isBoolean(v)) {
            delete newFilter[key];
          }
        });
        const newQuery = {
          page,
          pagesize,
          sort,
          filter: JSON.stringify(newFilter)
        };
        forEach(newQuery, (v, key) => {
          if (key !== 'sort' && (isUndefined(v) || v === '')) {
            delete newQuery[key];
          }
        });
        const uri = generateUri(
          window.location.href.substring(
            0,
            window.location.href.length - window.location.search.length
          ),
          {
            ...globalQueries,
            ...generateQuery({ namespace, inline, query: newQuery })
          }
        );
        history.push(uri.href.substring(uri.origin.length, uri.href.length));
      },
      [history, globalQueries]
    );

    const create = useCreate({ createApiDefaultBody, apiPath, namespace });
    const edit = useEdit({ apiPath, namespace });
    const remove = useRemove({ apiPath, namespace });

    const pageConfig = useMemo(
      () => ({
        formProps,
        tableProps,
        filterFormProps,
        inline,
        table,
        component,
        fetch,
        create,
        edit,
        remove,
        updatePage
      }),
      [fetch, create, edit, remove, updatePage]
    );

    const pageDataValue = useMemo(() => ({ filter, records }), [
      filter,
      records
    ]);

    return (
      <PageConfigContext.Provider value={pageConfig}>
        <PageDataContext.Provider value={pageDataValue}>
          <RecordsPage
            {...props}
            records={records}
            total={total}
            isLoading={isLoading}
            filter={filter}
            page={page}
            pagesize={pagesize}
            sort={sort}
          />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return Page;
}

function generateRecordPage(
  {
    namespace,
    api: { path, host } = {},
    table,
    layout,
    inline,
    formProps = {},
    descriptionsProps = {}
  },
  component
) {
  function Page(props) {
    const { record, isLoading } = useSelector(
      state => ({
        record: state[namespace].get('record'),
        isLoading: state.loading.effects[`${namespace}/fetch`]
      }),
      shallowEqual
    );

    const apiPath = useApiPath({ path, host });
    const fetch = useFetch({ apiPath, namespace });
    const edit = useEdit({ apiPath, namespace });
    const remove = useRemove({ apiPath, namespace });
    const reset = useReset({ namespace });

    return (
      <PageConfigContext.Provider
        value={{
          layout,
          formProps,
          descriptionsProps,
          inline,
          table,
          component,
          fetch,
          edit,
          remove,
          reset
        }}
      >
        <PageDataContext.Provider value={record}>
          <RecordPage
            {...props}
            isLoading={isLoading}
            record={record}
            inline={inline}
          />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return Page;
}

function generateRecordFormPage({
  namespace,
  formPageConfig = {},
  formProps = {},
  api: { path, host, defaultBody } = {},
  table
}) {
  function Page(props) {
    const record = useSelector(state => state[namespace].get('record'));
    const apiPath = useApiPath({ path, host });
    const createApiDefaultBody = useCreateApiDefaultBody(defaultBody);
    const fetch = useFetch({ apiPath, namespace });
    const create = useCreate({ createApiDefaultBody, apiPath, namespace });
    const edit = useEdit({ apiPath, namespace });
    const remove = useRemove({ apiPath, namespace });
    const reset = useReset({ namespace });

    return (
      <PageConfigContext.Provider
        value={{
          formProps,
          create,
          edit,
          remove,
          table
        }}
      >
        <PageDataContext.Provider value={record}>
          <RecordFormPage
            {...props}
            {...formPageConfig}
            table={table}
            record={record}
            fetch={fetch}
            create={create}
            edit={edit}
            remove={remove}
            reset={reset}
          />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return withRouter(Page);
}

function dynamicComponent({
  app,
  config,
  inline,
  component,
  generateFunction
}) {
  const service = generateService(config.api);
  const model = generateModel({
    namespace: config.namespace,
    service
  });

  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () =>
      Promise.resolve(generateFunction(config, component, inline))
  });
}

export function dynamicRecordsComponent({ app, config, component, inline }) {
  return dynamicComponent({
    app,
    config,
    component,
    inline,
    generateFunction: generateRecordsPage
  });
}

export function dynamicRecordComponent({ app, config, component }) {
  return dynamicComponent({
    app,
    config,
    component,
    generateFunction: generateRecordPage
  });
}

export function dynamicRecordFormComponent({ app, config }) {
  return dynamicComponent({
    app,
    config,
    generateFunction: generateRecordFormPage
  });
}
