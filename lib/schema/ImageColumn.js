"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _generateUpYunImageUrl2 = _interopRequireDefault(require("@qt/web-core/lib/generateUpYunImageUrl"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _react = _interopRequireDefault(require("react"));

var _UploadImage = _interopRequireDefault(require("../components/FormItems/UploadImage"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ImageColumn = function (_StringColumn) {
  (0, _inherits2.default)(ImageColumn, _StringColumn);

  var _super = _createSuper(ImageColumn);

  function ImageColumn() {
    (0, _classCallCheck2.default)(this, ImageColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ImageColumn, [{
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      var src = (0, _generateUpYunImageUrl2.default)(value);
      var width = this.getTableWidth();
      var style = width ? {
        width: (0, _isNumber2.default)(width) ? "".concat(width - 32, "px") : width
      } : {};
      return _react.default.createElement("img", {
        alt: "",
        src: src,
        style: style
      });
    }
  }, {
    key: "renderInDescriptionDefault",
    value: function renderInDescriptionDefault(_ref2) {
      var value = _ref2.value;
      var src = (0, _generateUpYunImageUrl2.default)(value);
      var width = this.getDescriptionWidth();
      var style = width ? {
        width: (0, _isNumber2.default)(width) ? "".concat(width - 48, "px") : width
      } : {};
      return _react.default.createElement("img", {
        alt: "",
        src: src,
        style: style
      });
    }
  }, {
    key: "getFormFiledValuePropName",
    value: function getFormFiledValuePropName() {
      return 'url';
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
      return _react.default.createElement(_UploadImage.default, (0, _extends2.default)({
        ssoToken: user ? user.get('sso_token') : ''
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return ImageColumn;
}(_StringColumn2.default);

exports.default = ImageColumn;