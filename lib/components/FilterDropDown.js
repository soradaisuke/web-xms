"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/tag/style");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _icons = require("@ant-design/icons");

var _TimePickerWithConfirm = _interopRequireDefault(require("../components/TimePickerWithConfirm"));

var _NumberColumn = _interopRequireDefault(require("../schema/NumberColumn"));

var _StringColumn = _interopRequireDefault(require("../schema/StringColumn"));

var _MonthColumn = _interopRequireDefault(require("../schema/MonthColumn"));

var _BaseDateTimeColumn = _interopRequireDefault(require("../schema/BaseDateTimeColumn"));

var RangePicker = _datePicker.default.RangePicker,
    MonthPicker = _datePicker.default.MonthPicker;

function FilterDropDown(_ref) {
  var column = _ref.column,
      setSelectedKeys = _ref.setSelectedKeys,
      selectedKeys = _ref.selectedKeys,
      confirm = _ref.confirm,
      clearFilters = _ref.clearFilters,
      isAutoTrigger = _ref.isAutoTrigger;
  var children = (0, _react.useMemo)(function () {
    if (column instanceof _NumberColumn.default) {
      if (column.canFilterRangeInTable()) {
        return _react.default.createElement("div", {
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
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
        })), ' ~ ', _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
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

      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
        value: selectedKeys[0],
        onChange: function onChange(value) {
          return setSelectedKeys([value]);
        },
        onPressEnter: confirm,
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }));
    }

    if (column instanceof _StringColumn.default) {
      return _react.default.createElement(_input.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
        value: selectedKeys[0],
        onChange: function onChange(e) {
          return setSelectedKeys(e.target.value ? [e.target.value] : []);
        },
        onPressEnter: confirm,
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }));
    }

    if (column instanceof _MonthColumn.default) {
      if (column.canFilterRangeInTable()) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(RangePicker, (0, _extends2.default)({
          mode: ['month', 'month'],
          format: column.getInTableFormat()
        }, column.getTableFilterComponentProps(), {
          allowClear: false,
          value: [!(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][0]')) : null, !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][1]')) : null],
          onPanelChange: function onPanelChange(newDate) {
            return setSelectedKeys([[column.formatFilterValue(newDate[0]), column.formatFilterValue(newDate[1])]]);
          },
          style: {
            marginBottom: 8,
            display: 'block'
          }
        })), _react.default.createElement("div", null, column.getTableFilterPresets().map(function (preset) {
          return _react.default.createElement(_tag.default, {
            style: {
              marginBottom: 8
            },
            color: "blue",
            key: preset.get('text'),
            onClick: function onClick() {
              setSelectedKeys([preset.get('value')]);
              confirm();
            }
          }, preset.get('text'));
        })));
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(MonthPicker, (0, _extends2.default)({
        format: column.getInTableFormat()
      }, column.getTableFilterComponentProps(), {
        allowClear: false,
        value: selectedKeys.length > 0 ? (0, _moment.default)(selectedKeys[0]) : null,
        onChange: function onChange(v) {
          return setSelectedKeys([column.formatFilterValue(v)]);
        },
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      })), _react.default.createElement("div", null, column.getTableFilterPresets().map(function (preset) {
        return _react.default.createElement(_tag.default, {
          style: {
            marginBottom: 8
          },
          color: "blue",
          key: preset.get('text'),
          onClick: function onClick() {
            setSelectedKeys([preset.get('value')]);
            confirm();
          }
        }, preset.get('text'));
      })));
    }

    if (column instanceof TimeColumn) {
      if (column.canFilterRangeInTable()) {
        return _react.default.createElement("div", {
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
          format: column.getInTableFormat(),
          value: !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)().startOf('day').add((0, _get2.default)(selectedKeys, '[0][0]'), 's') : null,
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[0]', value.diff((0, _moment.default)().startOf('day')) / 1000)]);
          }
        })), ' ~ ', _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
          format: column.getInTableFormat(),
          value: !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)().startOf('day').add((0, _get2.default)(selectedKeys, '[0][1]'), 's') : null,
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[1]', value.diff((0, _moment.default)().startOf('day')) / 1000)]);
          }
        })));
      }

      return _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, column.getTableFilterComponentProps(), {
        format: column.getInTableFormat(),
        value: selectedKeys.length > 0 ? (0, _moment.default)().startOf('day').add(selectedKeys[0], 's') : null,
        onChange: function onChange(time) {
          return setSelectedKeys([time.diff((0, _moment.default)().startOf('day')) / 1000]);
        },
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }));
    }

    if (column instanceof _BaseDateTimeColumn.default) {
      if (column.canFilterRangeInTable()) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(RangePicker, (0, _extends2.default)({
          showTime: column.showTime(),
          format: column.getInTableFormat()
        }, column.getTableFilterComponentProps(), {
          allowClear: false,
          value: [!(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][0]')) : null, !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][1]')) : null],
          onChange: function onChange(newDate) {
            return setSelectedKeys([[column.formatFilterValue(newDate[0]), column.formatFilterValue(newDate[1])]]);
          },
          style: {
            marginBottom: 8,
            display: 'block'
          }
        })), _react.default.createElement("div", null, column.getTableFilterPresets().map(function (preset) {
          return _react.default.createElement(_tag.default, {
            style: {
              marginBottom: 8
            },
            color: "blue",
            key: preset.get('text'),
            onClick: function onClick() {
              setSelectedKeys([preset.get('value')]);
              confirm();
            }
          }, preset.get('text'));
        })));
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_datePicker.default, (0, _extends2.default)({
        showTime: column.showTime(),
        format: column.getInTableFormat()
      }, column.getTableFilterComponentProps(), {
        allowClear: false,
        value: selectedKeys.length > 0 ? (0, _moment.default)(selectedKeys[0]) : null,
        onChange: function onChange(v) {
          return setSelectedKeys([column.formatFilterValue(v)]);
        },
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      })), _react.default.createElement("div", null, column.getTableFilterPresets().map(function (preset) {
        return _react.default.createElement(_tag.default, {
          style: {
            marginBottom: 8
          },
          color: "blue",
          key: preset.get('text'),
          onClick: function onClick() {
            setSelectedKeys([preset.get('value')]);
            confirm();
          }
        }, preset.get('text'));
      })));
    }
  }, [column]);
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
  }, !isAutoTrigger ? '确定' : '搜索'), _react.default.createElement(_button.default, {
    onClick: clearFilters,
    size: "small",
    style: {
      width: 90
    }
  }, "\u91CD\u7F6E")));
}

var _default = _react.default.memo(FilterDropDown);

exports.default = _default;