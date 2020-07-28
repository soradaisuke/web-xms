"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

function DurationPicker(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange"]);
  var onChangeTime = (0, _useEventCallback2.default)(function (newValue) {
    onChange(newValue.diff((0, _moment.default)().startOf('day'), 's'));
  });
  return _react.default.createElement(_timePicker.default, (0, _extends2.default)({
    allowClear: true
  }, props, {
    value: !(0, _isUndefined2.default)(value) ? (0, _moment.default)().startOf('day').add(value, 's') : null,
    onChange: onChangeTime
  }));
}

DurationPicker.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.number
};
DurationPicker.defaultProps = {
  value: undefined
};

var _default = _react.default.memo(DurationPicker);

exports.default = _default;