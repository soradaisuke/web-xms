"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _Column2 = _interopRequireDefault(require("./Column"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var StringColumn = function (_Column) {
  (0, _inherits2.default)(StringColumn, _Column);

  var _super = _createSuper(StringColumn);

  function StringColumn() {
    (0, _classCallCheck2.default)(this, StringColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(StringColumn, [{
    key: "getFormMultipleLine",
    value: function getFormMultipleLine() {
      return this.config.getIn(['form', 'multipleLine']);
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return (0, _isUndefined2.default)(v) ? v : (0, _toString2.default)(v);
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      if (this.canSelectMutipleInForm()) {
        return (0, _map2.default)(v, function (item) {
          return item || '';
        });
      }

      return v || '';
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return true;
    }
  }, {
    key: "getFilterIcon",
    value: function getFilterIcon() {
      return _icons.SearchOutlined;
    }
  }, {
    key: "canShowFormItemInEditableTable",
    value: function canShowFormItemInEditableTable() {
      return true;
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
          }
        }, formComponentProps, {
          mode: "tags",
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values
        })));
      }

      if (this.getFormMultipleLine()) {
        return _react.default.createElement(_input.default.TextArea, (0, _extends2.default)({
          style: {
            width: '100%'
          }
        }, formComponentProps, {
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values
        })));
      }

      return _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: '100%'
        }
      }, formComponentProps, {
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      })));
    }
  }]);
  return StringColumn;
}(_Column2.default);

exports.default = StringColumn;