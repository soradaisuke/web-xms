"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecordsComponent;

var _generateUri2 = _interopRequireDefault(require("@qt/web-core/lib/generateUri"));

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

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _get2 = _interopRequireDefault(require("lodash/get"));

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

var _ColumnTypes = _interopRequireDefault(require("./ColumnTypes"));

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

function generateService(_ref) {
  var _ref$api = _ref.api;
  _ref$api = _ref$api === void 0 ? {} : _ref$api;
  var _fetch = _ref$api.fetch,
      actions = _ref.actions,
      primaryKey = _ref.primaryKey;
  var service = {
    fetch: function () {
      var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var path, params;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _ref2.path, params = (0, _objectWithoutProperties2.default)(_ref2, ["path"]);
                return _context.abrupt("return", _fetch ? _fetch({
                  path: path,
                  query: params
                }) : _request.default.get(path, {
                  params: params
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
          }, _callee2);
        }));

        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }();
    } else if (action === 'edit' || action === 'inlineEdit') {
      service.edit = function () {
        var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref5) {
          var path, body;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  path = _ref5.path, body = _ref5.body;
                  return _context3.abrupt("return", _request.default.put("".concat(path, "/").concat((0, _get2.default)(body, primaryKey)), {
                    body: body
                  }));

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
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
                  return _context4.abrupt("return", _request.default.remove("".concat(path, "/").concat((0, _get2.default)(body, primaryKey))));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
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
                  return _context5.abrupt("return", _request.default.put("".concat(path, "/").concat((0, _get2.default)(body, primaryKey)), {
                    body: body
                  }));

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
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
      table = _ref11.table,
      orderKey = _ref11.orderKey;

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
        return state.set('table', state.get('table').setIn([index, 'filters'], filters).setIn([index, 'enabledFilters'], filters.filter(function (_ref14) {
          var disabled = _ref14.disabled;
          return !disabled;
        })));
      },
      saveModalFilters: function saveModalFilters(state, _ref15) {
        var _ref15$payload = _ref15.payload,
            filters = _ref15$payload.filters,
            index = _ref15$payload.index;
        return state.set('table', state.get('table').setIn([index, 'modalFilters'], filters));
      },
      saveError: function saveError(state, _ref16) {
        var error = _ref16.payload.error;
        return state.set('error', error);
      }
    },
    effects: {
      fetch: [_regenerator.default.mark(function fetch(_ref17, _ref18) {
        var _ref17$payload, path, page, pagesize, sort, _ref17$payload$search, search, _ref17$payload$filter, filter, call, put, currentFiler, i, _ref19, records, total;

        return _regenerator.default.wrap(function fetch$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref17$payload = _ref17.payload, path = _ref17$payload.path, page = _ref17$payload.page, pagesize = _ref17$payload.pagesize, sort = _ref17$payload.sort, _ref17$payload$search = _ref17$payload.search, search = _ref17$payload$search === void 0 ? {} : _ref17$payload$search, _ref17$payload$filter = _ref17$payload.filter, filter = _ref17$payload$filter === void 0 ? {} : _ref17$payload$filter;
                call = _ref18.call, put = _ref18.put;
                _context6.next = 4;
                return put({
                  type: 'saveError',
                  payload: {
                    error: null
                  }
                });

              case 4:
                currentFiler = (0, _objectSpread3.default)({}, filter, search);
                i = 0;

              case 6:
                if (!(i < table.length)) {
                  _context6.next = 13;
                  break;
                }

                if (!(0, _isFunction2.default)(table[i].filters)) {
                  _context6.next = 10;
                  break;
                }

                _context6.next = 10;
                return put({
                  type: 'getFilters',
                  payload: {
                    index: i,
                    filtersFunc: table[i].filters,
                    currentFiler: currentFiler
                  }
                });

              case 10:
                i += 1;
                _context6.next = 6;
                break;

              case 13:
                _context6.prev = 13;
                _context6.next = 16;
                return call(service.fetch, {
                  path: path,
                  page: page,
                  pagesize: pagesize,
                  filter: JSON.stringify(currentFiler),
                  order: sort
                });

              case 16:
                _ref19 = _context6.sent;
                records = _ref19.items;
                total = _ref19.total;
                _context6.next = 21;
                return put({
                  type: 'save',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 21:
                _context6.next = 27;
                break;

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6["catch"](13);
                _context6.next = 27;
                return put({
                  type: 'saveError',
                  payload: {
                    error: _context6.t0
                  }
                });

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, fetch, null, [[13, 23]]);
      }), {
        type: 'takeLatest'
      }],
      getFilters: _regenerator.default.mark(function getFilters(_ref20, _ref21) {
        var _ref20$payload, index, filtersFunc, currentFiler, call, put, filters;

        return _regenerator.default.wrap(function getFilters$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref20$payload = _ref20.payload, index = _ref20$payload.index, filtersFunc = _ref20$payload.filtersFunc, currentFiler = _ref20$payload.currentFiler;
                call = _ref21.call, put = _ref21.put;
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
        }, getFilters);
      }),
      updateModalFilters: _regenerator.default.mark(function updateModalFilters(_ref22, _ref23) {
        var _ref22$payload, mapKey, formFieldsValue, call, put, index, targetTable, filters;

        return _regenerator.default.wrap(function updateModalFilters$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref22$payload = _ref22.payload, mapKey = _ref22$payload.mapKey, formFieldsValue = _ref22$payload.formFieldsValue;
                call = _ref23.call, put = _ref23.put;
                index = (0, _findIndex2.default)(table, function (_ref24) {
                  var mk = _ref24.mapKey;
                  return mk === mapKey;
                });
                targetTable = table[index];

                if (!(targetTable && (0, _isFunction2.default)(targetTable.filters))) {
                  _context8.next = 10;
                  break;
                }

                _context8.next = 7;
                return call(targetTable.filters, formFieldsValue);

              case 7:
                filters = _context8.sent;
                _context8.next = 10;
                return put({
                  type: 'saveModalFilters',
                  payload: {
                    index: index,
                    filters: filters
                  }
                });

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, updateModalFilters);
      })
    }
  };
  (0, _forEach2.default)(actions, function (action) {
    if (action === 'create') {
      model.effects.create = _regenerator.default.mark(function modelCreate(_ref25, _ref26) {
        var _ref25$payload, path, body, call;

        return _regenerator.default.wrap(function modelCreate$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref25$payload = _ref25.payload, path = _ref25$payload.path, body = _ref25$payload.body;
                call = _ref26.call;
                _context9.next = 4;
                return call(service.create, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, modelCreate);
      });
    } else if (action === 'edit' || action === 'inlineEdit') {
      model.effects.edit = _regenerator.default.mark(function modelEdit(_ref27, _ref28) {
        var _ref27$payload, path, body, call;

        return _regenerator.default.wrap(function modelEdit$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _ref27$payload = _ref27.payload, path = _ref27$payload.path, body = _ref27$payload.body;
                call = _ref28.call;
                _context10.next = 4;
                return call(service.edit, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, modelEdit);
      });
    } else if (action === 'remove') {
      model.effects.remove = _regenerator.default.mark(function modelRemove(_ref29, _ref30) {
        var _ref29$payload, path, body, call;

        return _regenerator.default.wrap(function modelRemove$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref29$payload = _ref29.payload, path = _ref29$payload.path, body = _ref29$payload.body;
                call = _ref30.call;
                _context11.next = 4;
                return call(service.remove, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, modelRemove);
      });
    } else if (action === 'order') {
      model.effects.order = _regenerator.default.mark(function modelOrder(_ref31, _ref32) {
        var _ref31$payload, path, body, diff, call;

        return _regenerator.default.wrap(function modelOrder$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _ref31$payload = _ref31.payload, path = _ref31$payload.path, body = _ref31$payload.body, diff = _ref31$payload.diff;
                call = _ref32.call;
                _context12.next = 4;
                return call(service.order, {
                  path: path,
                  body: (0, _objectSpread3.default)({}, body, (0, _defineProperty2.default)({}, orderKey, body[orderKey] + diff))
                });

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, modelOrder);
      });
    }
  });
  return model;
}

function generateRecordsPage(_ref33, component) {
  var _ref33$api = _ref33.api,
      host = _ref33$api.host,
      path = _ref33$api.path,
      defaultFilter = _ref33$api.defaultFilter,
      namespace = _ref33.namespace,
      actions = _ref33.actions,
      primaryKey = _ref33.primaryKey,
      searchFields = _ref33.searchFields,
      fixedSort = _ref33.fixedSort,
      defaultSort = _ref33.defaultSort,
      table = _ref33.table,
      defaultFilterQuery = _ref33.defaultFilter;
  var customActions = actions.filter(function (action) {
    return (0, _isPlainObject2.default)(action);
  });
  var customGlobalActions = customActions.filter(function (_ref34) {
    var global = _ref34.global,
        multiple = _ref34.multiple;
    return global && !multiple;
  });
  var customMultipleActions = customActions.filter(function (_ref35) {
    var multiple = _ref35.multiple;
    return multiple;
  });
  var customRowActions = customActions.filter(function (_ref36) {
    var global = _ref36.global;
    return !global;
  });
  var customMultipleEdits = table.filter(function (_ref37) {
    var multipleEdit = _ref37.multipleEdit;
    return multipleEdit;
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
          searchFields: searchFields,
          defaultFilter: defaultFilterQuery,
          customMultipleEdits: customMultipleEdits
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
  var tableSelector = (0, _reselect.createSelector)([function (state) {
    return state[namespace].get('table');
  }], function (sche) {
    return sche.toJS();
  });
  var filterInGroupTables = (0, _reselect.createSelector)([function (state) {
    return state[namespace].get('table');
  }], function (sche) {
    var tables = sche.toJS();
    return tables.filter(function (_ref38) {
      var type = _ref38.type,
          canFilter = _ref38.canFilter,
          visibility = _ref38.visibility,
          filterTree = _ref38.filterTree;
      return canFilter && (type === _ColumnTypes.default.date || type === _ColumnTypes.default.datetime || type === _ColumnTypes.default.number || !(visibility && visibility.table) || filterTree);
    });
  });

  var mapStateToProps = function mapStateToProps(state, props) {
    var queries = (0, _queryString.parse)(props.location.search);
    return {
      filter: filterSelector(queries),
      page: queries.page ? (0, _toInteger2.default)(queries.page) : 1,
      pagesize: queries.pagesize ? (0, _toInteger2.default)(queries.pagesize) : 10,
      records: state[namespace].get('records'),
      table: tableSelector(state),
      filterInGroupTables: filterInGroupTables(state),
      search: searchSelector(queries) || {},
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

    if (host) {
      apiPath = "".concat(host).concat(apiPath);
    }

    var props = {
      fetch: function () {
        var _fetch3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref39) {
          var page, pagesize, sort, search, _ref39$filter, filter, queries, uri;

          return _regenerator.default.wrap(function _callee6$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  page = _ref39.page, pagesize = _ref39.pagesize, sort = _ref39.sort, search = _ref39.search, _ref39$filter = _ref39.filter, filter = _ref39$filter === void 0 ? {} : _ref39$filter;
                  queries = (0, _queryString.parse)(location.search);

                  if (!(fixedSort && fixedSort !== sort || (defaultSort || defaultFilterQuery) && (!queries || Object.keys(queries).length === 0))) {
                    _context13.next = 6;
                    break;
                  }

                  uri = (0, _generateUri2.default)(window.location.href, {
                    filter: JSON.stringify(defaultFilterQuery),
                    sort: fixedSort || defaultSort
                  });
                  history.replace(uri.href.substring(uri.origin.length, uri.href.length));
                  return _context13.abrupt("return", Promise.resolve());

                case 6:
                  return _context13.abrupt("return", dispatch({
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

                case 7:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee6);
        }));

        function fetch(_x6) {
          return _fetch3.apply(this, arguments);
        }

        return fetch;
      }(),
      updateModalFilters: function () {
        var _updateModalFilters = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(mapKey, formFieldsValue) {
          return _regenerator.default.wrap(function _callee7$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt("return", dispatch({
                    type: "".concat(namespace, "/updateModalFilters"),
                    payload: {
                      mapKey: mapKey,
                      formFieldsValue: formFieldsValue
                    }
                  }));

                case 1:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee7);
        }));

        function updateModalFilters(_x7, _x8) {
          return _updateModalFilters.apply(this, arguments);
        }

        return updateModalFilters;
      }(),
      updatePage: function () {
        var _updatePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(_ref40) {
          var page, pagesize, sort, search, filter, newQuery, uri;
          return _regenerator.default.wrap(function _callee8$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  page = _ref40.page, pagesize = _ref40.pagesize, sort = _ref40.sort, search = _ref40.search, filter = _ref40.filter;
                  newQuery = {
                    page: page,
                    pagesize: pagesize,
                    sort: sort,
                    filter: (0, _isUndefined2.default)(filter) ? filter : JSON.stringify(filter),
                    search: (0, _isUndefined2.default)(search) ? search : JSON.stringify(search)
                  };
                  (0, _forEach2.default)(newQuery, function (v, key) {
                    if ((0, _isUndefined2.default)(v)) delete newQuery[key];
                  });
                  uri = (0, _generateUri2.default)(window.location.href, newQuery);
                  history.push(uri.href.substring(uri.origin.length, uri.href.length));

                case 5:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee8);
        }));

        function updatePage(_x9) {
          return _updatePage.apply(this, arguments);
        }

        return updatePage;
      }()
    };
    (0, _forEach2.default)(actions, function (action) {
      if (action === 'create') {
        props.create = function () {
          var _ref41 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(body) {
            return _regenerator.default.wrap(function _callee9$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    return _context16.abrupt("return", dispatch({
                      type: "".concat(namespace, "/create"),
                      payload: {
                        path: apiPath,
                        body: (0, _objectSpread3.default)({}, body, apiDefaultFilter)
                      }
                    }));

                  case 1:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee9);
          }));

          return function (_x10) {
            return _ref41.apply(this, arguments);
          };
        }();
      } else if (action === 'edit' || action === 'inlineEdit') {
        props[action] = function () {
          var _ref42 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee10(body) {
            return _regenerator.default.wrap(function _callee10$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    return _context17.abrupt("return", dispatch({
                      type: "".concat(namespace, "/edit"),
                      payload: {
                        path: apiPath,
                        body: body
                      }
                    }));

                  case 1:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _callee10);
          }));

          return function (_x11) {
            return _ref42.apply(this, arguments);
          };
        }();
      } else if (action === 'remove') {
        props.remove = function () {
          var _ref43 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee11(body) {
            return _regenerator.default.wrap(function _callee11$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    return _context18.abrupt("return", dispatch({
                      type: "".concat(namespace, "/remove"),
                      payload: {
                        path: apiPath,
                        body: body
                      }
                    }));

                  case 1:
                  case "end":
                    return _context18.stop();
                }
              }
            }, _callee11);
          }));

          return function (_x12) {
            return _ref43.apply(this, arguments);
          };
        }();
      } else if (action === 'order') {
        props.order = function () {
          var _ref44 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee12(body, diff) {
            return _regenerator.default.wrap(function _callee12$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    return _context19.abrupt("return", dispatch({
                      type: "".concat(namespace, "/order"),
                      payload: {
                        path: apiPath,
                        body: body,
                        diff: diff
                      }
                    }));

                  case 1:
                  case "end":
                    return _context19.stop();
                }
              }
            }, _callee12);
          }));

          return function (_x13, _x14) {
            return _ref44.apply(this, arguments);
          };
        }();
      } else if (action === 'create_in_new_page') {
        props.hasCreateNew = true;
      }
    });
    return props;
  };

  return (0, _router.withRouter)((0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordsComponent(_ref45) {
  var app = _ref45.app,
      config = _ref45.config,
      _component = _ref45.component;
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

function dynamicRecordsComponent(_ref46) {
  var app = _ref46.app,
      config = _ref46.config,
      component = _ref46.component;

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