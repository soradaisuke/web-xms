"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DurationPicker = _interopRequireDefault(require("./DurationPicker"));

function DurationRangePicker(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange"]);
  var onLeftChange = (0, _useEventCallback2.default)(function (newValue) {
    onChange((0, _set2.default)((0, _toConsumableArray2.default)(value || []), '[0]', newValue));
  });
  var onRightChange = (0, _useEventCallback2.default)(function (newValue) {
    onChange((0, _set2.default)((0, _toConsumableArray2.default)(value || []), '[1]', newValue));
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_DurationPicker.default, (0, _extends2.default)({}, props, {
    value: (0, _get2.default)(value, '[0]'),
    onChange: onLeftChange
  })), ' ~ ', _react.default.createElement(_DurationPicker.default, (0, _extends2.default)({}, props, {
    value: (0, _get2.default)(value, '[1]'),
    onChange: onRightChange
  })));
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