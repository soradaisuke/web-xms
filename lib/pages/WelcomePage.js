"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/typography/style");

var _typography = _interopRequireDefault(require("antd/lib/typography"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Page = _interopRequireDefault(require("./Page"));

var Title = _typography.default.Title;

function WelcomePage(_ref) {
  var title = _ref.title;
  return _react.default.createElement(_card.default, null, _react.default.createElement(_Page.default, null, _react.default.createElement(Title, null, "\u6B22\u8FCE\u4F7F\u7528".concat(title))));
}

WelcomePage.propTypes = {
  title: _propTypes.default.string.isRequired
};

var _default = _react.default.memo(WelcomePage);

exports.default = _default;