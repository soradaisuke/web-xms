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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

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
      defaultOrder = _ref5$api.defaultOrder,
      _ref5$action = _ref5.action,
      create = _ref5$action.create,
      edit = _ref5$action.edit,
      remove = _ref5$action.remove;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var model = {
    namespace: namespace,
    state: _immutable.default.fromJS({
      records: [],
      total: 0,
      page: 0,
      pagesize: 0
    }),
    reducers: {
      save: function save(state, _ref6) {
        var _ref6$payload = _ref6.payload,
            records = _ref6$payload.records,
            total = _ref6$payload.total,
            page = _ref6$payload.page,
            pagesize = _ref6$payload.pagesize;
        return state.merge(_immutable.default.fromJS({
          records: records,
          total: total,
          page: page,
          pagesize: pagesize
        }));
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref7, _ref8) {
        var _ref7$payload, _ref7$payload$page, page, _ref7$payload$pagesiz, pagesize, _ref7$payload$filter, filter, params, call, put, f, _ref9, records, total;

        return _regenerator.default.wrap(function fetch$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref7$payload = _ref7.payload, _ref7$payload$page = _ref7$payload.page, page = _ref7$payload$page === void 0 ? 1 : _ref7$payload$page, _ref7$payload$pagesiz = _ref7$payload.pagesize, pagesize = _ref7$payload$pagesiz === void 0 ? 10 : _ref7$payload$pagesiz, _ref7$payload$filter = _ref7$payload.filter, filter = _ref7$payload$filter === void 0 ? {} : _ref7$payload$filter, params = _ref7$payload.params;
                call = _ref8.call, put = _ref8.put;
                f = filter;

                if ((0, _isFunction2.default)(defaultFilter)) {
                  f = (0, _objectSpread2.default)({}, f, defaultFilter(params));
                } else if (defaultFilter) {
                  f = (0, _objectSpread2.default)({}, f, defaultFilter);
                }

                _context5.next = 6;
                return call(service.fetch, {
                  page: page,
                  pagesize: pagesize,
                  filter: JSON.stringify(f),
                  order: defaultOrder
                });

              case 6:
                _ref9 = _context5.sent;
                records = _ref9.items;
                total = _ref9.total;
                _context5.next = 11;
                return put({
                  type: 'save',
                  payload: {
                    page: page,
                    pagesize: pagesize,
                    total: total,
                    records: records
                  }
                });

              case 11:
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
      order = _ref17$action.order;

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
    return {
      records: state[namespace].get('records'),
      total: state[namespace].get('total')
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    var props = {
      fetch: function () {
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_ref18) {
          var page, pagesize, params;
          return _regenerator.default.wrap(function _callee5$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  page = _ref18.page, pagesize = _ref18.pagesize, params = _ref18.params;
                  return _context9.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      page: page,
                      pagesize: pagesize,
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
      }()
    };

    if (create) {
      props.create = function () {
        var _ref19 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(body) {
          return _regenerator.default.wrap(function _callee6$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt("return", dispatch({
                    type: "".concat(namespace, "/create"),
                    payload: {
                      body: body
                    }
                  }));

                case 1:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee6, this);
        }));

        return function (_x6) {
          return _ref19.apply(this, arguments);
        };
      }();
    }

    if (edit) {
      props.edit = function () {
        var _ref20 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(body) {
          return _regenerator.default.wrap(function _callee7$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt("return", dispatch({
                    type: "".concat(namespace, "/edit"),
                    payload: {
                      body: body
                    }
                  }));

                case 1:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee7, this);
        }));

        return function (_x7) {
          return _ref20.apply(this, arguments);
        };
      }();
    }

    if (remove) {
      props.remove = function () {
        var _ref21 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(id) {
          return _regenerator.default.wrap(function _callee8$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt("return", dispatch({
                    type: "".concat(namespace, "/remove"),
                    payload: {
                      id: id
                    }
                  }));

                case 1:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee8, this);
        }));

        return function (_x8) {
          return _ref21.apply(this, arguments);
        };
      }();
    }

    if (order) {
      props.order = props.edit;
    }

    return props;
  };

  return (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent(_ref22) {
  var app = _ref22.app,
      config = _ref22.config;
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

function dynamicRecordsComponent(_ref23) {
  var app = _ref23.app,
      config = _ref23.config;

  if (!app) {
    throw new Error('dynamicRecords: app is required');
  }

  if (!config) {
    throw new Error('dynamicRecords: config is required');
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