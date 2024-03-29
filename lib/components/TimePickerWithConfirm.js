"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var TimePickerWithConfirm = function (_React$Component) {
  (0, _inherits2.default)(TimePickerWithConfirm, _React$Component);

  function TimePickerWithConfirm() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TimePickerWithConfirm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TimePickerWithConfirm)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      open: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleOpenChange", function (open) {
      _this.setState({
        open: open
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClose", function () {
      return _this.setState({
        open: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(TimePickerWithConfirm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var open = this.state.open;
      return _react.default.createElement(_timePicker.default, (0, _extends2.default)({}, this.props, {
        open: open,
        onOpenChange: this.handleOpenChange,
        addon: function addon() {
          return _react.default.createElement(_button.default, {
            size: "small",
            type: "primary",
            onClick: _this2.handleClose
          }, "\u786E\u5B9A");
        }
      }));
    }
  }]);
  return TimePickerWithConfirm;
}(_react.default.Component);

exports.default = TimePickerWithConfirm;