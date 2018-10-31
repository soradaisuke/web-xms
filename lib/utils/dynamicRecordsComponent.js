"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecordsComponent;

var _generateUri2 = _interopRequireDefault(require("web-core/lib/generateUri"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _router = require("dva/router");

var _dva = require("dva");

var _reselect = require("reselect");

var _queryString = require("query-string");

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

function generateService(_ref) {
  var actions = _ref.actions,
      primaryKey = _ref.primaryKey;
  var service = {
    fetch: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var path, params;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _ref2.path, params = (0, _objectWithoutProperties2.default)(_ref2, ["path"]);
                return _context.abrupt("return", _request.default.get(path, {
                  params: params
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetch(_x) {
        return _fetch.apply(this, arguments);
      };
    }()
  };
  (0, _forEach2.default)(actions, function (action) {
    if (action === 'create') {
      service.create = function () {
        var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref3) {
          var path, body;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  path = _ref3.path, body = _ref3.body;
                  return _context2.abrupt("return", _request.default.post("".concat(path), {
                    body: body
                  }));

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }();
    } else if (action === 'edit') {
      service.edit = function () {
        var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref5) {
          var path, body;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  path = _ref5.path, body = _ref5.body;
                  return _context3.abrupt("return", _request.default.put("".concat(path, "/").concat(body[primaryKey]), {
                    body: body
                  }));

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x3) {
          return _ref6.apply(this, arguments);
        };
      }();
    } else if (action === 'remove') {
      service.remove = function () {
        var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_ref7) {
          var path, body;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  path = _ref7.path, body = _ref7.body;
                  return _context4.abrupt("return", _request.default.remove("".concat(path, "/").concat(body[primaryKey])));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function (_x4) {
          return _ref8.apply(this, arguments);
        };
      }();
    } else if (action === 'order') {
      service.order = function () {
        var _ref10 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_ref9) {
          var path, body;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  path = _ref9.path, body = _ref9.body;
                  return _context5.abrupt("return", _request.default.put("".concat(path, "/").concat(body[primaryKey]), {
                    body: body
                  }));

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        return function (_x5) {
          return _ref10.apply(this, arguments);
        };
      }();
    }
  });
  return service;
}

function generateModel(_ref11, service) {
  var namespace = _ref11.namespace,
      actions = _ref11.actions,
      schema = _ref11.schema,
      orderKey = _ref11.orderKey;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var model = {
    namespace: namespace,
    state: _immutable.default.fromJS({
      schema: schema,
      records: [],
      total: 0
    }),
    reducers: {
      save: function save(state, _ref12) {
        var _ref12$payload = _ref12.payload,
            records = _ref12$payload.records,
            total = _ref12$payload.total;
        return state.merge(_immutable.default.fromJS({
          records: records,
          total: total
        }));
      },
      saveFilters: function saveFilters(state, _ref13) {
        var _ref13$payload = _ref13.payload,
            filters = _ref13$payload.filters,
            index = _ref13$payload.index;
        return state.set('schema', state.get('schema').setIn([index, 'filters'], filters));
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref14, _ref15) {
        var _ref14$payload, path, page, pagesize, sort, _ref14$payload$search, search, _ref14$payload$filter, filter, call, put, currentFiler, i, _ref16, records, total;

        return _regenerator.default.wrap(function fetch$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref14$payload = _ref14.payload, path = _ref14$payload.path, page = _ref14$payload.page, pagesize = _ref14$payload.pagesize, sort = _ref14$payload.sort, _ref14$payload$search = _ref14$payload.search, search = _ref14$payload$search === void 0 ? {} : _ref14$payload$search, _ref14$payload$filter = _ref14$payload.filter, filter = _ref14$payload$filter === void 0 ? {} : _ref14$payload$filter;
                call = _ref15.call, put = _ref15.put;
                currentFiler = (0, _objectSpread3.default)({}, filter, search);
                i = 0;

              case 4:
                if (!(i < schema.length)) {
                  _context6.next = 11;
                  break;
                }

                if (!(0, _isFunction2.default)(schema[i].filters)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 8;
                return put({
                  type: 'getFilters',
                  payload: {
                    index: i,
                    filtersFunc: schema[i].filters,
                    currentFiler: currentFiler
                  }
                });

              case 8:
                i += 1;
                _context6.next = 4;
                break;

              case 11:
                _context6.next = 13;
                return call(service.fetch, {
                  path: path,
                  page: page,
                  pagesize: pagesize,
                  filter: JSON.stringify(currentFiler),
                  order: sort
                });

              case 13:
                _ref16 = _context6.sent;
                records = _ref16.items;
                total = _ref16.total;
                _context6.next = 18;
                return put({
                  type: 'save',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, fetch, this);
      }),
      getFilters: _regenerator.default.mark(function getFilters(_ref17, _ref18) {
        var _ref17$payload, index, filtersFunc, currentFiler, call, put, filters;

        return _regenerator.default.wrap(function getFilters$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref17$payload = _ref17.payload, index = _ref17$payload.index, filtersFunc = _ref17$payload.filtersFunc, currentFiler = _ref17$payload.currentFiler;
                call = _ref18.call, put = _ref18.put;
                _context7.next = 4;
                return call(filtersFunc, currentFiler);

              case 4:
                filters = _context7.sent;
                _context7.next = 7;
                return put({
                  type: 'saveFilters',
                  payload: {
                    index: index,
                    filters: filters
                  }
                });

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, getFilters, this);
      })
    }
  };
  (0, _forEach2.default)(actions, function (action) {
    if (action === 'create') {
      model.effects.create = _regenerator.default.mark(function modelCreate(_ref19, _ref20) {
        var _ref19$payload, path, body, call;

        return _regenerator.default.wrap(function modelCreate$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref19$payload = _ref19.payload, path = _ref19$payload.path, body = _ref19$payload.body;
                call = _ref20.call;
                _context8.next = 4;
                return call(service.create, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, modelCreate, this);
      });
    } else if (action === 'edit') {
      model.effects.edit = _regenerator.default.mark(function modelEdit(_ref21, _ref22) {
        var _ref21$payload, path, body, call;

        return _regenerator.default.wrap(function modelEdit$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref21$payload = _ref21.payload, path = _ref21$payload.path, body = _ref21$payload.body;
                call = _ref22.call;
                _context9.next = 4;
                return call(service.edit, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, modelEdit, this);
      });
    } else if (action === 'remove') {
      model.effects.remove = _regenerator.default.mark(function modelRemove(_ref23, _ref24) {
        var _ref23$payload, path, body, call;

        return _regenerator.default.wrap(function modelRemove$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _ref23$payload = _ref23.payload, path = _ref23$payload.path, body = _ref23$payload.body;
                call = _ref24.call;
                _context10.next = 4;
                return call(service.remove, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, modelRemove, this);
      });
    } else if (action === 'order') {
      model.effects.order = _regenerator.default.mark(function modelOrder(_ref25, _ref26) {
        var _ref25$payload, path, body, diff, call;

        return _regenerator.default.wrap(function modelOrder$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref25$payload = _ref25.payload, path = _ref25$payload.path, body = _ref25$payload.body, diff = _ref25$payload.diff;
                call = _ref26.call;
                _context11.next = 4;
                return call(service.order, {
                  path: path,
                  body: (0, _objectSpread3.default)({}, body, (0, _defineProperty2.default)({}, orderKey, body[orderKey] + diff))
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, modelOrder, this);
      });
    }
  });
  return model;
}

function generateRecordsPage(_ref27, component) {
  var namespace = _ref27.namespace,
      actions = _ref27.actions,
      _ref27$api = _ref27.api,
      path = _ref27$api.path,
      defaultFilter = _ref27$api.defaultFilter,
      primaryKey = _ref27.primaryKey,
      searchFileds = _ref27.searchFileds,
      defaultSort = _ref27.defaultSort,
      defaultFilterQuery = _ref27.defaultFilter;
  var customActions = actions.filter(function (action) {
    return (0, _isPlainObject2.default)(action);
  });
  var customGlobalActions = customActions.filter(function (_ref28) {
    var global = _ref28.global;
    return global;
  });
  var customMultipleActions = customActions.filter(function (_ref29) {
    var multiple = _ref29.multiple;
    return multiple;
  });
  var customRowActions = customActions.filter(function (_ref30) {
    var global = _ref30.global;
    return !global;
  });

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
          primaryKey: primaryKey,
          customGlobalActions: customGlobalActions,
          customMultipleActions: customMultipleActions,
          customRowActions: customRowActions,
          searchFileds: searchFileds
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
  var searchSelector = (0, _reselect.createSelector)([function (queries) {
    return queries.search;
  }], function (search) {
    try {
      return JSON.parse(search);
    } catch (e) {
      return {};
    }
  });
  var schemaSelector = (0, _reselect.createSelector)([function (state) {
    return state[namespace].get('schema');
  }], function (schema) {
    return schema.toJS();
  });

  var mapStateToProps = function mapStateToProps(state, props) {
    var queries = (0, _queryString.parse)(props.location.search);
    return {
      filter: filterSelector(queries),
      page: queries.page ? (0, _toInteger2.default)(queries.page) : 1,
      pagesize: queries.pagesize ? (0, _toInteger2.default)(queries.pagesize) : 10,
      records: state[namespace].get('records'),
      schema: schemaSelector(state),
      search: searchSelector(queries),
      sort: queries.sort,
      total: state[namespace].get('total')
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var matchParams = ownProps.match.params,
        history = ownProps.history,
        location = ownProps.location;
    var queries = (0, _queryString.parse)(location.search);

    if ((defaultSort || defaultFilterQuery) && (!queries || Object.keys(queries).length === 0)) {
      var uri = (0, _generateUri2.default)(window.location.href, {
        filter: JSON.stringify(defaultFilterQuery),
        sort: defaultSort
      });
      history.push(uri.href.substring(uri.origin.length, uri.href.length));
    }

    var apiDefaultFilter = {};

    if ((0, _isFunction2.default)(defaultFilter)) {
      apiDefaultFilter = defaultFilter(matchParams);
    } else if ((0, _isPlainObject2.default)(defaultFilter)) {
      apiDefaultFilter = defaultFilter;
    }

    var apiPath = '';

    if ((0, _isFunction2.default)(path)) {
      apiPath = path(matchParams);
    } else if ((0, _isString2.default)(path)) {
      apiPath = path;
    }

    var props = {
      fetch: function () {
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref31) {
          var page, pagesize, sort, search, _ref31$filter, filter;

          return _regenerator.default.wrap(function _callee6$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  page = _ref31.page, pagesize = _ref31.pagesize, sort = _ref31.sort, search = _ref31.search, _ref31$filter = _ref31.filter, filter = _ref31$filter === void 0 ? {} : _ref31$filter;
                  return _context12.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      page: page,
                      pagesize: pagesize,
                      sort: sort,
                      search: search,
                      filter: (0, _objectSpread3.default)({}, filter, apiDefaultFilter),
                      path: apiPath
                    }
                  }));

                case 2:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee6, this);
        }));

        return function fetch(_x6) {
          return _fetch2.apply(this, arguments);
        };
      }(),
      updatePage: function () {
        var _updatePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref32) {
          var page, pagesize, sort, search, _ref32$filter, filter, uri;

          return _regenerator.default.wrap(function _callee7$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  page = _ref32.page, pagesize = _ref32.pagesize, sort = _ref32.sort, search = _ref32.search, _ref32$filter = _ref32.filter, filter = _ref32$filter === void 0 ? {} : _ref32$filter;
                  uri = (0, _generateUri2.default)(window.location.href, {
                    page: page,
                    pagesize: pagesize,
                    sort: sort,
                    filter: JSON.stringify(filter),
                    search: JSON.stringify(search)
                  });
                  history.push(uri.href.substring(uri.origin.length, uri.href.length));

                case 3:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee7, this);
        }));

        return function updatePage(_x7) {
          return _updatePage.apply(this, arguments);
        };
      }()
    };
    (0, _forEach2.default)(actions, function (action) {
      if (action === 'create') {
        props.create = function () {
          var _ref33 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(body) {
            return _regenerator.default.wrap(function _callee8$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    return _context14.abrupt("return", dispatch({
                      type: "".concat(namespace, "/create"),
                      payload: {
                        path: apiPath,
                        body: (0, _objectSpread3.default)({}, body, apiDefaultFilter)
                      }
                    }));

                  case 1:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee8, this);
          }));

          return function (_x8) {
            return _ref33.apply(this, arguments);
          };
        }();
      } else if (action === 'edit') {
        props.edit = function () {
          var _ref34 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(body) {
            return _regenerator.default.wrap(function _callee9$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    return _context15.abrupt("return", dispatch({
                      type: "".concat(namespace, "/edit"),
                      payload: {
                        path: apiPath,
                        body: body
                      }
                    }));

                  case 1:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee9, this);
          }));

          return function (_x9) {
            return _ref34.apply(this, arguments);
          };
        }();
      } else if (action === 'remove') {
        props.remove = function () {
          var _ref35 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee10(body) {
            return _regenerator.default.wrap(function _callee10$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    return _context16.abrupt("return", dispatch({
                      type: "".concat(namespace, "/remove"),
                      payload: {
                        path: apiPath,
                        body: body
                      }
                    }));

                  case 1:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee10, this);
          }));

          return function (_x10) {
            return _ref35.apply(this, arguments);
          };
        }();
      } else if (action === 'order') {
        props.order = function () {
          var _ref36 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee11(body, diff) {
            return _regenerator.default.wrap(function _callee11$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    return _context17.abrupt("return", dispatch({
                      type: "".concat(namespace, "/order"),
                      payload: {
                        path: apiPath,
                        body: body,
                        diff: diff
                      }
                    }));

                  case 1:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _callee11, this);
          }));

          return function (_x11, _x12) {
            return _ref36.apply(this, arguments);
          };
        }();
      }
    });
    return props;
  };

  return (0, _router.withRouter)((0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordsComponent(_ref37) {
  var app = _ref37.app,
      config = _ref37.config,
      _component = _ref37.component;
  var service = generateService(config);
  var model = generateModel(config, service);
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordsPage(config, _component));
    }
  });
}

function dynamicRecordsComponent(_ref38) {
  var app = _ref38.app,
      config = _ref38.config,
      component = _ref38.component;

  if (!app) {
    throw new Error('dynamicRecordsComponent: app is required');
  }

  if (!config) {
    throw new Error('dynamicRecordsComponent: config is required');
  }

  if ((0, _isFunction2.default)(config)) {
    return (0, _dynamic.default)({
      app: app,
      resolve: function resolve() {
        return config().then(function (c) {
          return generateDynamicRecordsComponent({
            app: app,
            config: c.default || c,
            component: component
          });
        });
      }
    });
  }

  return generateDynamicRecordsComponent({
    app: app,
    config: config,
    component: component
  });
}