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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _react = _interopRequireDefault(require("react"));

var _UploadImage = _interopRequireDefault(require("../components/FormItems/UploadImage"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

var ImageColumn = function (_StringColumn) {
  (0, _inherits2.default)(ImageColumn, _StringColumn);

  function ImageColumn() {
    (0, _classCallCheck2.default)(this, ImageColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(ImageColumn, [{
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      var src = (0, _generateUpYunImageUrl2.default)(value);
      var width = this.getTableWidth();
      var style = width ? {
        width: (0, _isNumber2.default)(width) ? "".concat(width, "px") : width
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
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var user = _ref2.user;
      return _react.default.createElement(_UploadImage.default, (0, _extends2.default)({
        ssoToken: user ? user.get('sso_token') : ''
      }, this.getFormComponentProps().toJS()));
    }
  }]);
  return ImageColumn;
}(_StringColumn2.default);

exports.default = ImageColumn;