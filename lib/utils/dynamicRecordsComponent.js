"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecordsComponent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _router = require("dva/router");

var _dva = require("dva");

var _reselect = require("reselect");

var _queryString = require("query-string");

var _generateUri = _interopRequireDefault(require("./generateUri"));

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var ORDER = _DataType.default.ORDER;

function generateService(_ref) {
  var path = _ref.api.path,
      actions = _ref.actions;

  if (!path) {
    throw new Error('dynamicRecordsComponent generateService: path is required');
  }

  var service = {
    fetch: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(params) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _request.default.get(path, {
                  params: params
                }));

              case 1:
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
        var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(body) {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _request.default.post("".concat(path), {
                    body: body
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }();
    } else if (action === 'edit') {
      service.edit = function () {
        var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(body) {
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", _request.default.put("".concat(path, "/").concat(body.id), {
                    body: body
                  }));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }();
    } else if (action === 'remove') {
      service.remove = function () {
        var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(id) {
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", _request.default.remove("".concat(path, "/").concat(id)));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }();
    } else if (action === 'order') {
      service.order = function () {
        var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(body) {
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", _request.default.put("".concat(path, "/").concat(body.id), {
                    body: body
                  }));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }();
    }
  });
  return service;
}

function generateModel(_ref6, service) {
  var namespace = _ref6.namespace,
      _ref6$api = _ref6.api;
  _ref6$api = _ref6$api === void 0 ? {} : _ref6$api;
  var _ref6$api$defaultFilt = _ref6$api.defaultFilter,
      defaultFilter = _ref6$api$defaultFilt === void 0 ? {} : _ref6$api$defaultFilt,
      actions = _ref6.actions,
      schema = _ref6.schema;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var defaultSort;
  var orderField;
  var searchFileds = [];
  (0, _forEach2.default)(schema, function (definition) {
    if (definition.sort && definition.defaultSort) {
      defaultSort = "".concat(definition.key, " ").concat(definition.defaultSort);
    }

    if (definition.search) {
      searchFileds.push({
        key: definition.key,
        title: definition.title
      });
    }

    if (definition.type === ORDER) {
      orderField = definition.key;
    }
  });
  var model = {
    namespace: namespace,
    state: _immutable.default.fromJS({
      records: [],
      total: 0,
      defaultSort: defaultSort,
      canSearch: searchFileds.length > 0,
      searchPlaceHolder: searchFileds.map(function (filed) {
        return filed.title;
      }).join('、')
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
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref8, _ref9) {
        var _ref8$payload, page, pagesize, sort, search, _ref8$payload$filter, filter, params, call, put, f, _ref10, records, total;

        return _regenerator.default.wrap(function fetch$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref8$payload = _ref8.payload, page = _ref8$payload.page, pagesize = _ref8$payload.pagesize, sort = _ref8$payload.sort, search = _ref8$payload.search, _ref8$payload$filter = _ref8$payload.filter, filter = _ref8$payload$filter === void 0 ? {} : _ref8$payload$filter, params = _ref8$payload.params;
                call = _ref9.call, put = _ref9.put;
                f = filter;

                if ((0, _isFunction2.default)(defaultFilter)) {
                  f = (0, _objectSpread3.default)({}, f, defaultFilter(params));
                } else if ((0, _isPlainObject2.default)(defaultFilter)) {
                  f = (0, _objectSpread3.default)({}, f, defaultFilter);
                }

                if (search) {
                  f = (0, _objectSpread3.default)({}, f, searchFileds.reduce(function (acc, field) {
                    acc[field.key] = "%".concat(search, "%");
                    return acc;
                  }, {}));
                }

                _context6.next = 7;
                return call(service.fetch, {
                  page: page,
                  pagesize: pagesize,
                  filter: JSON.stringify(f),
                  order: sort
                });

              case 7:
                _ref10 = _context6.sent;
                records = _ref10.items;
                total = _ref10.total;
                _context6.next = 12;
                return put({
                  type: 'save',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, fetch, this);
      })
    }
  };
  (0, _forEach2.default)(actions, function (action) {
    if (action === 'create') {
      model.effects.create = _regenerator.default.mark(function modelCreate(_ref11, _ref12) {
        var _ref11$payload, body, params, call, newBody;

        return _regenerator.default.wrap(function modelCreate$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref11$payload = _ref11.payload, body = _ref11$payload.body, params = _ref11$payload.params;
                call = _ref12.call;
                newBody = body;

                if ((0, _isFunction2.default)(defaultFilter)) {
                  newBody = (0, _objectSpread3.default)({}, newBody, defaultFilter(params));
                } else if ((0, _isPlainObject2.default)(defaultFilter)) {
                  newBody = (0, _objectSpread3.default)({}, newBody, defaultFilter);
                }

                _context7.next = 6;
                return call(service.create, newBody);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, modelCreate, this);
      });
    } else if (action === 'edit') {
      model.effects.edit = _regenerator.default.mark(function modelEdit(_ref13, _ref14) {
        var body, call;
        return _regenerator.default.wrap(function modelEdit$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                body = _ref13.payload.body;
                call = _ref14.call;
                _context8.next = 4;
                return call(service.edit, body);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, modelEdit, this);
      });
    } else if (action === 'remove') {
      model.effects.remove = _regenerator.default.mark(function modelRemove(_ref15, _ref16) {
        var id, call;
        return _regenerator.default.wrap(function modelRemove$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = _ref15.payload.id;
                call = _ref16.call;
                _context9.next = 4;
                return call(service.remove, id);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, modelRemove, this);
      });
    } else if (action === 'order') {
      model.effects.order = _regenerator.default.mark(function modelOrder(_ref17, _ref18) {
        var _ref17$payload, body, diff, call;

        return _regenerator.default.wrap(function modelOrder$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _ref17$payload = _ref17.payload, body = _ref17$payload.body, diff = _ref17$payload.diff;
                call = _ref18.call;
                _context10.next = 4;
                return call(service.order, (0, _objectSpread3.default)({}, body, (0, _defineProperty2.default)({}, orderField, body[orderField] + diff)));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, modelOrder, this);
      });
    }
  });
  return model;
}

function generateModal(_ref19) {
  var namespace = _ref19.namespace,
      schema = _ref19.schema,
      actions = _ref19.actions;

  if (!(0, _find2.default)(actions, function (action) {
    return action === 'create';
  }) && !(0, _find2.default)(actions, function (action) {
    return action === 'edit';
  })) {
    return null;
  }

  var Modal = function (_React$PureComponent) {
    (0, _inherits2.default)(Modal, _React$PureComponent);

    function Modal() {
      (0, _classCallCheck2.default)(this, Modal);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Modal).apply(this, arguments));
    }

    (0, _createClass2.default)(Modal, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            onOk = _this$props.onOk,
            record = _this$props.record;
        return _react.default.createElement(_RecordModal.default, {
          activator: children,
          record: record,
          schema: schema,
          onOk: onOk
        });
      }
    }]);
    return Modal;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(Modal, "displayName", "".concat((0, _upperFirst2.default)(namespace), "Modal"));
  (0, _defineProperty2.default)(Modal, "propTypes", {
    children: _propTypes.default.node.isRequired,
    record: _propTypes.default.object.isRequired,
    onOk: _propTypes.default.func.isRequired
  });
  return Modal;
}

function generateRecordsPage(_ref20, Modal) {
  var namespace = _ref20.namespace,
      schema = _ref20.schema,
      actions = _ref20.actions;

  var Page = function (_React$PureComponent2) {
    (0, _inherits2.default)(Page, _React$PureComponent2);

    function Page() {
      (0, _classCallCheck2.default)(this, Page);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).apply(this, arguments));
    }

    (0, _createClass2.default)(Page, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_RecordsPage.default, (0, _extends2.default)({
          Modal: Modal
        }, this.props, {
          schema: schema,
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

  var mapStateToProps = function mapStateToProps(state) {
    var queries = (0, _queryString.parse)(window.location.search);
    return {
      filter: filterSelector(queries),
      canSearch: state[namespace].get('canSearch'),
      searchPlaceHolder: state[namespace].get('searchPlaceHolder'),
      page: queries.page ? (0, _toInteger2.default)(queries.page) : 1,
      pagesize: queries.pagesize ? (0, _toInteger2.default)(queries.pagesize) : 10,
      sort: queries.sort || state[namespace].get('defaultSort'),
      search: queries.search,
      records: state[namespace].get('records'),
      total: state[namespace].get('total'),
      searchFileds: state[namespace].get('searchFileds')
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    var props = {
      fetch: function () {
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref21) {
          var page, pagesize, sort, search, filter, params;
          return _regenerator.default.wrap(function _callee6$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  page = _ref21.page, pagesize = _ref21.pagesize, sort = _ref21.sort, search = _ref21.search, filter = _ref21.filter, params = _ref21.params;
                  return _context11.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      page: page,
                      pagesize: pagesize,
                      sort: sort,
                      search: search,
                      filter: filter,
                      params: params
                    }
                  }));

                case 2:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee6, this);
        }));

        return function fetch(_x6) {
          return _fetch2.apply(this, arguments);
        };
      }(),
      updatePage: function () {
        var _updatePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref22) {
          var page, pagesize, sort, search, _ref22$filter, filter, uri;

          return _regenerator.default.wrap(function _callee7$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  page = _ref22.page, pagesize = _ref22.pagesize, sort = _ref22.sort, search = _ref22.search, _ref22$filter = _ref22.filter, filter = _ref22$filter === void 0 ? {} : _ref22$filter;
                  uri = (0, _generateUri.default)(window.location.href, {
                    page: page,
                    pagesize: pagesize,
                    search: search,
                    sort: sort,
                    filter: JSON.stringify(filter)
                  });
                  return _context12.abrupt("return", dispatch(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

                case 3:
                case "end":
                  return _context12.stop();
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
          var _ref23 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(body, params) {
            return _regenerator.default.wrap(function _callee8$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    return _context13.abrupt("return", dispatch({
                      type: "".concat(namespace, "/create"),
                      payload: {
                        body: body,
                        params: params
                      }
                    }));

                  case 1:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee8, this);
          }));

          return function (_x8, _x9) {
            return _ref23.apply(this, arguments);
          };
        }();
      } else if (action === 'edit') {
        props.edit = function () {
          var _ref24 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(body) {
            return _regenerator.default.wrap(function _callee9$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    return _context14.abrupt("return", dispatch({
                      type: "".concat(namespace, "/edit"),
                      payload: {
                        body: body
                      }
                    }));

                  case 1:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee9, this);
          }));

          return function (_x10) {
            return _ref24.apply(this, arguments);
          };
        }();
      } else if (action === 'remove') {
        props.remove = function () {
          var _ref25 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee10(id) {
            return _regenerator.default.wrap(function _callee10$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    return _context15.abrupt("return", dispatch({
                      type: "".concat(namespace, "/remove"),
                      payload: {
                        id: id
                      }
                    }));

                  case 1:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee10, this);
          }));

          return function (_x11) {
            return _ref25.apply(this, arguments);
          };
        }();
      } else if (action === 'order') {
        props.order = function () {
          var _ref26 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee11(body, diff) {
            return _regenerator.default.wrap(function _callee11$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    return _context16.abrupt("return", dispatch({
                      type: "".concat(namespace, "/order"),
                      payload: {
                        body: body,
                        diff: diff
                      }
                    }));

                  case 1:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee11, this);
          }));

          return function (_x12, _x13) {
            return _ref26.apply(this, arguments);
          };
        }();
      }
    });
    return props;
  };

  return (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent(_ref27) {
  var app = _ref27.app,
      config = _ref27.config;
  var service = generateService(config);
  var model = generateModel(config, service);
  var Modal = generateModal(config);
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordsPage(config, Modal));
    }
  });
}

function dynamicRecordsComponent(_ref28) {
  var app = _ref28.app,
      config = _ref28.config;

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
            config: c.default || c
          });
        });
      }
    });
  }

  return generateDynamicRecordsComponent({
    app: app,
    config: config
  });
}