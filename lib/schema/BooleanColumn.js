"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Column2 = _interopRequireDefault(require("./Column"));

var BooleanColumn = function (_Column) {
  (0, _inherits2.default)(BooleanColumn, _Column);

  function BooleanColumn() {
    (0, _classCallCheck2.default)(this, BooleanColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BooleanColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(BooleanColumn, [{
    key: "getValueOptions",
    value: function getValueOptions() {
      return (0, _get2.default)((0, _getPrototypeOf2.default)(BooleanColumn.prototype), "getValueOptions", this).call(this) || _immutable.default.fromJS([{
        text: '是',
        value: true
      }, {
        text: '否',
        value: false
      }]);
    }
  }, {
    key: "useValueOptionsInTable",
    value: function useValueOptionsInTable() {
      return true;
    }
  }, {
    key: "useValueOptionsInForm",
    value: function useValueOptionsInForm() {
      return false;
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v && v !== 'false';
    }
  }, {
    key: "getFormFiledValuePropName",
    value: function getFormFiledValuePropName() {
      return 'checked';
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem() {
      var options = this.getValueOptions();
      var checkedChildren = options.find(function (option) {
        return option.get('value');
      }).get('text');
      var unCheckedChildren = options.find(function (option) {
        return !option.get('value');
      }).get('text');
      return _react.default.createElement(_switch.default, (0, _extends2.default)({
        checkedChildren: checkedChildren,
        unCheckedChildren: unCheckedChildren
      }, this.getFormComponentProps().toJS()));
    }
  }]);
  return BooleanColumn;
}(_Column2.default);

exports.default = BooleanColumn;