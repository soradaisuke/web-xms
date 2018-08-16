"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecords;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var apiPath = _ref.apiPath,
      _ref$mutable = _ref.mutable,
      mutable = _ref$mutable === void 0 ? {} : _ref$mutable;

  if (!apiPath) {
    throw new Error('dynamicRecords generateService: apiPath is required');
  }

  var service = {
    fetch: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var _ref2$pageNum, pageNum, _ref2$pageSize, pageSize;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref2$pageNum = _ref2.pageNum, pageNum = _ref2$pageNum === void 0 ? 1 : _ref2$pageNum, _ref2$pageSize = _ref2.pageSize, pageSize = _ref2$pageSize === void 0 ? 20 : _ref2$pageSize;
                return _context.abrupt("return", _request.default.get(apiPath, {
                  params: {
                    pageNum: pageNum,
                    pageSize: pageSize
                  }
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

  if (mutable.create) {
    service.create = function () {
      var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref3) {
        var body;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                body = _ref3.body;
                return _context2.abrupt("return", _request.default.post("".concat(apiPath), {
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
  }

  if (mutable.patch) {
    service.patch = function () {
      var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref5) {
        var id, body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref5.id, body = _ref5.body;
                return _context3.abrupt("return", _request.default.patch("".concat(apiPath, "/").concat(id), {
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
  }

  if (mutable.remove) {
    service.remove = function () {
      var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_ref7) {
        var id;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref7.id;
                return _context4.abrupt("return", _request.default.remove("".concat(apiPath, "/").concat(id)));

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
  }

  return service;
}

function generateModel(_ref9) {
  var service = _ref9.service,
      namespace = _ref9.namespace,
      _ref9$mutable = _ref9.mutable,
      mutable = _ref9$mutable === void 0 ? {} : _ref9$mutable;

  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }

  var model = {
    namespace: namespace,
    state: _immutable.default.fromJS({
      records: [],
      total: null,
      pageNum: null,
      pageSize: null
    }),
    reducers: {
      save: function save(state, _ref10) {
        var _ref10$payload = _ref10.payload,
            records = _ref10$payload.records,
            total = _ref10$payload.total,
            pageNum = _ref10$payload.pageNum,
            pageSize = _ref10$payload.pageSize;
        return state.merge(_immutable.default.fromJS({
          records: records,
          total: total,
          pageNum: pageNum,
          pageSize: pageSize
        }));
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref11, _ref12) {
        var _ref11$payload, _ref11$payload$pageNu, pageNum, _ref11$payload$pageSi, pageSize, call, put, _ref13, rooms, total;

        return _regenerator.default.wrap(function fetch$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref11$payload = _ref11.payload, _ref11$payload$pageNu = _ref11$payload.pageNum, pageNum = _ref11$payload$pageNu === void 0 ? 1 : _ref11$payload$pageNu, _ref11$payload$pageSi = _ref11$payload.pageSize, pageSize = _ref11$payload$pageSi === void 0 ? 20 : _ref11$payload$pageSi;
                call = _ref12.call, put = _ref12.put;
                _context5.next = 4;
                return call(service.fetch, {
                  pageNum: pageNum,
                  pageSize: pageSize
                });

              case 4:
                _ref13 = _context5.sent;
                rooms = _ref13.rooms;
                total = _ref13.total;
                _context5.next = 9;
                return put({
                  type: 'save',
                  payload: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    total: total,
                    records: rooms
                  }
                });

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, fetch, this);
      })
    }
  };

  if (mutable.create) {
    model.create = _regenerator.default.mark(function create(_ref14, _ref15) {
      var body, call;
      return _regenerator.default.wrap(function create$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              body = _ref14.payload.body;
              call = _ref15.call;
              _context6.next = 4;
              return call(service.create, {
                body: body
              });

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, create, this);
    });
  }

  if (mutable.patch) {
    model.patch = _regenerator.default.mark(function patch(_ref16, _ref17) {
      var _ref16$payload, id, body, call;

      return _regenerator.default.wrap(function patch$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ref16$payload = _ref16.payload, id = _ref16$payload.id, body = _ref16$payload.body;
              call = _ref17.call;
              _context7.next = 4;
              return call(service.patch, {
                id: id,
                body: body
              });

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, patch, this);
    });
  }

  if (mutable.remove) {
    model.remove = _regenerator.default.mark(function remove(_ref18, _ref19) {
      var id, call;
      return _regenerator.default.wrap(function remove$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = _ref18.payload.id;
              call = _ref19.call;
              _context8.next = 4;
              return call(service.remove, {
                id: id
              });

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, remove, this);
    });
  }

  return model;
}

function generateModal(_ref20) {
  var namespace = _ref20.namespace,
      schema = _ref20.schema,
      _ref20$mutable = _ref20.mutable,
      mutable = _ref20$mutable === void 0 ? {} : _ref20$mutable;

  if (!mutable.create || !mutable.patch) {
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

function generateRecordsPage(_ref21) {
  var namespace = _ref21.namespace,
      schema = _ref21.schema,
      _ref21$mutable = _ref21.mutable,
      mutable = _ref21$mutable === void 0 ? {} : _ref21$mutable,
      Modal = _ref21.Modal;

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
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_ref22) {
          var pageNum, pageSize;
          return _regenerator.default.wrap(function _callee5$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  pageNum = _ref22.pageNum, pageSize = _ref22.pageSize;
                  return _context9.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      pageNum: pageNum,
                      pageSize: pageSize
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

    if (mutable.create) {
      props.create = function () {
        var _ref24 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref23) {
          var body;
          return _regenerator.default.wrap(function _callee6$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  body = _ref23.body;
                  return _context10.abrupt("return", dispatch({
                    type: "".concat(namespace, "/create"),
                    payload: {
                      body: body
                    }
                  }));

                case 2:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee6, this);
        }));

        return function (_x6) {
          return _ref24.apply(this, arguments);
        };
      }();
    }

    if (mutable.patch) {
      props.patch = function () {
        var _ref26 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref25) {
          var id, body;
          return _regenerator.default.wrap(function _callee7$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  id = _ref25.id, body = _ref25.body;
                  return _context11.abrupt("return", dispatch({
                    type: "".concat(namespace, "/patch"),
                    payload: {
                      id: id,
                      body: body
                    }
                  }));

                case 2:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee7, this);
        }));

        return function (_x7) {
          return _ref26.apply(this, arguments);
        };
      }();
    }

    if (mutable.remove) {
      props.remove = function () {
        var _ref28 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(_ref27) {
          var id;
          return _regenerator.default.wrap(function _callee8$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  id = _ref27.id;
                  return _context12.abrupt("return", dispatch({
                    type: "".concat(namespace, "/remove"),
                    payload: {
                      id: id
                    }
                  }));

                case 2:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee8, this);
        }));

        return function (_x8) {
          return _ref28.apply(this, arguments);
        };
      }();
    }

    return props;
  };

  return (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page);
}

function dynamicRecords(_ref29) {
  var app = _ref29.app,
      resolveConfig = _ref29.config;

  if (!app) {
    throw new Error('dynamicRecords: app is required');
  }

  if (!resolveConfig) {
    throw new Error('dynamicRecords: resolveConfig is required');
  }

  return (0, _dynamic.default)({
    app: app,
    resolve: function resolve() {
      return resolveConfig().then(function (c) {
        var config = c.default || c;
        var service = generateService(config);
        var model = generateModel((0, _objectSpread2.default)({}, config, {
          service: service
        }));
        var Modal = generateModal(config);
        return (0, _dynamic.default)({
          app: app,
          models: function models() {
            return [Promise.resolve(model)];
          },
          component: function component() {
            return Promise.resolve(generateRecordsPage((0, _objectSpread2.default)({}, config, {
              Modal: Modal
            })));
          }
        });
      });
    }
  });
}