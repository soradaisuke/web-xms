"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicRecordComponent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _dva = require("dva");

var _request = _interopRequireDefault(require("../services/request"));

var _RecordPage = _interopRequireDefault(require("../pages/RecordPage"));

function generateService(_ref) {
  var _ref$api = _ref.api;
  _ref$api = _ref$api === void 0 ? {} : _ref$api;
  var _fetch = _ref$api.fetch;
  var service = {
    fetch: function () {
      var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var path;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _ref2.path;
                return _context.abrupt("return", _fetch ? _fetch({
                  path: path
                }) : _request.default.get(path));

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
        var path;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _ref3.path;
                return _context2.abrupt("return", _request.default.remove(path));

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
    edit: function () {
      var _edit = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref4) {
        var path, body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = _ref4.path, body = _ref4.body;
                return _context3.abrupt("return", _request.default.put(path, {
                  body: body
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function edit(_x3) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }()
  };
  return service;
}

function generateModel(_ref5, service) {
  var namespace = _ref5.namespace;

  if (!namespace) {
    throw new Error('dynamicRecordComponent generateModel: namespace is required');
  }

  return {
    namespace: namespace,
    state: null,
    reducers: {
      save: function save(state, _ref6) {
        var record = _ref6.payload.record;
        return record;
      }
    },
    effects: {
      fetch: [_regenerator.default.mark(function fetch(_ref7, _ref8) {
        var path, call, put, record;
        return _regenerator.default.wrap(function fetch$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                path = _ref7.payload.path;
                call = _ref8.call, put = _ref8.put;
                _context4.next = 4;
                return call(service.fetch, {
                  path: path
                });

              case 4:
                record = _context4.sent;
                _context4.next = 7;
                return put({
                  type: 'save',
                  payload: {
                    record: record
                  }
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, fetch);
      }), {
        type: 'takeLatest'
      }],
      remove: _regenerator.default.mark(function modelRemove(_ref9, _ref10) {
        var path, call;
        return _regenerator.default.wrap(function modelRemove$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                path = _ref9.payload.path;
                call = _ref10.call;
                _context5.next = 4;
                return call(service.remove, {
                  path: path
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, modelRemove);
      }),
      edit: _regenerator.default.mark(function modelEdit(_ref11, _ref12) {
        var _ref11$payload, path, body, call;

        return _regenerator.default.wrap(function modelEdit$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref11$payload = _ref11.payload, path = _ref11$payload.path, body = _ref11$payload.body;
                call = _ref12.call;
                _context6.next = 4;
                return call(service.edit, {
                  path: path,
                  body: body
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, modelEdit);
      })
    }
  };
}

function generateRecordPage(_ref13, component) {
  var namespace = _ref13.namespace,
      _ref13$api = _ref13.api;
  _ref13$api = _ref13$api === void 0 ? {} : _ref13$api;
  var path = _ref13$api.path,
      host = _ref13$api.host,
      actions = _ref13.actions,
      table = _ref13.table,
      bordered = _ref13.bordered,
      layout = _ref13.layout;

  var Page = function (_React$PureComponent) {
    (0, _inherits2.default)(Page, _React$PureComponent);

    function Page() {
      (0, _classCallCheck2.default)(this, Page);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).apply(this, arguments));
    }

    (0, _createClass2.default)(Page, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_RecordPage.default, (0, _extends2.default)({}, this.props, {
          layout: layout,
          component: component,
          table: table,
          actions: actions,
          bordered: bordered
        }));
      }
    }]);
    return Page;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(Page, "displayName", "".concat((0, _upperFirst2.default)(namespace), "Page"));

  var mapStateToProps = function mapStateToProps(state) {
    return {
      record: state[namespace]
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var matchParams = ownProps.match.params;
    var apiPath = '';

    if ((0, _isFunction2.default)(path)) {
      apiPath = path(matchParams);
    } else if ((0, _isString2.default)(path)) {
      apiPath = path;
    }

    if (host) {
      apiPath = "".concat(host).concat(apiPath);
    }

    if (apiPath) {
      return {
        fetch: function () {
          var _fetch3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4() {
            return _regenerator.default.wrap(function _callee4$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    return _context7.abrupt("return", dispatch({
                      type: "".concat(namespace, "/fetch"),
                      payload: {
                        path: apiPath
                      }
                    }));

                  case 1:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee4);
          }));

          function fetch() {
            return _fetch3.apply(this, arguments);
          }

          return fetch;
        }(),
        remove: function () {
          var _remove2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
            return _regenerator.default.wrap(function _callee5$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    return _context8.abrupt("return", dispatch({
                      type: "".concat(namespace, "/remove"),
                      payload: {
                        path: apiPath
                      }
                    }));

                  case 1:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee5);
          }));

          function remove() {
            return _remove2.apply(this, arguments);
          }

          return remove;
        }(),
        edit: function () {
          var _edit2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_ref14) {
            var body;
            return _regenerator.default.wrap(function _callee6$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    body = _ref14.body;
                    return _context9.abrupt("return", dispatch({
                      type: "".concat(namespace, "/edit"),
                      payload: {
                        path: apiPath,
                        body: body
                      }
                    }));

                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee6);
          }));

          function edit(_x4) {
            return _edit2.apply(this, arguments);
          }

          return edit;
        }()
      };
    }

    return {};
  };

  return (0, _reactRouterDom.withRouter)((0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordComponent(_ref15) {
  var app = _ref15.app,
      config = _ref15.config,
      _component = _ref15.component;
  var service = generateService(config);
  var model = generateModel(config, service);
  return (0, _dynamic.default)({
    app: app,
    models: function models() {
      return [Promise.resolve(model)];
    },
    component: function component() {
      return Promise.resolve(generateRecordPage(config, _component));
    }
  });
}

function dynamicRecordComponent(_ref16) {
  var app = _ref16.app,
      config = _ref16.config,
      component = _ref16.component;

  if (!app) {
    throw new Error('dynamicRecordComponent: app is required');
  }

  if (!config) {
    throw new Error('dynamicRecordComponent: config is required');
  }

  return generateDynamicRecordComponent({
    app: app,
    config: config,
    component: component
  });
}