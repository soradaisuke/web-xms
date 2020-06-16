"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicRecordsComponent = dynamicRecordsComponent;
exports.dynamicRecordComponent = dynamicRecordComponent;
exports.dynamicRecordFormComponent = dynamicRecordFormComponent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _generateUri2 = _interopRequireDefault(require("@qt/web-core/lib/generateUri"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _dva = require("dva");

var _queryString = require("query-string");

var _immutable = _interopRequireDefault(require("immutable"));

var _showError = _interopRequireDefault(require("./showError"));

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

var _RecordPage = _interopRequireDefault(require("../pages/RecordPage"));

var _RecordFormPage = _interopRequireDefault(require("../pages/RecordFormPage"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function generateService() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _fetch2 = _ref.fetch,
      _create = _ref.create,
      _edit = _ref.edit,
      _remove = _ref.remove;

  return {
    fetchAll: function fetchAll(_ref2) {
      var _fetch;

      var path = _ref2.path,
          page = _ref2.page,
          pagesize = _ref2.pagesize,
          filter = _ref2.filter,
          order = _ref2.order;
      return (_fetch = _fetch2 === null || _fetch2 === void 0 ? void 0 : _fetch2({
        path: path,
        query: {
          page: page,
          pagesize: pagesize,
          filter: filter,
          order: order
        }
      })) !== null && _fetch !== void 0 ? _fetch : _request.default.get(path, {
        params: {
          page: page,
          pagesize: pagesize,
          order: order,
          filter: JSON.stringify(filter)
        }
      });
    },
    fetch: function fetch(_ref3) {
      var _fetch3;

      var path = _ref3.path,
          id = _ref3.id;
      return (_fetch3 = _fetch2 === null || _fetch2 === void 0 ? void 0 : _fetch2({
        path: path,
        id: id
      })) !== null && _fetch3 !== void 0 ? _fetch3 : _request.default.get("".concat(path).concat(id ? "/".concat(id) : ''));
    },
    create: function create(_ref4) {
      var _create2;

      var path = _ref4.path,
          body = _ref4.body;
      return (_create2 = _create === null || _create === void 0 ? void 0 : _create({
        path: path,
        body: body
      })) !== null && _create2 !== void 0 ? _create2 : _request.default.post("".concat((0, _split2.default)(path, '?')[0]), {
        body: body
      });
    },
    edit: function edit(_ref5) {
      var _edit2;

      var path = _ref5.path,
          id = _ref5.id,
          body = _ref5.body;
      return (_edit2 = _edit === null || _edit === void 0 ? void 0 : _edit({
        path: path,
        id: id,
        body: body
      })) !== null && _edit2 !== void 0 ? _edit2 : _request.default.put("".concat((0, _split2.default)(path, '?')[0]).concat(id ? "/".concat(id) : ''), {
        body: body
      });
    },
    remove: function remove(_ref6) {
      var _remove2;

      var path = _ref6.path,
          id = _ref6.id;
      return (_remove2 = _remove === null || _remove === void 0 ? void 0 : _remove({
        path: path,
        id: id
      })) !== null && _remove2 !== void 0 ? _remove2 : _request.default.remove("".concat((0, _split2.default)(path, '?')[0]).concat(id ? "/".concat(id) : ''));
    }
  };
}

function generateModel(_ref7) {
  var namespace = _ref7.namespace,
      service = _ref7.service,
      table = _ref7.table;

  var initialState = _immutable.default.fromJS({
    table: table,
    records: [],
    record: null,
    total: 0
  });

  return {
    namespace: namespace,
    state: initialState,
    reducers: {
      saveRecords: function saveRecords(state, _ref8) {
        var _ref8$payload = _ref8.payload,
            records = _ref8$payload.records,
            total = _ref8$payload.total;
        return state.set('records', _immutable.default.fromJS(records)).set('total', total);
      },
      saveRecord: function saveRecord(state, _ref9) {
        var record = _ref9.payload.record;
        return state.set('record', record);
      },
      reset: function reset() {
        return initialState;
      }
    },
    effects: {
      fetchAll: [_regenerator.default.mark(function fetchAll(_ref10, _ref11) {
        var _ref10$payload, path, page, pagesize, sort, _ref10$payload$filter, filter, call, put, _yield$call, records, total;

        return _regenerator.default.wrap(function fetchAll$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref10$payload = _ref10.payload, path = _ref10$payload.path, page = _ref10$payload.page, pagesize = _ref10$payload.pagesize, sort = _ref10$payload.sort, _ref10$payload$filter = _ref10$payload.filter, filter = _ref10$payload$filter === void 0 ? {} : _ref10$payload$filter;
                call = _ref11.call, put = _ref11.put;
                _context.prev = 2;
                _context.next = 5;
                return call(service.fetchAll, {
                  path: path,
                  page: page,
                  pagesize: pagesize,
                  filter: filter,
                  order: sort
                });

              case 5:
                _yield$call = _context.sent;
                records = _yield$call.items;
                total = _yield$call.total;
                _context.next = 10;
                return put({
                  type: 'saveRecords',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 10:
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](2);
                _context.next = 16;
                return put({
                  type: 'saveRecords',
                  payload: {
                    total: 0,
                    records: []
                  }
                });

              case 16:
                (0, _showError.default)(_context.t0.message);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, fetchAll, null, [[2, 12]]);
      }), {
        type: 'takeLatest'
      }],
      fetch: [_regenerator.default.mark(function fetch(_ref12, _ref13) {
        var _ref12$payload, path, id, call, put, record;

        return _regenerator.default.wrap(function fetch$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref12$payload = _ref12.payload, path = _ref12$payload.path, id = _ref12$payload.id;
                call = _ref13.call, put = _ref13.put;
                _context2.next = 4;
                return call(service.fetch, {
                  path: path,
                  id: id
                });

              case 4:
                record = _context2.sent;
                _context2.next = 7;
                return put({
                  type: 'saveRecord',
                  payload: {
                    record: record
                  }
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, fetch);
      }), {
        type: 'takeLatest'
      }],
      create: _regenerator.default.mark(function create(_ref14, _ref15) {
        var _ref14$payload, path, body, call;

        return _regenerator.default.wrap(function create$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref14$payload = _ref14.payload, path = _ref14$payload.path, body = _ref14$payload.body;
                call = _ref15.call;
                _context3.next = 4;
                return call(service.create, {
                  path: path,
                  body: body
                });

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, create);
      }),
      edit: _regenerator.default.mark(function edit(_ref16, _ref17) {
        var _ref16$payload, path, id, body, call;

        return _regenerator.default.wrap(function edit$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref16$payload = _ref16.payload, path = _ref16$payload.path, id = _ref16$payload.id, body = _ref16$payload.body;
                call = _ref17.call;
                _context4.next = 4;
                return call(service.edit, {
                  path: path,
                  id: id,
                  body: body
                });

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, edit);
      }),
      remove: _regenerator.default.mark(function remove(_ref18, _ref19) {
        var _ref18$payload, path, id, call;

        return _regenerator.default.wrap(function remove$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref18$payload = _ref18.payload, path = _ref18$payload.path, id = _ref18$payload.id;
                call = _ref19.call;
                _context5.next = 4;
                return call(service.remove, {
                  path: path,
                  id: id
                });

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, remove);
      })
    }
  };
}

function generateQuery(_ref20) {
  var namespace = _ref20.namespace,
      inline = _ref20.inline,
      query = _ref20.query;

  if (inline) {
    return (0, _defineProperty2.default)({}, namespace, encodeURIComponent(JSON.stringify(query)));
  }

  return query;
}

function useApiPath(_ref22) {
  var path = _ref22.path,
      host = _ref22.host;
  var matchParams = (0, _reactRouterDom.useParams)();
  return (0, _react.useMemo)(function () {
    var apiPath = '';

    if ((0, _isFunction2.default)(path)) {
      apiPath = path(matchParams);
    } else if ((0, _isString2.default)(path)) {
      apiPath = path;
    }

    if (host) {
      apiPath = "".concat(host).concat(apiPath);
    }

    return apiPath;
  }, [host, matchParams, path]);
}

function useCreateApiDefaultBody(defaultBody) {
  var matchParams = (0, _reactRouterDom.useParams)();
  return (0, _react.useMemo)(function () {
    if ((0, _isFunction2.default)(defaultBody)) {
      return defaultBody(matchParams);
    }

    if ((0, _isPlainObject2.default)(defaultBody)) {
      return defaultBody;
    }

    return null;
  }, [defaultBody, matchParams]);
}

function useCreate(_ref23) {
  var createApiDefaultBody = _ref23.createApiDefaultBody,
      apiPath = _ref23.apiPath,
      namespace = _ref23.namespace;
  var dispatch = (0, _dva.useDispatch)();
  return (0, _react.useCallback)(function (_ref24) {
    var body = _ref24.body;
    return dispatch({
      type: "".concat(namespace, "/create"),
      payload: {
        path: apiPath,
        body: _objectSpread(_objectSpread({}, createApiDefaultBody), body)
      }
    });
  }, [dispatch, namespace, apiPath, createApiDefaultBody]);
}

function useFetch(_ref25) {
  var apiPath = _ref25.apiPath,
      namespace = _ref25.namespace;
  var dispatch = (0, _dva.useDispatch)();
  return (0, _react.useCallback)(function () {
    var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref26.id;

    return dispatch({
      type: "".concat(namespace, "/fetch"),
      payload: {
        path: apiPath,
        id: id
      }
    });
  }, [dispatch, namespace, apiPath]);
}

function useEdit(_ref27) {
  var apiPath = _ref27.apiPath,
      namespace = _ref27.namespace;
  var dispatch = (0, _dva.useDispatch)();
  return (0, _react.useCallback)(function (_ref28) {
    var id = _ref28.id,
        body = _ref28.body;
    return dispatch({
      type: "".concat(namespace, "/edit"),
      payload: {
        path: apiPath,
        id: id,
        body: body
      }
    });
  }, [apiPath, dispatch, namespace]);
}

function useReset(_ref29) {
  var namespace = _ref29.namespace;
  var dispatch = (0, _dva.useDispatch)();
  return (0, _react.useCallback)(function () {
    return dispatch({
      type: "".concat(namespace, "/reset")
    });
  }, [dispatch, namespace]);
}

function useRemove(_ref30) {
  var apiPath = _ref30.apiPath,
      namespace = _ref30.namespace;
  var dispatch = (0, _dva.useDispatch)();
  return (0, _react.useCallback)(function (_ref31) {
    var id = _ref31.id;
    return dispatch({
      type: "".concat(namespace, "/remove"),
      payload: {
        path: apiPath,
        id: id
      }
    });
  }, [apiPath, dispatch, namespace]);
}

function generateRecordsPage(_ref32, component, inline) {
  var _ref32$api = _ref32.api,
      host = _ref32$api.host,
      path = _ref32$api.path,
      fixedFilter = _ref32$api.fixedFilter,
      defaultBody = _ref32$api.defaultBody,
      defaultFilter = _ref32$api.defaultFilter,
      namespace = _ref32.namespace,
      actions = _ref32.actions,
      table = _ref32.table,
      filterGroupTrigger = _ref32.filterGroupTrigger,
      _ref32$tableProps = _ref32.tableProps,
      tableProps = _ref32$tableProps === void 0 ? {} : _ref32$tableProps,
      _ref32$paginationProp = _ref32.paginationProps,
      paginationProps = _ref32$paginationProp === void 0 ? {} : _ref32$paginationProp;

  function Page(props) {
    var location = (0, _reactRouterDom.useLocation)();

    var _useMemo = (0, _react.useMemo)(function () {
      var gq = (0, _queryString.parse)(location.search);
      var q = {};

      if (inline) {
        try {
          q = JSON.parse(decodeURIComponent(gq[namespace]));
        } catch (e) {
          q = {};
        }
      }

      return {
        queries: q,
        globalQueries: gq
      };
    }, [location.search]),
        queries = _useMemo.queries,
        globalQueries = _useMemo.globalQueries;

    var filter = (0, _react.useMemo)(function () {
      try {
        return JSON.parse(queries.filter);
      } catch (e) {
        return {};
      }
    }, [queries.filter]);
    var page = (0, _react.useMemo)(function () {
      return queries.page ? (0, _toInteger2.default)(queries.page) : 1;
    }, [queries.page]);
    var pagesize = (0, _react.useMemo)(function () {
      var _paginationProps$defa;

      return queries.pagesize ? (0, _toInteger2.default)(queries.pagesize) : (_paginationProps$defa = paginationProps.defaultPageSize) !== null && _paginationProps$defa !== void 0 ? _paginationProps$defa : 10;
    }, [queries.pagesize]);
    var sort = (0, _react.useMemo)(function () {
      return queries.sort || '';
    }, [queries.sort]);

    var _useSelector = (0, _dva.useSelector)(function (state) {
      return {
        records: state[namespace].get('records'),
        total: state[namespace].get('total'),
        isLoading: state.loading.effects["".concat(namespace, "/fetchAll")]
      };
    }, _dva.shallowEqual),
        records = _useSelector.records,
        total = _useSelector.total,
        isLoading = _useSelector.isLoading;

    var history = (0, _reactRouterDom.useHistory)();
    var matchParams = (0, _reactRouterDom.useParams)();
    var fetchApiFixedFilter = (0, _react.useMemo)(function () {
      if ((0, _isFunction2.default)(fixedFilter)) {
        return fixedFilter(matchParams);
      }

      if ((0, _isPlainObject2.default)(fixedFilter)) {
        return fixedFilter;
      }

      return null;
    }, [matchParams]);
    var createApiDefaultBody = useCreateApiDefaultBody(defaultBody);
    var apiDefaultFilter = (0, _react.useMemo)(function () {
      if ((0, _isFunction2.default)(defaultFilter)) {
        return defaultFilter(matchParams);
      }

      if ((0, _isPlainObject2.default)(defaultFilter)) {
        return defaultFilter;
      }

      return null;
    }, [matchParams]);
    var apiPath = useApiPath({
      path: path,
      host: host
    });
    var dispatch = (0, _dva.useDispatch)();
    var fetch = (0, _react.useCallback)(function (_ref33) {
      var page = _ref33.page,
          pagesize = _ref33.pagesize,
          sort = _ref33.sort,
          _ref33$filter = _ref33.filter,
          filter = _ref33$filter === void 0 ? {} : _ref33$filter;

      if (table.getFixedSortOrder() && table.getFixedSortOrder() !== sort || (table.getDefaultSortOrder() || table.getDefaultFilter() || apiDefaultFilter && (0, _size2.default)(apiDefaultFilter)) && (!queries || Object.keys(queries).length === 0)) {
        var uri = (0, _generateUri2.default)(window.location.href.substring(0, window.location.href.length - window.location.search.length), _objectSpread(_objectSpread({}, globalQueries), generateQuery({
          namespace: namespace,
          inline: inline,
          query: {
            filter: JSON.stringify(_objectSpread(_objectSpread({}, table.getDefaultFilter() || {}), apiDefaultFilter)),
            sort: table.getFixedSortOrder() || table.getDefaultSortOrder()
          }
        })));
        history.replace(uri.href.substring(uri.origin.length, uri.href.length));
        return Promise.resolve();
      }

      return dispatch({
        type: "".concat(namespace, "/fetchAll"),
        payload: {
          page: page,
          pagesize: pagesize,
          sort: sort,
          filter: _objectSpread(_objectSpread({}, filter), fetchApiFixedFilter),
          path: apiPath
        }
      });
    }, [apiPath, fetchApiFixedFilter, apiDefaultFilter, queries, globalQueries, history, dispatch]);
    var updatePage = (0, _react.useCallback)(function (_ref34) {
      var page = _ref34.page,
          pagesize = _ref34.pagesize,
          sort = _ref34.sort,
          filter = _ref34.filter;

      var newFilter = _objectSpread({}, filter || {});

      (0, _forEach2.default)(newFilter, function (v, key) {
        if (!v && v !== 0 && !(0, _isBoolean2.default)(v)) {
          delete newFilter[key];
        }
      });
      var newQuery = {
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: JSON.stringify(newFilter)
      };
      (0, _forEach2.default)(newQuery, function (v, key) {
        if (key !== 'sort' && ((0, _isUndefined2.default)(v) || v === '')) {
          delete newQuery[key];
        }
      });
      var uri = (0, _generateUri2.default)(window.location.href.substring(0, window.location.href.length - window.location.search.length), _objectSpread(_objectSpread({}, globalQueries), generateQuery({
        namespace: namespace,
        inline: inline,
        query: newQuery
      })));
      history.push(uri.href.substring(uri.origin.length, uri.href.length));
    }, [history, globalQueries]);
    var create = useCreate({
      createApiDefaultBody: createApiDefaultBody,
      apiPath: apiPath,
      namespace: namespace
    });
    var edit = useEdit({
      apiPath: apiPath,
      namespace: namespace
    });
    var remove = useRemove({
      apiPath: apiPath,
      namespace: namespace
    });
    return _react.default.createElement(_RecordsPage.default, (0, _extends2.default)({}, props, {
      records: records,
      total: total,
      isLoading: isLoading,
      filter: filter,
      page: page,
      pagesize: pagesize,
      sort: sort,
      fetch: fetch,
      create: create,
      edit: edit,
      remove: remove,
      updatePage: updatePage,
      paginationProps: paginationProps,
      filterGroupTrigger: filterGroupTrigger,
      component: component,
      table: table,
      tableProps: tableProps,
      actions: actions
    }));
  }

  return (0, _reactRouterDom.withRouter)(Page);
}

function dynamicRecordsComponent(_ref35) {
  var app = _ref35.app,
      config = _ref35.config,
      _component = _ref35.component,
      inline = _ref35.inline;
  var service = generateService(config.api);
  var model = generateModel({
    namespace: config.namespace,
    table: config.table,
    service: service
  });
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordsPage(config, _component, inline));
    }
  });
}

function generateRecordPage(_ref36, component) {
  var namespace = _ref36.namespace,
      _ref36$api = _ref36.api;
  _ref36$api = _ref36$api === void 0 ? {} : _ref36$api;
  var path = _ref36$api.path,
      host = _ref36$api.host,
      actions = _ref36.actions,
      table = _ref36.table,
      bordered = _ref36.bordered,
      layout = _ref36.layout,
      descriptionsColumn = _ref36.descriptionsColumn;

  function Page(props) {
    var record = (0, _dva.useSelector)(function (state) {
      return state[namespace].get('record');
    });
    var apiPath = useApiPath({
      path: path,
      host: host
    });
    var fetch = useFetch({
      apiPath: apiPath,
      namespace: namespace
    });
    var edit = useEdit({
      apiPath: apiPath,
      namespace: namespace
    });
    var remove = useRemove({
      apiPath: apiPath,
      namespace: namespace
    });
    var reset = useReset({
      namespace: namespace
    });
    return _react.default.createElement(_RecordPage.default, (0, _extends2.default)({}, props, {
      layout: layout,
      component: component,
      table: table,
      actions: actions,
      bordered: bordered,
      descriptionsColumn: descriptionsColumn,
      record: record,
      fetch: fetch,
      edit: edit,
      remove: remove,
      reset: reset
    }));
  }

  return (0, _reactRouterDom.withRouter)(Page);
}

function dynamicRecordComponent(_ref37) {
  var app = _ref37.app,
      config = _ref37.config,
      _component2 = _ref37.component;
  var service = generateService(config.api);
  var model = generateModel({
    namespace: config.namespace,
    service: service
  });
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordPage(config, _component2));
    }
  });
}

function generateRecordFormPage(_ref38) {
  var namespace = _ref38.namespace,
      _ref38$formPageProps = _ref38.formPageProps,
      formPageProps = _ref38$formPageProps === void 0 ? {} : _ref38$formPageProps,
      _ref38$api = _ref38.api;
  _ref38$api = _ref38$api === void 0 ? {} : _ref38$api;
  var path = _ref38$api.path,
      host = _ref38$api.host,
      defaultBody = _ref38$api.defaultBody,
      actions = _ref38.actions,
      table = _ref38.table;

  function Page(props) {
    var record = (0, _dva.useSelector)(function (state) {
      return state[namespace].get('record');
    });
    var apiPath = useApiPath({
      path: path,
      host: host
    });
    var createApiDefaultBody = useCreateApiDefaultBody(defaultBody);
    var fetch = useFetch({
      apiPath: apiPath,
      namespace: namespace
    });
    var create = useCreate({
      createApiDefaultBody: createApiDefaultBody,
      apiPath: apiPath,
      namespace: namespace
    });
    var edit = useEdit({
      apiPath: apiPath,
      namespace: namespace
    });
    var remove = useRemove({
      apiPath: apiPath,
      namespace: namespace
    });
    var reset = useReset({
      namespace: namespace
    });
    return _react.default.createElement(_RecordFormPage.default, (0, _extends2.default)({}, props, formPageProps, {
      actions: actions,
      table: table,
      record: record,
      fetch: fetch,
      create: create,
      edit: edit,
      remove: remove,
      reset: reset
    }));
  }

  return (0, _reactRouterDom.withRouter)(Page);
}

function dynamicRecordFormComponent(_ref39) {
  var app = _ref39.app,
      config = _ref39.config;
  var service = generateService(config.api);
  var model = generateModel({
    namespace: config.namespace,
    service: service
  });
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordFormPage(config));
    }
  });
}