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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireDefault(require("react"));

var _BaseDateTimeColumn2 = _interopRequireDefault(require("./BaseDateTimeColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MonthPicker = _datePicker.default.MonthPicker;

var MonthColumn = function (_BaseDateTimeColumn) {
  (0, _inherits2.default)(MonthColumn, _BaseDateTimeColumn);

  var _super = _createSuper(MonthColumn);

  function MonthColumn() {
    (0, _classCallCheck2.default)(this, MonthColumn);
    return _super.apply(this, arguments);
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
    value: function renderInFormItem(_ref) {
      var user = _ref.user,
          record = _ref.record,
          value = _ref.value,
          values = _ref.values,
          isEdit = _ref.isEdit,
          _ref$formComponentPro = _ref.formComponentProps,
          formComponentProps = _ref$formComponentPro === void 0 ? {} : _ref$formComponentPro;
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