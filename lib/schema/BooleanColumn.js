"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get4 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Column2 = _interopRequireDefault(require("./Column"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BooleanColumn = function (_Column) {
  (0, _inherits2.default)(BooleanColumn, _Column);

  var _super = _createSuper(BooleanColumn);

  function BooleanColumn() {
    (0, _classCallCheck2.default)(this, BooleanColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(BooleanColumn, [{
    key: "getValueOptions",
    value: function getValueOptions() {
      return (0, _get3.default)((0, _getPrototypeOf2.default)(BooleanColumn.prototype), "getValueOptions", this).call(this) || _immutable.default.fromJS([{
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
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return false;
    }
  }, {
    key: "renderInlineEdit",
    value: function renderInlineEdit(_ref) {
      var _this = this;

      var onClick = _ref.onClick,
          record = _ref.record;
      return this.renderInFormItem({
        isEdit: true,
        formComponentProps: {
          checked: (0, _get4.default)(record, this.getKey()),
          onChange: function onChange(value) {
            onClick({
              data: {
                body: (0, _defineProperty2.default)({}, _this.getFormKey(), value)
              },
              loadingMessage: '正在保存……',
              throwError: true,
              reload: true
            });
          }
        }
      });
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
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return BooleanColumn;
}(_Column2.default);

exports.default = BooleanColumn;