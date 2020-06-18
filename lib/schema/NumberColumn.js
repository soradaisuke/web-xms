"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _Column2 = _interopRequireDefault(require("./Column"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var formatNumber = function formatNumber(n) {
  return n && !(0, _isNaN2.default)((0, _toNumber2.default)(n)) ? (0, _toNumber2.default)(n) : n;
};

var NumberColumn = function (_Column) {
  (0, _inherits2.default)(NumberColumn, _Column);

  var _super = _createSuper(NumberColumn);

  function NumberColumn() {
    (0, _classCallCheck2.default)(this, NumberColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(NumberColumn, [{
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return formatNumber(v);
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      if (this.canSelectMutipleInForm()) {
        return (0, _map2.default)(v, function (item) {
          return formatNumber(item);
        });
      }

      return formatNumber(v);
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return true;
    }
  }, {
    key: "getFilterIcon",
    value: function getFilterIcon() {
      return this.canFilterRangeInTable() ? _icons.FilterOutlined : _icons.SearchOutlined;
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

      if (this.canSelectMutipleInForm()) {
        return _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          mode: "tags",
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit
        }), formComponentProps));
      }

      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return NumberColumn;
}(_Column2.default);

exports.default = NumberColumn;