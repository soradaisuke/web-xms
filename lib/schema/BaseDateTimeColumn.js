"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _immutable = _interopRequireDefault(require("immutable"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RangePicker = _datePicker.default.RangePicker;

var BaseDateTimeColumn = function (_StringColumn) {
  (0, _inherits2.default)(BaseDateTimeColumn, _StringColumn);

  var _super = _createSuper(BaseDateTimeColumn);

  function BaseDateTimeColumn() {
    (0, _classCallCheck2.default)(this, BaseDateTimeColumn);
    return _super.apply(this, arguments);
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
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return value && (0, _moment.default)(value).isValid() ? (0, _moment.default)(value).format(this.getInTableFormat()) : '';
    }
  }, {
    key: "renderInDescriptionDefault",
    value: function renderInDescriptionDefault(_ref2) {
      var value = _ref2.value;
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
    value: function formatFormFieldValue(value) {
      return value && (0, _moment.default)(value).isValid() ? (0, _moment.default)(value) : undefined;
    }
  }, {
    key: "canShowFormItemInEditableTable",
    value: function canShowFormItemInEditableTable() {
      return false;
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref3) {
      var user = _ref3.user,
          record = _ref3.record,
          value = _ref3.value,
          values = _ref3.values,
          isEdit = _ref3.isEdit,
          _ref3$formComponentPr = _ref3.formComponentProps,
          formComponentProps = _ref3$formComponentPr === void 0 ? {} : _ref3$formComponentPr;
      return _react.default.createElement(_datePicker.default, (0, _extends2.default)({
        allowClear: true,
        showTime: this.showTime(),
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
  return BaseDateTimeColumn;
}(_StringColumn2.default);

exports.default = BaseDateTimeColumn;