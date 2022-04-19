"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/tag/style");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _immutable = _interopRequireDefault(require("immutable"));

var RangePicker = _datePicker.default.RangePicker;

function FilterRangePicker(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      presets = _ref.presets,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange", "presets"]);
  var onChangeDate = (0, _useEventCallback2.default)(function (dates) {
    var _dates$0$toISOString, _dates$, _dates$$toISOString, _dates$1$toISOString, _dates$2, _dates$2$toISOString;

    onChange(dates ? [(_dates$0$toISOString = (_dates$ = dates[0]) === null || _dates$ === void 0 ? void 0 : (_dates$$toISOString = _dates$.toISOString) === null || _dates$$toISOString === void 0 ? void 0 : _dates$$toISOString.call(_dates$)) !== null && _dates$0$toISOString !== void 0 ? _dates$0$toISOString : dates[0], (_dates$1$toISOString = (_dates$2 = dates[1]) === null || _dates$2 === void 0 ? void 0 : (_dates$2$toISOString = _dates$2.toISOString) === null || _dates$2$toISOString === void 0 ? void 0 : _dates$2$toISOString.call(_dates$2)) !== null && _dates$1$toISOString !== void 0 ? _dates$1$toISOString : dates[1]] : null);
  });
  var renderExtraFooter = (0, _react.useCallback)(function () {
    return presets === null || presets === void 0 ? void 0 : presets.map(function (preset) {
      var _preset$get;

      return _react.default.createElement(_tag.default, {
        color: "blue",
        key: JSON.stringify((_preset$get = preset.get('value')) === null || _preset$get === void 0 ? void 0 : _preset$get.toJS()),
        onClick: function onClick() {
          onChangeDate(preset.get('value').toArray());
        }
      }, preset.get('text'));
    });
  }, [presets, onChangeDate]);
  return _react.default.createElement(RangePicker, (0, _extends2.default)({
    allowClear: true
  }, props, {
    value: value ? [(0, _moment.default)(value[0]), (0, _moment.default)(value[1])] : null,
    onChange: onChangeDate,
    renderExtraFooter: renderExtraFooter
  }));
}

FilterRangePicker.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.arrayOf(_propTypes.default.string),
  presets: _propTypes.default.instanceOf(_immutable.default.List)
};
FilterRangePicker.defaultProps = {
  value: undefined,
  presets: null
};

var _default = _react.default.memo(FilterRangePicker);

exports.default = _default;