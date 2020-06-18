"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _TimePickerWithConfirm = _interopRequireDefault(require("../components/TimePickerWithConfirm"));

var _NumberColumn2 = _interopRequireDefault(require("./NumberColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TimeColumn = function (_NumberColumn) {
  (0, _inherits2.default)(TimeColumn, _NumberColumn);

  var _super = _createSuper(TimeColumn);

  function TimeColumn() {
    (0, _classCallCheck2.default)(this, TimeColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(TimeColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return 'HH:mm:ss';
    }
  }, {
    key: "getInTableFormat",
    value: function getInTableFormat() {
      return this.config.getIn(['table', 'format'], this.getDefaultInTableFormat());
    }
  }, {
    key: "formatFormFieldValue",
    value: function formatFormFieldValue(v) {
      return (0, _moment.default)().startOf('day').add(v, 's');
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return (0, _isNumber2.default)(value) ? (0, _moment.default)().startOf('day').add(value, 's').format(this.getInTableFormat()) : '';
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
    key: "renderInFormItem",
    value: function renderInFormItem(_ref3) {
      var user = _ref3.user,
          record = _ref3.record,
          value = _ref3.value,
          values = _ref3.values,
          isEdit = _ref3.isEdit,
          _ref3$formComponentPr = _ref3.formComponentProps,
          formComponentProps = _ref3$formComponentPr === void 0 ? {} : _ref3$formComponentPr;
      return _react.default.createElement(_timePicker.default, (0, _extends2.default)({}, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      return v.diff((0, _moment.default)().startOf('day')) / 1000;
    }
  }]);
  return TimeColumn;
}(_NumberColumn2.default);

exports.default = TimeColumn;