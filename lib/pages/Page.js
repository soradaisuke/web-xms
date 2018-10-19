"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/alert/style");

var _alert = _interopRequireDefault(require("antd/lib/alert"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var Page = function (_React$PureComponent) {
  (0, _inherits2.default)(Page, _React$PureComponent);

  function Page() {
    (0, _classCallCheck2.default)(this, Page);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).apply(this, arguments));
  }

  (0, _createClass2.default)(Page, [{
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          isError = _this$props.isError,
          errorMessage = _this$props.errorMessage,
          children = _this$props.children;

      if (isError) {
        return _react.default.createElement(_alert.default, {
          showIcon: true,
          description: errorMessage || '发生错误，请检查网络后重试',
          message: "\u9519\u8BEF",
          type: "error"
        });
      }

      return _react.default.createElement(_spin.default, {
        className: "xms-page-loading",
        spinning: isLoading,
        size: "large"
      }, children);
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('xms-page', className)
      }, this.renderContent());
    }
  }]);
  return Page;
}(_react.default.PureComponent);

exports.default = Page;
(0, _defineProperty2.default)(Page, "displayName", 'Page');
(0, _defineProperty2.default)(Page, "propTypes", {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  errorMessage: _propTypes.default.string,
  isError: _propTypes.default.bool,
  isLoading: _propTypes.default.bool
});
(0, _defineProperty2.default)(Page, "defaultProps", {
  children: null,
  className: '',
  errorMessage: '',
  isError: false,
  isLoading: false
});