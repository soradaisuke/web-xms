"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DurationPicker = require("./DurationPicker");

var RangePicker = _timePicker.default.RangePicker;

function DurationRangePicker(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange"]);
  var onChangeDate = (0, _useEventCallback2.default)(function (moments) {
    onChange((0, _map2.default)(moments, function (m) {
      return (0, _DurationPicker.normalizeValue)(m);
    }));
  });
  console.log(value, value ? [(0, _DurationPicker.formatValue)(value[0]), (0, _DurationPicker.formatValue)(value[1])] : null);
  return _react.default.createElement(RangePicker, (0, _extends2.default)({
    allowClear: true
  }, props, {
    value: value ? [(0, _DurationPicker.formatValue)(value[0]), (0, _DurationPicker.formatValue)(value[1])] : null,
    onChange: onChangeDate
  }));
}

DurationRangePicker.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.arrayOf(_propTypes.default.number)
};
DurationRangePicker.defaultProps = {
  value: undefined
};

var _default = _react.default.memo(DurationRangePicker);

exports.default = _default;