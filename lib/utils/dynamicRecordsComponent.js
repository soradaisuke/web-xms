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

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _router = require("dva/router");

var _dva = require("dva");

var _queryString = require("query-string");

var _generateUri = _interopRequireDefault(require("./generateUri"));

var _request = _interopRequireDefault(require("../services/request"));

var _RecordsPage = _interopRequireDefault(require("../pages/RecordsPage"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

function generateService(_ref) {
  var path = _ref.api.path,
      _ref$action = _ref.action;
  _ref$action = _ref$action === void 0 ? {} : _ref$action;
  var create = _ref$action.create,
      edit = _ref$action.edit,
      remove = _ref$action.remove;

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

  if (create) {
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
  }

  if (edit) {
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
  }

  if (remove) {
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
  }

  return service;
}

function generateModel(_ref5, service) {
  var namespace = _ref5.namespace,
      _ref5$api = _ref5.api;
  _ref5$api = _ref5$api === void 0 ? {} : _ref5$api;
  var _ref5$api$defaultFilt = _ref5$api.defaultFilter,
      defaultFilter = _ref5$api$defaultFilt === void 0 ? {} : _ref5$api$defaultFilt,
      _ref5$action = _ref5.action,
      create = _ref5$action.create,
      edit = _ref5$action.edit,
      remove = _ref5$action.remove,
      schema = _ref5.schema;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var defaultSort;
  var searchFileds = [];
  (0, _forEach2.default)(schema, function (definition) {
    if (definition.sort && definition.sort.default) {
      defaultSort = "".concat(definition.key, " ").concat(definition.sort.default);
    }

    if (definition.search) {
      searchFileds.push({
        key: definition.key,
        title: definition.title
      });
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
      save: function save(state, _ref6) {
        var _ref6$payload = _ref6.payload,
            records = _ref6$payload.records,
            total = _ref6$payload.total;
        return state.merge(_immutable.default.fromJS({
          records: records,
          total: total
        }));
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref7, _ref8) {
        var _ref7$payload, page, pagesize, sort, search, _ref7$payload$filter, filter, params, call, put, f, _ref9, records, total;

        return _regenerator.default.wrap(function fetch$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref7$payload = _ref7.payload, page = _ref7$payload.page, pagesize = _ref7$payload.pagesize, sort = _ref7$payload.sort, search = _ref7$payload.search, _ref7$payload$filter = _ref7$payload.filter, filter = _ref7$payload$filter === void 0 ? {} : _ref7$payload$filter, params = _ref7$payload.params;
                call = _ref8.call, put = _ref8.put;
                f = filter;

                if ((0, _isFunction2.default)(defaultFilter)) {
                  f = (0, _objectSpread2.default)({}, f, defaultFilter(params));
                } else if (defaultFilter) {
                  f = (0, _objectSpread2.default)({}, f, defaultFilter);
                }

                if (search) {
                  f = (0, _objectSpread2.default)({}, f, searchFileds.reduce(function (acc, field) {
                    acc[field.key] = "%".concat(search, "%");
                    return acc;
                  }, {}));
                }

                _context5.next = 7;
                return call(service.fetch, {
                  page: page,
                  pagesize: pagesize,
                  filter: JSON.stringify(f),
                  order: sort
                });

              case 7:
                _ref9 = _context5.sent;
                records = _ref9.items;
                total = _ref9.total;
                _context5.next = 12;
                return put({
                  type: 'save',
                  payload: {
                    total: total,
                    records: records
                  }
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, fetch, this);
      })
    }
  };

  if (create) {
    model.effects.create = _regenerator.default.mark(function modelCreate(_ref10, _ref11) {
      var body, call;
      return _regenerator.default.wrap(function modelCreate$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              body = _ref10.payload.body;
              call = _ref11.call;
              _context6.next = 4;
              return call(service.create, body);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, modelCreate, this);
    });
  }

  if (edit) {
    model.effects.edit = _regenerator.default.mark(function modelEdit(_ref12, _ref13) {
      var body, call;
      return _regenerator.default.wrap(function modelEdit$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              body = _ref12.payload.body;
              call = _ref13.call;
              _context7.next = 4;
              return call(service.edit, body);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, modelEdit, this);
    });
  }

  if (remove) {
    model.effects.remove = _regenerator.default.mark(function modelRemove(_ref14, _ref15) {
      var id, call;
      return _regenerator.default.wrap(function modelRemove$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = _ref14.payload.id;
              call = _ref15.call;
              _context8.next = 4;
              return call(service.remove, id);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, modelRemove, this);
    });
  }

  return model;
}

function generateModal(_ref16) {
  var namespace = _ref16.namespace,
      schema = _ref16.schema,
      _ref16$action = _ref16.action,
      create = _ref16$action.create,
      edit = _ref16$action.edit;

  if (!create && !edit) {
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

function generateRecordsPage(_ref17, Modal) {
  var namespace = _ref17.namespace,
      schema = _ref17.schema,
      _ref17$action = _ref17.action,
      create = _ref17$action.create,
      edit = _ref17$action.edit,
      remove = _ref17$action.remove,
      orderAction = _ref17$action.order;

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
          schema: schema
        }));
      }
    }]);
    return Page;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(Page, "displayName", "".concat((0, _upperFirst2.default)(namespace), "Page"));

  var mapStateToProps = function mapStateToProps(state) {
    var queries = (0, _queryString.parse)(window.location.search);
    return {
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
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_ref18) {
          var page, pagesize, sort, search, params;
          return _regenerator.default.wrap(function _callee5$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  page = _ref18.page, pagesize = _ref18.pagesize, sort = _ref18.sort, search = _ref18.search, params = _ref18.params;
                  return _context9.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      page: page,
                      pagesize: pagesize,
                      sort: sort,
                      search: search,
                      params: params
                    }
                  }));

                case 2:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee5, this);
        }));

        return function fetch(_x5) {
          return _fetch2.apply(this, arguments);
        };
      }(),
      changePage: function () {
        var _changePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref19) {
          var page, pagesize, uri;
          return _regenerator.default.wrap(function _callee6$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  page = _ref19.page, pagesize = _ref19.pagesize;
                  uri = (0, _generateUri.default)(window.location.href, {
                    page: page,
                    pagesize: pagesize
                  });
                  return _context10.abrupt("return", dispatch(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

                case 3:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee6, this);
        }));

        return function changePage(_x6) {
          return _changePage.apply(this, arguments);
        };
      }(),
      changeSort: function () {
        var _changeSort = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref20) {
          var key, order, uri;
          return _regenerator.default.wrap(function _callee7$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  key = _ref20.key, order = _ref20.order;
                  uri = (0, _generateUri.default)(window.location.href, {
                    sort: "".concat(key, " ").concat(order)
                  });
                  return _context11.abrupt("return", dispatch(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

                case 3:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee7, this);
        }));

        return function changeSort(_x7) {
          return _changeSort.apply(this, arguments);
        };
      }(),
      changeSearch: function () {
        var _changeSearch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(_ref21) {
          var search, uri;
          return _regenerator.default.wrap(function _callee8$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  search = _ref21.search;
                  uri = (0, _generateUri.default)(window.location.href, {
                    search: search
                  });
                  return _context12.abrupt("return", dispatch(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

                case 3:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee8, this);
        }));

        return function changeSearch(_x8) {
          return _changeSearch.apply(this, arguments);
        };
      }()
    };

    if (create) {
      props.create = function () {
        var _ref22 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(body) {
          return _regenerator.default.wrap(function _callee9$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt("return", dispatch({
                    type: "".concat(namespace, "/create"),
                    payload: {
                      body: body
                    }
                  }));

                case 1:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee9, this);
        }));

        return function (_x9) {
          return _ref22.apply(this, arguments);
        };
      }();
    }

    if (edit) {
      props.edit = function () {
        var _ref23 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee10(body) {
          return _regenerator.default.wrap(function _callee10$(_context14) {
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
          }, _callee10, this);
        }));

        return function (_x10) {
          return _ref23.apply(this, arguments);
        };
      }();
    }

    if (remove) {
      props.remove = function () {
        var _ref24 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee11(id) {
          return _regenerator.default.wrap(function _callee11$(_context15) {
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
          }, _callee11, this);
        }));

        return function (_x11) {
          return _ref24.apply(this, arguments);
        };
      }();
    }

    if (orderAction) {
      props.order = props.edit;
    }

    return props;
  };

  return (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent(_ref25) {
  var app = _ref25.app,
      config = _ref25.config;
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

function dynamicRecordsComponent(_ref26) {
  var app = _ref26.app,
      config = _ref26.config;

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