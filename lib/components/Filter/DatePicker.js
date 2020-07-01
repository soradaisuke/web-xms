"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _immutable = _interopRequireDefault(require("immutable"));

function FilterDatePicker(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      presets = _ref.presets,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange", "presets"]);
  var onChangeDate = (0, _useEventCallback2.default)(function (_, string) {
    onChange(string);
  });
  var renderExtraFooter = (0, _react.useCallback)(function () {
    return presets === null || presets === void 0 ? void 0 : presets.map(function (preset) {
      return _react.default.createElement(_tag.default, {
        color: "blue",
        key: preset.get('value'),
        onClick: function onClick() {
          onChangeDate(null, preset.get('value'));
        }
      }, preset.get('text'));
    });
  }, [presets, onChangeDate]);
  return _react.default.createElement(_datePicker.default, (0, _extends2.default)({}, props, {
    value: !(0, _isUndefined2.default)(value) ? (0, _moment.default)(value) : null,
    onChange: onChangeDate,
    renderExtraFooter: renderExtraFooter
  }));
}

FilterDatePicker.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.string,
  presets: _propTypes.default.instanceOf(_immutable.default.List)
};
FilterDatePicker.defaultProps = {
  value: undefined,
  presets: null
};

var _default = _react.default.memo(FilterDatePicker);

exports.default = _default;