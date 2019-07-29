"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecordsComponent;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _generateUri2 = _interopRequireDefault(require("@qt/web-core/lib/generateUri"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _dva = require("dva");

var _reselect = require("reselect");

var _queryString = require("query-string");

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

function generateService(_ref) {
  var _ref$api = _ref.api;
  _ref$api = _ref$api === void 0 ? {} : _ref$api;
  var _fetch = _ref$api.fetch;
  var service = {
    fetch: function () {
      var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var path, page, pagesize, filter, order;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _ref2.path, page = _ref2.page, pagesize = _ref2.pagesize, filter = _ref2.filter, order = _ref2.order;
                return _context.abrupt("return", _fetch ? _fetch({
                  path: path,
                  query: {
                    page: page,
                    pagesize: pagesize,
                    filter: filter,
                    order: order
                  }
                }) : _request.default.get(path, {
                  params: {
                    page: page,
                    pagesize: pagesize,
                    order: order,
                    filter: JSON.stringify(filter)
                  }
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fetch(_x) {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }(),
    remove: function () {
      var _remove = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref3) {
        var path, id;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _ref3.path, id = _ref3.id;
                return _context2.abrupt("return", _request.default.remove("".concat(path, "/").concat(id)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function remove(_x2) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }(),
    create: function () {
      var _create = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref4) {
        var path, body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = _ref4.path, body = _ref4.body;
                return _context3.abrupt("return", _request.default.post("".concat(path), {
                  body: body
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }(),
    edit: function () {
      var _edit = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_ref5) {
        var path, id, body;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                path = _ref5.path, id = _ref5.id, body = _ref5.body;
                return _context4.abrupt("return", _request.default.put("".concat(path, "/").concat(id), {
                  body: body
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function edit(_x4) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }()
  };
  return service;
}

function generateModel(_ref6, service) {
  var namespace = _ref6.namespace,
      table = _ref6.table;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var model = {
    namespace: namespace,
    state: _immutable.default.fromJS({
      table: table,
      records: [],
      total: 0,
      error: null
    }),
    reducers: {
      save: function save(state, _ref7) {
        var _ref7$payload = _ref7.payload,
            records = _ref7$payload.records,
            total = _ref7$payload.total;
        return state.merge(_immutable.default.fromJS({
          records: records,
          total: total
        }));
      },
      saveError: function saveError(state, _ref8) {
        var error = _ref8.payload.error;
        return state.set('error', error);
      }
    },
    effects: {
      fetch: [_regenerator.default.mark(function fetch(_ref9, _ref10) {
        var _ref9$payload, path, page, pagesize, sort, _ref9$payload$filter, filter, call, put, _ref11, records, total;

        return _regenerator.default.wrap(function fetch$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref9$payload = _ref9.payload, path = _ref9$payload.path, page = _ref9$payload.page, pagesize = _ref9$payload.pagesize, sort = _ref9$payload.sort, _ref9$payload$filter = _ref9$payload.filter, filter = _ref9$payload$filter === void 0 ? {} : _ref9$payload$filter;
                call = _ref10.call, put = _ref10.put;
                _context5.next = 4;
                return put({
                  type: 'saveError',
                  payload: {
                    error: null
                  }
                });

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return call(service.fetch, {
                  path: path,
                  page: page,
                  pagesize: pagesize,
                  filter: filter,
                  order: sort
                });

              case 7:
                _ref11 = _context5.sent;
                records = _ref11.items;
                total = _ref11.total;
                _context5.next = 12;
                return put({
                  type: 'save',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 12:
                _context5.next = 18;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](4);
                _context5.next = 18;
                return put({
                  type: 'saveError',
                  payload: {
                    error: _context5.t0
                  }
                });

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, fetch, null, [[4, 14]]);
      }), {
        type: 'takeLatest'
      }],
      remove: _regenerator.default.mark(function modelRemove(_ref12, _ref13) {
        var _ref12$payload, path, id, call;

        return _regenerator.default.wrap(function modelRemove$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref12$payload = _ref12.payload, path = _ref12$payload.path, id = _ref12$payload.id;
                call = _ref13.call;
                _context6.next = 4;
                return call(service.remove, {
                  path: path,
                  id: id
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, modelRemove);
      }),
      create: _regenerator.default.mark(function modelCreate(_ref14, _ref15) {
        var _ref14$payload, path, body, call;

        return _regenerator.default.wrap(function modelCreate$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref14$payload = _ref14.payload, path = _ref14$payload.path, body = _ref14$payload.body;
                call = _ref15.call;
                _context7.next = 4;
                return call(service.create, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, modelCreate);
      }),
      edit: _regenerator.default.mark(function modelEdit(_ref16, _ref17) {
        var _ref16$payload, path, id, body, call;

        return _regenerator.default.wrap(function modelEdit$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref16$payload = _ref16.payload, path = _ref16$payload.path, id = _ref16$payload.id, body = _ref16$payload.body;
                call = _ref17.call;
                _context8.next = 4;
                return call(service.edit, {
                  path: path,
                  id: id,
                  body: body
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, modelEdit);
      })
    }
  };
  return model;
}

function generateQuery(_ref18) {
  var namespace = _ref18.namespace,
      inline = _ref18.inline,
      query = _ref18.query;

  if (inline) {
    return (0, _defineProperty2.default)({}, namespace, encodeURIComponent(JSON.stringify(query)));
  }

  return query;
}

function getQuery(_ref20) {
  var namespace = _ref20.namespace,
      inline = _ref20.inline,
      search = _ref20.search;
  var queries = (0, _queryString.parse)(search);

  if (inline) {
    try {
      queries = JSON.parse(decodeURIComponent(queries[namespace]));
    } catch (e) {
      queries = {};
    }
  }

  return queries;
}

function generateRecordsPage(_ref21, component, inline) {
  var _ref21$api = _ref21.api,
      host = _ref21$api.host,
      path = _ref21$api.path,
      fetchFixedFilter = _ref21$api.fetchFixedFilter,
      createDefaultBody = _ref21$api.createDefaultBody,
      namespace = _ref21.namespace,
      actions = _ref21.actions,
      table = _ref21.table;

  var Page = function (_React$PureComponent) {
    (0, _inherits2.default)(Page, _React$PureComponent);

    function Page() {
      (0, _classCallCheck2.default)(this, Page);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).apply(this, arguments));
    }

    (0, _createClass2.default)(Page, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_RecordsPage.default, (0, _extends2.default)({}, this.props, {
          component: component,
          table: table,
          actions: actions
        }));
      }
    }]);
    return Page;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(Page, "displayName", "".concat((0, _upperFirst2.default)(namespace), "Page"));
  var filterSelector = (0, _reselect.createSelector)([function (queries) {
    return queries.filter;
  }], function (filter) {
    try {
      return JSON.parse(filter);
    } catch (e) {
      return {};
    }
  });

  var mapStateToProps = function mapStateToProps(state, props) {
    var queries = getQuery({
      namespace: namespace,
      inline: inline,
      search: props.location.search
    });
    return {
      filter: filterSelector(queries),
      page: queries.page ? (0, _toInteger2.default)(queries.page) : 1,
      pagesize: queries.pagesize ? (0, _toInteger2.default)(queries.pagesize) : 10,
      records: state[namespace].get('records'),
      sort: queries.sort || '',
      total: state[namespace].get('total'),
      isLoading: state.loading.effects["".concat(namespace, "/fetch")],
      error: state[namespace].get('error')
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var matchParams = ownProps.match.params,
        history = ownProps.history,
        location = ownProps.location;
    var fetchApiFixedFilter = {};

    if ((0, _isFunction2.default)(fetchFixedFilter)) {
      fetchApiFixedFilter = fetchFixedFilter(matchParams);
    } else if ((0, _isPlainObject2.default)(fetchFixedFilter)) {
      fetchApiFixedFilter = fetchFixedFilter;
    }

    var createApiDefaultBody = {};

    if ((0, _isFunction2.default)(createDefaultBody)) {
      createApiDefaultBody = createDefaultBody(matchParams);
    } else if ((0, _isPlainObject2.default)(createDefaultBody)) {
      createApiDefaultBody = createDefaultBody;
    }

    var apiPath = '';

    if ((0, _isFunction2.default)(path)) {
      apiPath = path(matchParams);
    } else if ((0, _isString2.default)(path)) {
      apiPath = path;
    }

    if (host) {
      apiPath = "".concat(host).concat(apiPath);
    }

    var props = {
      fetch: function () {
        var _fetch3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_ref22) {
          var page, pagesize, sort, _ref22$filter, filter, queries, uri;

          return _regenerator.default.wrap(function _callee5$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  page = _ref22.page, pagesize = _ref22.pagesize, sort = _ref22.sort, _ref22$filter = _ref22.filter, filter = _ref22$filter === void 0 ? {} : _ref22$filter;
                  queries = getQuery({
                    namespace: namespace,
                    inline: inline,
                    search: location.search
                  });

                  if (!(table.getFixedSortOrder() && table.getFixedSortOrder() !== sort || (table.getDefaultSortOrder() || table.getDefaultFilter()) && (!queries || Object.keys(queries).length === 0))) {
                    _context9.next = 6;
                    break;
                  }

                  uri = (0, _generateUri2.default)(window.location.href, generateQuery({
                    namespace: namespace,
                    inline: inline,
                    query: {
                      filter: JSON.stringify(table.getDefaultFilter() || {}),
                      sort: table.getFixedSortOrder() || table.getDefaultSortOrder()
                    }
                  }));
                  history.replace(uri.href.substring(uri.origin.length, uri.href.length));
                  return _context9.abrupt("return", Promise.resolve());

                case 6:
                  return _context9.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      page: page,
                      pagesize: pagesize,
                      sort: sort,
                      filter: (0, _objectSpread2.default)({}, filter, fetchApiFixedFilter),
                      path: apiPath
                    }
                  }));

                case 7:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee5);
        }));

        function fetch(_x5) {
          return _fetch3.apply(this, arguments);
        }

        return fetch;
      }(),
      remove: function () {
        var _remove2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref23) {
          var id;
          return _regenerator.default.wrap(function _callee6$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  id = _ref23.id;
                  return _context10.abrupt("return", dispatch({
                    type: "".concat(namespace, "/remove"),
                    payload: {
                      path: apiPath,
                      id: id
                    }
                  }));

                case 2:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee6);
        }));

        function remove(_x6) {
          return _remove2.apply(this, arguments);
        }

        return remove;
      }(),
      updatePage: function () {
        var _updatePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref24) {
          var page, pagesize, sort, filter, newQuery, uri;
          return _regenerator.default.wrap(function _callee7$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  page = _ref24.page, pagesize = _ref24.pagesize, sort = _ref24.sort, filter = _ref24.filter;
                  newQuery = {
                    page: page,
                    pagesize: pagesize,
                    sort: sort,
                    filter: (0, _isUndefined2.default)(filter) ? filter : JSON.stringify(filter)
                  };
                  (0, _forEach2.default)(newQuery, function (v, key) {
                    if ((0, _isUndefined2.default)(v) || v === '') delete newQuery[key];
                  });
                  uri = (0, _generateUri2.default)(window.location.href, generateQuery({
                    namespace: namespace,
                    inline: inline,
                    query: newQuery
                  }));
                  history.push(uri.href.substring(uri.origin.length, uri.href.length));

                case 5:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee7);
        }));

        function updatePage(_x7) {
          return _updatePage.apply(this, arguments);
        }

        return updatePage;
      }(),
      create: function () {
        var _create2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(_ref25) {
          var body;
          return _regenerator.default.wrap(function _callee8$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  body = _ref25.body;
                  return _context12.abrupt("return", dispatch({
                    type: "".concat(namespace, "/create"),
                    payload: {
                      path: apiPath,
                      body: (0, _objectSpread2.default)({}, createApiDefaultBody, body)
                    }
                  }));

                case 2:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee8);
        }));

        function create(_x8) {
          return _create2.apply(this, arguments);
        }

        return create;
      }(),
      edit: function () {
        var _edit2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(_ref26) {
          var id, body;
          return _regenerator.default.wrap(function _callee9$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  id = _ref26.id, body = _ref26.body;
                  return _context13.abrupt("return", dispatch({
                    type: "".concat(namespace, "/edit"),
                    payload: {
                      path: apiPath,
                      id: id,
                      body: body
                    }
                  }));

                case 2:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee9);
        }));

        function edit(_x9) {
          return _edit2.apply(this, arguments);
        }

        return edit;
      }()
    };
    return props;
  };

  return (0, _reactRouterDom.withRouter)((0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordsComponent(_ref27) {
  var app = _ref27.app,
      config = _ref27.config,
      _component = _ref27.component,
      inline = _ref27.inline;
  var service = generateService(config);
  var model = generateModel(config, service);
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

function dynamicRecordsComponent(_ref28) {
  var app = _ref28.app,
      config = _ref28.config,
      component = _ref28.component,
      inline = _ref28.inline;

  if (!app) {
    throw new Error('dynamicRecordsComponent: app is required');
  }

  if (!config) {
    throw new Error('dynamicRecordsComponent: config is required');
  }

  return generateDynamicRecordsComponent({
    app: app,
    config: config,
    component: component,
    inline: inline
  });
}