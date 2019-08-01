"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/tag/style");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var DatePickerWithPresets = function (_React$PureComponent) {
  (0, _inherits2.default)(DatePickerWithPresets, _React$PureComponent);

  function DatePickerWithPresets() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DatePickerWithPresets);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DatePickerWithPresets)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      open: false,
      date: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "formatValue", function (value, format) {
      return value && value.format(format) || '';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeDate", function (date) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          format = _this$props.format;

      _this.setState({
        date: date,
        open: false
      });

      onChange(date, _this.formatValue(date, format));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOpenChange", function (open) {
      _this.setState({
        open: open
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DatePickerWithPresets, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          onChange = _this$props2.onChange,
          presets = _this$props2.presets,
          format = _this$props2.format,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["onChange", "presets", "format"]);
      var _this$state = this.state,
          open = _this$state.open,
          date = _this$state.date;
      return _react.default.createElement(_datePicker.default, (0, _extends2.default)({
        value: date,
        format: format,
        open: open,
        renderExtraFooter: function renderExtraFooter() {
          return presets.map(function (preset) {
            return _react.default.createElement(_tag.default, {
              color: "blue",
              key: preset.value,
              onClick: function onClick() {
                _this2.onChangeDate((0, _moment.default)(preset.value));
              }
            }, preset.text);
          });
        },
        onChange: this.onChangeDate,
        onOpenChange: this.onOpenChange
      }, props));
    }
  }]);
  return DatePickerWithPresets;
}(_react.default.PureComponent);

exports.default = DatePickerWithPresets;
(0, _defineProperty2.default)(DatePickerWithPresets, "displayName", 'DatePickerWithPresets');
(0, _defineProperty2.default)(DatePickerWithPresets, "propTypes", {
  presets: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.string,
    value: _propTypes.default.string
  })),
  format: _propTypes.default.string
});
(0, _defineProperty2.default)(DatePickerWithPresets, "defaultProps", {
  presets: [],
  format: 'YYYY-MM-DD'
});