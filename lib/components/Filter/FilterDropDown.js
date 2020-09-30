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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

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

var _resetChildColumn = require("../../utils/resetChildColumn");

require("./FilterDropDown.less");

function FilterDropDown(_ref) {
  var column = _ref.column,
      setSelectedKeys = _ref.setSelectedKeys,
      selectedKeys = _ref.selectedKeys,
      originConfirm = _ref.confirm,
      originClear = _ref.clearFilters;
  var form = (0, _usePageFilterForm.default)();
  var confirm = (0, _useEventCallback2.default)(function () {
    form.setFields([{
      name: column.getFilterKey(),
      value: column.canFilterMultiple() ? selectedKeys : selectedKeys[0]
    }]);
    (0, _resetChildColumn.resetChildColumn)({
      column: column,
      form: form
    });
    originConfirm();
    form.submit();
  });
  var clearFilters = (0, _useEventCallback2.default)(function () {
    form.resetFields([column.getFilterKey()]);
    (0, _resetChildColumn.resetColumn)({
      column: column,
      form: form
    });
    originClear();
    form.submit();
  });
  var children = (0, _react.useMemo)(function () {
    if (column.getFilters(null, 'disabledInFilter') || column.getValueOptionsSearchRequest() || column.getValueOptionsRequest()) {
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

      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
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