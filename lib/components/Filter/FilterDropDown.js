"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = require("@ant-design/icons");

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _RangePicker = _interopRequireDefault(require("./RangePicker"));

var _Tree = _interopRequireDefault(require("./Tree"));

var _InputRangeNumber = _interopRequireDefault(require("./InputRangeNumber"));

var _DurationPicker = _interopRequireDefault(require("./DurationPicker"));

var _DurationRangePicker = _interopRequireDefault(require("./DurationRangePicker"));

var _NumberColumn = _interopRequireDefault(require("../../schema/NumberColumn"));

var _StringColumn = _interopRequireDefault(require("../../schema/StringColumn"));

var _DurationColumn = _interopRequireDefault(require("../../schema/DurationColumn"));

var _DateTimeColumn = _interopRequireDefault(require("../../schema/DateTimeColumn"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _usePageFilterForm = _interopRequireDefault(require("../../hooks/usePageFilterForm"));

require("./FilterDropDown.less");

function resetChildColumn(_ref) {
  var column = _ref.column,
      form = _ref.form;

  if (column.childColumn) {
    (0, _forEach2.default)(column.childColumn, function (childColumn) {
      form.resetFields([childColumn.getFilterKey()]);
      resetColumn({
        column: childColumn,
        form: form
      });
    });
  }
}

function resetColumn(_ref2) {
  var column = _ref2.column,
      form = _ref2.form;

  if (column.getFilterRequired() && column.getFilterDefault()) {
    form.setFieldsValue((0, _defineProperty2.default)({}, column.getFilterKey(), column.getFilterDefault()));
  } else {
    form.resetFields([column.getFilterKey()]);
  }

  resetChildColumn({
    column: column,
    form: form
  });
}

function FilterDropDown(_ref3) {
  var column = _ref3.column,
      setSelectedKeys = _ref3.setSelectedKeys,
      selectedKeys = _ref3.selectedKeys,
      originConfirm = _ref3.confirm,
      originClear = _ref3.clearFilters;
  var form = (0, _usePageFilterForm.default)();
  var confirm = (0, _useEventCallback2.default)(function () {
    form.setFieldsValue((0, _defineProperty2.default)({}, column.getFilterKey(), column.canFilterMultiple() ? selectedKeys : selectedKeys[0]));
    resetChildColumn({
      column: column,
      form: form
    });
    originConfirm();
    form.submit();
  });
  var clearFilters = (0, _useEventCallback2.default)(function () {
    form.resetFields([column.getFilterKey()]);
    resetColumn({
      column: column,
      form: form
    });
    originClear();
    form.submit();
  });
  var children = (0, _react.useMemo)(function () {
    if (column.getFilters(null, 'disableInFilter') || column.getValueOptionsSearchRequest() || column.getValueOptionsRequest()) {
      return _react.default.createElement(_Tree.default, (0, _extends2.default)({}, column.getFilterFormItemComponentProps(), {
        column: column,
        selectedKeys: selectedKeys,
        setSelectedKeys: setSelectedKeys
      }));
    }

    if (column instanceof _DateTimeColumn.default) {
      if (column.canFilterRange()) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_RangePicker.default, (0, _extends2.default)({
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, column.getFilterFormItemComponentProps(), {
          value: selectedKeys.length > 0 ? selectedKeys[0] : undefined,
          onChange: function onChange(newDate) {
            return setSelectedKeys([newDate]);
          },
          presets: column.getFilterPresets()
        })));
      }

      return _react.default.createElement(_DatePicker.default, (0, _extends2.default)({
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }, column.getFilterFormItemComponentProps(), {
        value: selectedKeys.length > 0 ? selectedKeys[0] : undefined,
        onChange: function onChange(v) {
          return setSelectedKeys([v]);
        },
        presets: column.getFilterPresets()
      }));
    }

    if (column instanceof _DurationColumn.default) {
      if (column.canFilterRange()) {
        return _react.default.createElement(_DurationRangePicker.default, (0, _extends2.default)({
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, column.getFilterFormItemComponentProps(), {
          value: selectedKeys.length > 0 ? selectedKeys[0] : null,
          onChange: function onChange(time) {
            return setSelectedKeys([time]);
          }
        }));
      }

      return _react.default.createElement(_DurationPicker.default, (0, _extends2.default)({
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }, column.getFilterFormItemComponentProps(), {
        value: selectedKeys.length > 0 ? selectedKeys[0] : null,
        onChange: function onChange(time) {
          return setSelectedKeys([time]);
        }
      }));
    }

    if (column instanceof _NumberColumn.default) {
      if (column.canFilterRange()) {
        return _react.default.createElement("div", {
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, column.getFilterFormItemComponentProps(), {
          value: (0, _get2.default)(selectedKeys, '[0][0]'),
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[0]', value)]);
          }
        })), ' ~ ', _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, column.getFilterFormItemComponentProps(), {
          value: (0, _get2.default)(selectedKeys, '[0][1]'),
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[1]', value)]);
          }
        })));
      }

      return _react.default.createElement(_InputRangeNumber.default, (0, _extends2.default)({
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }, column.getFilterFormItemComponentProps(), {
        value: selectedKeys.length > 0 ? selectedKeys[0] : null,
        onChange: function onChange(time) {
          return setSelectedKeys([time]);
        }
      }));
    }

    if (column instanceof _StringColumn.default) {
      return _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }, column.getFilterFormItemComponentProps(), {
        value: selectedKeys[0],
        onChange: function onChange(e) {
          return setSelectedKeys(e.target.value ? [e.target.value] : []);
        },
        onPressEnter: confirm
      }));
    }

    return null;
  }, [column, confirm, selectedKeys, setSelectedKeys]);
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, children, _react.default.createElement("div", {
    className: "filter-dropdown-button-wrapper"
  }, _react.default.createElement(_button.default, {
    type: "primary",
    onClick: confirm,
    icon: _react.default.createElement(_icons.SearchOutlined, null),
    size: "small",
    style: {
      width: 90,
      marginRight: 8
    }
  }, "\u7B5B\u9009"), _react.default.createElement(_button.default, {
    onClick: clearFilters,
    size: "small",
    style: {
      width: 90
    }
  }, "\u91CD\u7F6E")));
}

FilterDropDown.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  setSelectedKeys: _propTypes.default.func.isRequired,
  selectedKeys: _propTypes.default.array.isRequired,
  confirm: _propTypes.default.func.isRequired,
  clearFilters: _propTypes.default.func.isRequired
};

var _default = _react.default.memo(FilterDropDown);

exports.default = _default;