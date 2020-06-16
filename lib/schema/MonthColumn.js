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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _BaseDateTimeColumn2 = _interopRequireDefault(require("./BaseDateTimeColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RangePicker = _datePicker.default.RangePicker,
    MonthPicker = _datePicker.default.MonthPicker;

var MonthColumn = function (_BaseDateTimeColumn) {
  (0, _inherits2.default)(MonthColumn, _BaseDateTimeColumn);

  var _super = _createSuper(MonthColumn);

  function MonthColumn() {
    var _this;

    (0, _classCallCheck2.default)(this, MonthColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilterDropDownContent", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys,
          confirm = _ref.confirm;

      if (_this.canFilterRangeInTable()) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(RangePicker, (0, _extends2.default)({
          mode: ['month', 'month'],
          format: _this.getInTableFormat()
        }, _this.getTableFilterComponentProps(), {
          allowClear: false,
          value: [!(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][0]')) : null, !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)((0, _get2.default)(selectedKeys, '[0][1]')) : null],
          onPanelChange: function onPanelChange(newDate) {
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

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(MonthPicker, (0, _extends2.default)({
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

  (0, _createClass2.default)(MonthColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return 'YYYY-MM';
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v && (0, _isFunction2.default)(v.format) ? v.format('YYYY-MM') : v;
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      return v && (0, _isFunction2.default)(v.format) ? v.format('YYYY-MM') : v;
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var user = _ref2.user,
          record = _ref2.record,
          value = _ref2.value,
          values = _ref2.values,
          isEdit = _ref2.isEdit,
          _ref2$formComponentPr = _ref2.formComponentProps,
          formComponentProps = _ref2$formComponentPr === void 0 ? {} : _ref2$formComponentPr;
      return _react.default.createElement(MonthPicker, (0, _extends2.default)({
        allowClear: true,
        format: this.getInTableFormat()
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return MonthColumn;
}(_BaseDateTimeColumn2.default);

exports.default = MonthColumn;