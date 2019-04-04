"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ActivatorModal = function (_React$PureComponent) {
  (0, _inherits2.default)(ActivatorModal, _React$PureComponent);

  function ActivatorModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ActivatorModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ActivatorModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      visible: false
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
        visible: false
      });

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(false);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var onOk, hide;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onOk = _this.props.onOk;

              if (!onOk) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return onOk();

            case 4:
              hide = _context.sent;

              if (!(0, _isBoolean2.default)(hide) || hide) {
                _this.hideModalHandler();
              }

              _context.next = 9;
              break;

            case 8:
              _this.hideModalHandler();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
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
      var activator = this.props.activator;
      var visible = this.state.visible;
      return _react.default.createElement("span", null, _react.default.createElement("span", {
        role: "button",
        tabIndex: 0,
        onClick: this.showModalHandler,
        onKeyPress: this.showModalHandler
      }, activator), _react.default.createElement(_modal.default, (0, _extends2.default)({}, this.props, {
        visible: visible,
        onOk: this.onOk,
        onCancel: this.onCancel
      })));
    }
  }]);
  return ActivatorModal;
}(_react.default.PureComponent);

exports.default = ActivatorModal;
(0, _defineProperty2.default)(ActivatorModal, "displayName", 'ActivatorModal');
(0, _defineProperty2.default)(ActivatorModal, "propTypes", {
  activator: _propTypes.default.node.isRequired,
  onCancel: _propTypes.default.func,
  onOk: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func
});
(0, _defineProperty2.default)(ActivatorModal, "defaultProps", {
  onCancel: null,
  onOk: null,
  onVisibleChange: null
});