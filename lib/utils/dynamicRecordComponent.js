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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _immutable = _interopRequireDefault(require("immutable"));

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _dva = require("dva");

var _request = _interopRequireDefault(require("../services/request"));

var _RecordPage = _interopRequireDefault(require("../pages/RecordPage"));

function generateService(_ref) {
  var path = _ref.api.path;

  if (!path) {
    throw new Error('dynamicRecordComponent generateService: path is required');
  }

  return {
    fetch: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
        var id;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref2.id;
                return _context.abrupt("return", _request.default.get("".concat(path, "/").concat(id)));

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
}

function generateModel(_ref3, service) {
  var namespace = _ref3.namespace;

  if (!namespace) {
    throw new Error('dynamicRecordComponent generateModel: namespace is required');
  }

  return {
    namespace: namespace,
    state: null,
    reducers: {
      save: function save(state, _ref4) {
        var record = _ref4.payload.record;
        return _immutable.default.fromJS(record);
      }
    },
    effects: {
      fetch: _regenerator.default.mark(function fetch(_ref5, _ref6) {
        var id, call, put, record;
        return _regenerator.default.wrap(function fetch$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref5.payload.id;
                call = _ref6.call, put = _ref6.put;
                _context2.next = 4;
                return call(service.fetch, {
                  id: id
                });

              case 4:
                record = _context2.sent;
                _context2.next = 7;
                return put({
                  type: 'save',
                  payload: {
                    record: record
                  }
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, fetch, this);
      })
    }
  };
}

function generateRecordPage(_ref7, component) {
  var namespace = _ref7.namespace;

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
          component: component
        }));
      }
    }]);
    return Page;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(Page, "displayName", "".concat((0, _upperFirst2.default)(namespace), "Page"));

  var mapStateToProps = function mapStateToProps(state, props) {
    return {
      record: state[namespace],
      recordId: props.match.params.id
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      fetch: function () {
        var _fetch2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref8) {
          var id;
          return _regenerator.default.wrap(function _callee2$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  id = _ref8.id;
                  return _context3.abrupt("return", dispatch({
                    type: "".concat(namespace, "/fetch"),
                    payload: {
                      id: id
                    }
                  }));

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee2, this);
        }));

        return function fetch(_x2) {
          return _fetch2.apply(this, arguments);
        };
      }()
    };
  };

  return (0, _reactRouter.withRouter)((0, _dva.connect)(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordComponent(_ref9) {
  var app = _ref9.app,
      config = _ref9.config,
      _component = _ref9.component;
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

function dynamicRecordComponent(_ref10) {
  var app = _ref10.app,
      config = _ref10.config,
      component = _ref10.component;

  if (!app) {
    throw new Error('dynamicRecordComponent: app is required');
  }

  if (!config) {
    throw new Error('dynamicRecordComponent: config is required');
  }

  if ((0, _isFunction2.default)(config)) {
    return (0, _dynamic.default)({
      app: app,
      resolve: function resolve() {
        return config().then(function (c) {
          return generateDynamicRecordComponent({
            app: app,
            config: c.default || c,
            component: component
          });
        });
      }
    });
  }

  return generateDynamicRecordComponent({
    app: app,
    config: config,
    component: component
  });
}