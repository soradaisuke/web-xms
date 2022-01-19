"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

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

var _usePageFilterForm = _interopRequireDefault(require("../../hooks/usePageFilterForm"));

var _resetChildColumn = require("../../utils/resetChildColumn");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AUTO_TRIGGERS = {
  ON_CHANGE: 'on_change',
  ON_PRESS_ENTER: 'on_press_enter',
  NONE: 'none'
};

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
  var form = (0, _usePageFilterForm.default)();
  var autoTrigger = (0, _react.useMemo)(function () {
    if (column.canFilterOutside()) {
      if (column.canFilterExpandable()) {
        if (column.canFilterMultiple()) {
          return AUTO_TRIGGERS.ON_CHANGE;
        }

        return AUTO_TRIGGERS.ON_CHANGE;
      }

      if (column.getFilters(null, _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER) || column.getValueOptionsSearchRequest() && column.getUseValueOptionsSearchRequest() !== _Column.default.SEARCH_REQUEST_TYPES.FORM || column.getValueOptionsRequest()) {
        return AUTO_TRIGGERS.ON_CHANGE;
      }

      if (column instanceof _DateTimeColumn.default) {
        return AUTO_TRIGGERS.ON_CHANGE;
      }

      if (column instanceof _DurationColumn.default) {
        return AUTO_TRIGGERS.ON_CHANGE;
      }

      if (column instanceof _NumberColumn.default) {
        return AUTO_TRIGGERS.ON_PRESS_ENTER;
      }

      if (column instanceof _StringColumn.default) {
        return AUTO_TRIGGERS.ON_PRESS_ENTER;
      }
    }

    return AUTO_TRIGGERS.NONE;
  }, [column]);
  var formItemComponentProps = (0, _react.useMemo)(function () {
    var props = {
      placeholder: column.getFilterFormPlaceholder(),
      onChange: function onChange() {
        (0, _resetChildColumn.resetChildColumn)({
          column: column,
          form: form
        });

        if (autoTrigger === AUTO_TRIGGERS.ON_CHANGE && column.canFilterAuto() && form) {
          form.submit();
        }
      }
    };

    if (autoTrigger === AUTO_TRIGGERS.ON_PRESS_ENTER && column.canFilterAuto()) {
      props.onPressEnter = function () {
        return form === null || form === void 0 ? void 0 : form.submit();
      };
    }

    return props;
  }, [column, form, autoTrigger]);
  var children = (0, _react.useMemo)(function () {
    var inner;

    if (column.canFilterOutside()) {
      if (column.getFilterRender()) {
        inner = column.getFilterRender();
      } else if (column.canFilterExpandable()) {
        if (column.canFilterMultiple()) {
          inner = _react.default.createElement(_CheckBox.default, (0, _extends2.default)({
            column: column
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_Radio.default, (0, _extends2.default)({
            column: column
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        }
      } else if (column.getFilters(null, _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER) || column.getValueOptionsSearchRequest() && column.getUseValueOptionsSearchRequest() !== _Column.default.SEARCH_REQUEST_TYPES.FORM || column.getValueOptionsRequest()) {
        inner = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({
          style: {
            minWidth: '120px'
          },
          column: column
        }, formItemComponentProps, column.getFilterFormItemComponentProps()));
      } else if (column instanceof _DateTimeColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_RangePicker.default, (0, _extends2.default)({
            presets: column.getFilterPresets(),
            format: column.getFormat()
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_DatePicker.default, (0, _extends2.default)({
            presets: column.getFilterPresets(),
            format: column.getFormat()
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        }
      } else if (column instanceof _DurationColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_DurationRangePicker.default, (0, _extends2.default)({
            format: column.getFormat()
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_DurationPicker.default, (0, _extends2.default)({
            format: column.getFormat()
          }, formItemComponentProps, column.getFilterFormItemComponentProps()));
        }
      } else if (column instanceof _NumberColumn.default) {
        if (column.canFilterRange()) {
          inner = _react.default.createElement(_InputRangeNumber.default, (0, _extends2.default)({}, formItemComponentProps, column.getFilterFormItemComponentProps()));
        } else {
          inner = _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, formItemComponentProps, column.getFilterFormItemComponentProps()));
        }
      } else if (column instanceof _StringColumn.default) {
        inner = _react.default.createElement(_input.default, (0, _extends2.default)({
          allowClear: true
        }, formItemComponentProps, column.getFilterFormItemComponentProps()));
      }
    }

    if (formItemProps.shouldUpdate) {
      return function (_ref2) {
        var _column$parentColumn;

        var getFieldValue = _ref2.getFieldValue;
        var parentValue = getFieldValue((_column$parentColumn = column.parentColumn) === null || _column$parentColumn === void 0 ? void 0 : _column$parentColumn.getFilterKey());
        return _react.default.createElement(_form.default.Item, (0, _extends2.default)({
          key: JSON.stringify(parentValue)
        }, commonFormItemProps), inner);
      };
    }

    return inner;
  }, [column, commonFormItemProps, formItemProps.shouldUpdate, formItemComponentProps]);
  return _react.default.createElement(_form.default.Item, formItemProps, children);
}

FormItem.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired
};

var _default = _react.default.memo(FormItem);

exports.default = _default;