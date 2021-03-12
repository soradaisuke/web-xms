/* eslint-disable react/no-multi-comp */
import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch, dynamic, router } from 'dva';
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
  split,
} from 'lodash';
import { useEventCallback } from '@qt/react';
import { generateUri } from '@qt/web-common';
import Immutable from 'immutable';
import PageDataContext from '../contexts/PageDataContext';
import showError from './showError';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import RecordPage from '../pages/RecordPage';
import RecordFormPage from '../pages/RecordFormPage';
import PageConfigContext from '../contexts/PageConfigContext';
import usePageData from '../hooks/usePageData';
import useUser from '../hooks/useUser';

const { withRouter, useLocation, useHistory, useParams } = router;

function generateService({
  retrieve: fetch,
  create,
  update: edit,
  delete: remove,
} = {}) {
  return {
    fetchAll: ({ path, page, pagesize, filter, order }) =>
      fetch?.({ path, query: { page, pagesize, filter, order } }) ??
      request.get(path, {
        params: {
          page,
          pagesize,
          order,
          filter: JSON.stringify(filter),
        },
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
      request.remove(`${split(path, '?')[0]}${id ? `/${id}` : ''}`),
  };
}

function generateModel({ namespace, service }) {
  const initialState = Immutable.fromJS({
    records: [],
    record: null,
    total: 0,
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
      },
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
              order: sort,
            });
            yield put({ type: 'saveRecords', payload: { total, records } });
          } catch (error) {
            yield put({
              type: 'saveRecords',
              payload: { total: 0, records: [] },
            });
            showError(error.message);
          }
        },
        { type: 'takeLatest' },
      ],
      fetch: [
        function* fetch({ payload: { path, id } }, { call, put }) {
          const record = yield call(service.fetch, { path, id });
          yield put({ type: 'saveRecord', payload: { record } });
        },
        { type: 'takeLatest' },
      ],
      *create({ payload: { path, body } }, { call }) {
        return yield call(service.create, { path, body });
      },
      *edit({ payload: { path, id, body } }, { call }) {
        return yield call(service.edit, { path, id, body });
      },
      *remove({ payload: { path, id } }, { call }) {
        return yield call(service.remove, { path, id });
      },
    },
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

  return useEventCallback(
    ({ body }) =>
      dispatch({
        type: `${namespace}/create`,
        payload: {
          path: apiPath,
          body: { ...createApiDefaultBody, ...body },
        },
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
        payload: { path: apiPath, id },
      }),
    [dispatch, namespace, apiPath]
  );
}

function useEdit({ apiPath, namespace, ignoreId }) {
  const dispatch = useDispatch();

  return useEventCallback(
    ({ id, body }) =>
      dispatch({
        type: `${namespace}/edit`,
        payload: {
          path: apiPath,
          id: ignoreId ? undefined : id,
          body,
        },
      }),
    [apiPath, dispatch, namespace, ignoreId]
  );
}

function useReset({ namespace }) {
  const dispatch = useDispatch();

  return useEventCallback(() => dispatch({ type: `${namespace}/reset` }), [
    dispatch,
    namespace,
  ]);
}

function useRemove({ apiPath, namespace }) {
  const dispatch = useDispatch();

  return useEventCallback(
    ({ id }) =>
      dispatch({
        type: `${namespace}/remove`,
        payload: { path: apiPath, id },
      }),
    [apiPath, dispatch, namespace]
  );
}

function generateRecordsPage({
  api: { host, path, fixedFilter, defaultBody, defaultFilter },
  namespace,
  table,
  pageProps = {},
  tableProps = {},
  formProps = {},
  filterFormProps = {},
  component,
  inline,
}) {
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
      queries.page,
    ]);
    const pagesize = useMemo(
      () =>
        queries.pagesize
          ? toInteger(queries.pagesize)
          : tableProps.pagination?.defaultPageSize ?? 10,
      [queries.pagesize]
    );
    const sort = useMemo(() => queries.sort || '', [queries.sort]);
    const history = useHistory();
    const matchParams = useParams();
    const user = useUser();

    const fetchApiFixedFilter = useMemo(() => {
      if (isFunction(fixedFilter)) {
        return fixedFilter(matchParams, user);
      }
      if (isPlainObject(fixedFilter)) {
        return fixedFilter;
      }
      return null;
    }, [matchParams, user]);

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
                    ...apiDefaultFilter,
                  }),
                  sort:
                    table.getFixedSortOrder() || table.getDefaultSortOrder(),
                },
              }),
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
            path: apiPath,
          },
        });
      },
      [
        apiPath,
        fetchApiFixedFilter,
        apiDefaultFilter,
        queries,
        globalQueries,
        history,
        dispatch,
      ]
    );

    const updatePage = useEventCallback(
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
          filter: JSON.stringify(newFilter),
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
            ...generateQuery({ namespace, inline, query: newQuery }),
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
        pageProps,
        tableProps,
        filterFormProps,
        inline,
        table,
        component,
        fetch,
        create,
        edit,
        remove,
        updatePage,
      }),
      [fetch, create, edit, remove, updatePage]
    );

    const isLoading = useSelector(
      (state) => state.loading.effects[`${namespace}/fetchAll`]
    );
    const storeData = useSelector((state) => state[namespace]);
    const storeDataJS = useMemo(() => storeData.toJS(), [storeData]);
    const parentPageData = usePageData();
    const pageData = useMemo(
      () => ({ ...storeDataJS, filter, page, pagesize, sort, parentPageData }),
      [filter, page, pagesize, sort, storeDataJS, parentPageData]
    );

    return (
      <PageConfigContext.Provider value={pageConfig}>
        <PageDataContext.Provider value={pageData}>
          <RecordsPage {...props} isLoading={isLoading} />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return Page;
}

function generateRecordPage({
  namespace,
  api: { path, host } = {},
  table,
  pageProps = {},
  layout,
  inline,
  formProps = {},
  descriptionsProps = {},
  component,
}) {
  function Page(props) {
    const isLoading = useSelector(
      (state) => state.loading.effects[`${namespace}/fetch`]
    );
    const location = useLocation();
    const { queries } = useMemo(() => {
      const q = parse(location.search);

      return { queries: q };
    }, [location.search]);

    const history = useHistory();
    const onChangeTab = useEventCallback((newTab) => {
      const uri = generateUri(
        window.location.href.substring(
          0,
          window.location.href.length - window.location.search.length
        ),
        {
          ...queries,
          tab: newTab,
        }
      );
      history.replace(uri.href.substring(uri.origin.length, uri.href.length));
    });
    const apiPath = useApiPath({ path, host });
    const fetch = useFetch({ apiPath, namespace });
    const edit = useEdit({ apiPath, namespace, ignoreId: true });
    const remove = useRemove({ apiPath, namespace });
    const reset = useReset({ namespace });
    const storeData = useSelector((state) => state[namespace]);
    const storeDataJS = useMemo(() => storeData.toJS(), [storeData]);
    const pageConfig = useMemo(
      () => ({
        pageProps,
        layout,
        formProps,
        descriptionsProps,
        inline,
        table,
        component,
        edit,
        remove,
        reset,
        onChangeTab,
        fetch: path ? fetch : null,
      }),
      [fetch, reset, edit, remove, onChangeTab]
    );
    const pageData = useMemo(() => ({ ...storeDataJS, tab: queries.tab }), [
      storeDataJS,
      queries.tab,
    ]);

    return (
      <PageConfigContext.Provider value={pageConfig}>
        <PageDataContext.Provider value={pageData}>
          <RecordPage {...props} isLoading={isLoading} inline={inline} />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return Page;
}

function generateRecordFormPage({
  namespace,
  idIdentifier,
  formProps = {},
  api: { path, host, defaultBody } = {},
  table,
}) {
  function Page(props) {
    const apiPath = useApiPath({ path, host });
    const createApiDefaultBody = useCreateApiDefaultBody(defaultBody);
    const fetch = useFetch({ apiPath, namespace });
    const create = useCreate({ createApiDefaultBody, apiPath, namespace });
    const edit = useEdit({ apiPath, namespace });
    const remove = useRemove({ apiPath, namespace });
    const reset = useReset({ namespace });
    const pageConfig = useMemo(
      () => ({
        formProps,
        idIdentifier,
        fetch,
        create,
        edit,
        remove,
        reset,
        table,
      }),
      [create, edit, fetch, remove, reset]
    );
    const storeData = useSelector((state) => state[namespace]);
    const storeDataJS = useMemo(() => storeData.toJS(), [storeData]);

    return (
      <PageConfigContext.Provider value={pageConfig}>
        <PageDataContext.Provider value={storeDataJS}>
          <RecordFormPage {...props} />
        </PageDataContext.Provider>
      </PageConfigContext.Provider>
    );
  }

  return withRouter(Page);
}

function dynamicComponent({ app, config, generateFunction, ...others }) {
  const service = generateService(config.api);
  const model = generateModel({
    namespace: config.namespace,
    service,
  });

  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () =>
      Promise.resolve(generateFunction({ ...config, ...others })),
  });
}

export function dynamicRecordsComponent(params) {
  return dynamicComponent({
    ...params,
    generateFunction: generateRecordsPage,
  });
}

export function dynamicRecordComponent(params) {
  return dynamicComponent({
    ...params,
    generateFunction: generateRecordPage,
  });
}

export function dynamicRecordFormComponent(params) {
  return dynamicComponent({
    ...params,
    generateFunction: generateRecordFormPage,
  });
}
