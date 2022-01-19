"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _showError = _interopRequireDefault(require("../utils/showError"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ActivatorModal = function (_React$PureComponent) {
  (0, _inherits2.default)(ActivatorModal, _React$PureComponent);

  var _super = _createSuper(ActivatorModal);

  function ActivatorModal() {
    var _this;

    (0, _classCallCheck2.default)(this, ActivatorModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      visible: false,
      confirmLoading: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showModalHandler", function (e) {
      if (e) {
        e.stopPropagation();
      }

      _this.setState({
        visible: true
      });

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(true);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hideModalHandler", function () {
      _this.setState({
        visible: false,
        confirmLoading: false
      });

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(false);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var confirmLoading, onOk, hide;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              confirmLoading = _this.state.confirmLoading;
              onOk = _this.props.onOk;

              if (!confirmLoading) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              if (!onOk) {
                _context.next = 21;
                break;
              }

              _this.setState({
                confirmLoading: true
              });

              _context.prev = 6;
              _context.next = 9;
              return onOk();

            case 9:
              hide = _context.sent;

              if (!(0, _isBoolean2.default)(hide) || hide) {
                _this.hideModalHandler();
              }

              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);
              (0, _showError.default)(_context.t0.message);

            case 16:
              _context.prev = 16;

              _this.setState({
                confirmLoading: false
              });

              return _context.finish(16);

            case 19:
              _context.next = 22;
              break;

            case 21:
              _this.hideModalHandler();

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 13, 16, 19]]);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCancel", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var onCancel, hide;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onCancel = _this.props.onCancel;

              if (!onCancel) {
                _context2.next = 8;
                break;
              }

              _context2.next = 4;
              return onCancel();

            case 4:
              hide = _context2.sent;

              if (!(0, _isBoolean2.default)(hide) || hide) {
                _this.hideModalHandler();
              }

              _context2.next = 9;
              break;

            case 8:
              _this.hideModalHandler();

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    return _this;
  }

  (0, _createClass2.default)(ActivatorModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activator = _this$props.activator,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["activator", "children"]);
      var _this$state = this.state,
          visible = _this$state.visible,
          confirmLoading = _this$state.confirmLoading;
      return _react.default.createElement("span", null, _react.default.createElement("span", {
        role: "button",
        tabIndex: 0,
        onClick: this.showModalHandler,
        onKeyPress: this.showModalHandler
      }, activator), _react.default.createElement(_modal.default, (0, _extends2.default)({}, props, {
        confirmLoading: confirmLoading,
        visible: visible,
        onOk: this.onOk,
        onCancel: this.onCancel
      }), (0, _isFunction2.default)(children) ? children() : children));
    }
  }]);
  return ActivatorModal;
}(_react.default.PureComponent);

exports.default = ActivatorModal;
(0, _defineProperty2.default)(ActivatorModal, "displayName", 'ActivatorModal');
(0, _defineProperty2.default)(ActivatorModal, "propTypes", {
  activator: _propTypes.default.node.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  onCancel: _propTypes.default.func,
  onOk: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func
});
(0, _defineProperty2.default)(ActivatorModal, "defaultProps", {
  onCancel: null,
  onOk: null,
  onVisibleChange: null
});