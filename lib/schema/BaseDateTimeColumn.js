"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tag/style");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _immutable = _interopRequireDefault(require("immutable"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

var RangePicker = _datePicker.default.RangePicker;

var BaseDateTimeColumn = function (_StringColumn) {
  (0, _inherits2.default)(BaseDateTimeColumn, _StringColumn);

  function BaseDateTimeColumn() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, BaseDateTimeColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(BaseDateTimeColumn)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilterDropDownContent", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys,
          confirm = _ref.confirm;

      if (_this.canFilterRangeInTable()) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(RangePicker, (0, _extends2.default)({
          showTime: _this.showTime(),
          format: _this.getInTableFormat()
        }, _this.getTableFilterComponentProps(), {
          allowClear: false,
          value: [!(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][0]')) : null, !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][1]')) : null],
          onChange: function onChange(newDate) {
            return setSelectedKeys([[_this.formatFilterValue(newDate[0]), _this.formatFilterValue(newDate[1])]]);
          },
          style: {
            marginBottom: 8,
            display: 'block'
          }
        })), _react.default.createElement("div", null, _this.getTableFilterPresets().map(function (preset) {
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
        showTime: _this.showTime(),
        format: _this.getInTableFormat()
      }, _this.getTableFilterComponentProps(), {
        allowClear: false,
        value: selectedKeys.length > 0 ? (0, _moment.default)(selectedKeys[0]) : null,
        onChange: function onChange(v) {
          return setSelectedKeys([_this.formatFilterValue(v)]);
        },
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      })), _react.default.createElement("div", null, _this.getTableFilterPresets().map(function (preset) {
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
    });
    return _this;
  }

  (0, _createClass2.default)(BaseDateTimeColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return '';
    }
  }, {
    key: "getInTableFormat",
    value: function getInTableFormat() {
      return this.config.getIn(['table', 'format'], this.getDefaultInTableFormat());
    }
  }, {
    key: "getTableFilterPresets",
    value: function getTableFilterPresets() {
      return this.config.getIn(['table', 'filterPresets'], _immutable.default.List([]));
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref2) {
      var value = _ref2.value;
      return value && (0, _moment.default)(value).isValid() ? (0, _moment.default)(value).format(this.getInTableFormat()) : '';
    }
  }, {
    key: "renderInDescriptionDefault",
    value: function renderInDescriptionDefault(_ref3) {
      var value = _ref3.value;
      return this.renderInTableValueDefault({
        value: value
      });
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return false;
    }
  }, {
    key: "formatFormFieldValue",
    value: function formatFormFieldValue(v) {
      return (0, _moment.default)(v);
    }
  }, {
    key: "canShowFormItemInEditableTable",
    value: function canShowFormItemInEditableTable() {
      return false;
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref4) {
      var isEdit = _ref4.isEdit;
      return _react.default.createElement(_datePicker.default, (0, _extends2.default)({
        allowClear: true,
        showTime: this.showTime(),
        format: this.getInTableFormat()
      }, this.getFormComponentProps({
        isEdit: isEdit
      })));
    }
  }]);
  return BaseDateTimeColumn;
}(_StringColumn2.default);

exports.default = BaseDateTimeColumn;