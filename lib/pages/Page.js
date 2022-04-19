"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/es/alert/style");

var _alert = _interopRequireDefault(require("antd/lib/alert"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function Page(_ref) {
  var className = _ref.className,
      errorMessage = _ref.errorMessage,
      isLoading = _ref.isLoading,
      isError = _ref.isError,
      children = _ref.children;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('xms-page', className)
  }, isError ? _react.default.createElement(_alert.default, {
    showIcon: true,
    description: errorMessage || '发生错误，请检查网络后重试',
    message: "\u9519\u8BEF",
    type: "error"
  }) : _react.default.createElement(_spin.default, {
    className: "xms-page-loading",
    spinning: isLoading,
    size: "large"
  }, children));
}

Page.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  errorMessage: _propTypes.default.string,
  isError: _propTypes.default.bool,
  isLoading: _propTypes.default.bool
};
Page.defaultProps = {
  children: null,
  className: '',
  errorMessage: '',
  isError: false,
  isLoading: false
};

var _default = _react.default.memo(Page);

exports.default = _default;