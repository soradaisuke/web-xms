import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { parse } from 'query-string';
import Immutable from 'immutable';
import {
  isFunction,
  isPlainObject,
  isString,
  forEach,
  toInteger,
  size,
  isBoolean,
  isUndefined,
} from 'lodash';
import { useEventCallback } from '@qt/react';
import { generateUri } from '@qt/web-common';
import RouterContext from '../../contexts/RouterContext';
import Table from '../../schema/Table';
import generateService from '../../utils/generateService';
import UserContext from '../../contexts/UserContext';
import useFetchRecords from '../../hooks/useFetchRecords';
import PageDataContext from '../../contexts/PageDataContext';
import RecordsPage from '../RecordsPage';
import PageConfigContext from '../../contexts/PageConfigContext';
import usePageData from '../../hooks/usePageData';
import generateQuery from '../../utils/generateQuery';

/**
 * 
 * @param router { withRouter, useLocation, useHistory, useParams, Link }
 * @param namespace string, 如果同一页面内有多个xms列表组件时必填，因为page/pagesize/filter等数据是放在url的query里，当页面内多个组件时会有冲突，因此需要有自己的namespace
 */

export default function generateRecordsPage({
  router,
  user,
  namespace,
  config: {
    api,
    columns,
    actions,
    pageProps = {},
    tableProps = {},
    formProps = {},
    filterFormProps = {},
  },
}) {
  if (!router) {
    throw new Error('router is required');
  }

  if (!router.withRouter) {
    throw new Error('router.withRouter or path is required');
  }

  if (!router.useLocation) {
    throw new Error('router.useLocation or path is required');
  }

  if (!router.useHistory) {
    throw new Error('router.useHistory or path is required');
  }

  if (!router.useParams) {
    throw new Error('router.useParams or path is required');
  }

  if (!router.Link) {
    throw new Error('router.Link or path is required');
  }

  const inline = !!namespace;
  const { useLocation, useParams, useHistory } = router;
  const { host, path, fixedFilter, defaultBody, defaultFilter } = api;
  const table = new Table(columns, actions);
  const service = generateService(api);

  function Page(props) {
    const location = useLocation();
    const { queries, globalQueries } = useMemo(() => {
      const gq = parse(location.search);
      let q = gq;

      if (namespace) {
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

    const fetchApiFixedFilter = useMemo(() => {
      if (isFunction(fixedFilter)) {
        return fixedFilter(matchParams);
      }
      if (isPlainObject(fixedFilter)) {
        return fixedFilter;
      }
      return null;
    }, [matchParams]);

    const createApiDefaultBody = useMemo(() => {
      if (isFunction(defaultBody)) {
        return defaultBody(matchParams);
      }
      if (isPlainObject(defaultBody)) {
        return defaultBody;
      }
      return null;
    }, [matchParams]);

    const apiDefaultFilter = useMemo(() => {
      if (isFunction(defaultFilter)) {
        return defaultFilter(matchParams);
      }
      if (isPlainObject(defaultFilter)) {
        return defaultFilter;
      }
      return null;
    }, [matchParams]);

    const apiPath = useMemo(() => {
      let ap = '';
      if (isFunction(path)) {
        ap = path(matchParams);
      } else if (isString(path)) {
        ap = path;
      }
      if (host) {
        ap = `${host}${ap}`;
      }
      return ap;
    }, [matchParams]);

    // RecordsPage组件mount在这之前，RecordsPage mount的时候fetch
    // useAsync在mount的时候会cancel掉当前的promise
    // 所以要在Page mount以后再实际fetch数据
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const fetchFunc = useCallback(
      // eslint-disable-next-line no-shadow
      ({ page, pagesize, sort, filter = {} }) => {
        if (!isMounted) {
          return Promise.resolve();
        }
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

        return service.fetchAll({
          page,
          pagesize,
          order: sort,
          filter: { ...filter, ...fetchApiFixedFilter },
          path: apiPath,
        });
      },
      [
        isMounted,
        apiPath,
        fetchApiFixedFilter,
        apiDefaultFilter,
        queries,
        globalQueries,
        history,
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

    const create = useEventCallback(({ body }) =>
      service.create({
        path: apiPath,
        body: { ...createApiDefaultBody, ...body }
      })
    );
    const edit = useEventCallback(({ id, body }) =>
      service.edit({
        path: apiPath,
        id,
        body,
      })
    );
    const remove = useEventCallback(({ id }) =>
      service.remove({
        path: apiPath,
        id,
      })
    );
    const {
      fetch,
      records,
      total,
      isLoading,
    } = useFetchRecords(fetchFunc);

    const pageConfig = useMemo(
      () => ({
        formProps,
        pageProps,
        tableProps,
        filterFormProps,
        table,
        fetch,
        create,
        edit,
        remove,
        updatePage,
      }),
      [fetch, create, edit, remove, updatePage]
    );
    const parentPageData = usePageData();
    const pageData = useMemo(
      () => ({ records, total, filter, page, pagesize, sort, parentPageData }),
      [filter, page, pagesize, sort, records, total, parentPageData]
    );

    const userContext = isPlainObject(user) ? Immutable.fromJS(user) : user;

    return (
      <RouterContext.Provider value={router}>
        <UserContext.Provider value={userContext}>
          <PageConfigContext.Provider value={pageConfig}>
            <PageDataContext.Provider value={pageData}>
              <RecordsPage {...props} isLoading={isLoading} />
            </PageDataContext.Provider>
          </PageConfigContext.Provider>
        </UserContext.Provider>
      </RouterContext.Provider>
    );
  }

  return Page;
}
