"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _CheckBox = _interopRequireDefault(require("./CheckBox"));

var _InputRangeNumber = _interopRequireDefault(require("./InputRangeNumber"));

var _DurationPicker = _interopRequireDefault(require("./DurationPicker"));

var _DurationRangePicker = _interopRequireDefault(require("./DurationRangePicker"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _RangePicker = _interopRequireDefault(require("./RangePicker"));

var _TreeSelect = _interopRequireDefault(require("./TreeSelect"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _NumberColumn = _interopRequireDefault(require("../../schema/NumberColumn"));

var _StringColumn = _interopRequireDefault(require("../../schema/StringColumn"));

var _DurationColumn = _interopRequireDefault(require("../../schema/DurationColumn"));

var _DateTimeColumn = _interopRequireDefault(require("../../schema/DateTimeColumn"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function FormItem(_ref) {
  var column = _ref.column;
  var commonFormItemProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, column.getFilterFormItemProps()), {}, {
      label: column.getTitle(),
      name: column.getFilterKey(),
      initialValue: column.getFilterRequired() ? column.getFilterDefault() : undefined
    });
  }, [column]);
  var formItemProps = (0, _react.useMemo)(function () {
    if (!column.canFilterOutside()) {
      return _objectSpread({
        noStyle: true
      }, commonFormItemProps);
    }

    if (column.parentColumn) {
      return {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, curValues) {
          return (0, _get2.default)(prevValues, column.parentColumn.getFilterKey()) !== (0, _get2.default)(curValues, column.parentColumn.getFilterKey());
        }
      };
    }

    return commonFormItemProps;
  }, [column, commonFormItemProps]);
  var children = (0, _react.useMemo)(function () {
    var inner;

    if (column.canFilterOutside()) {
      if (column.canFilterExpandable()) {
        if (column.canFilterMultiple()) {
          inner = _react.default.createElement(_CheckBox.default, (0, _extends2.default)({
            column: column
          }, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_Radio.default, (0, _extends2.default)({
            column: column
          }, column.getFilterFormItemComponentProps()));
        }
      } else if (column.getFilters(null, 'disableInFilter') || column.getValueOptionsSearchRequest() || column.getValueOptionsRequest()) {
        inner = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({
          style: {
            width: '100px'
          },
          column: column
        }, column.getFilterFormItemComponentProps()));
      } else if (column instanceof _DateTimeColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_RangePicker.default, (0, _extends2.default)({
            presets: column.getFilterPresets(),
            format: column.getFormat()
          }, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_DatePicker.default, (0, _extends2.default)({
            presets: column.getFilterPresets(),
            format: column.getFormat()
          }, column.getFilterFormItemComponentProps()));
        }
      } else if (column instanceof _DurationColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_DurationRangePicker.default, (0, _extends2.default)({
            format: column.getFormat()
          }, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_DurationPicker.default, (0, _extends2.default)({
            format: column.getFormat()
          }, column.getFilterFormItemComponentProps()));
        }
      } else if (column instanceof _NumberColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_InputRangeNumber.default, column.getFilterFormItemComponentProps());
        } else {
          inner = _react.default.createElement(_inputNumber.default, column.getFilterFormItemComponentProps());
        }
      } else if (column instanceof _StringColumn.default) {
        inner = _react.default.createElement(_input.default, column.getFilterFormItemComponentProps());
      }
    }

    if (formItemProps.shouldUpdate) {
      return function () {
        return _react.default.createElement(_form.default.Item, commonFormItemProps, inner);
      };
    }

    return inner;
  }, [column, commonFormItemProps, formItemProps.shouldUpdate]);
  return _react.default.createElement(_form.default.Item, formItemProps, children);
}

FormItem.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired
};

var _default = _react.default.memo(FormItem);

exports.default = _default;