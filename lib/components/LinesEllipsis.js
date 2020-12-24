"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react/lib/ClickableDiv"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactLinesEllipsis = _interopRequireDefault(require("react-lines-ellipsis"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./LinesEllipsis.less");

function LinesEllipsis(_ref) {
  var text = _ref.text,
      props = (0, _objectWithoutProperties2.default)(_ref, ["text"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      expand = _useState2[0],
      setExpand = _useState2[1];

  var onClickButton = (0, _useEventCallback2.default)(function () {
    setExpand(function (pre) {
      return !pre;
    });
  });
  return _react.default.createElement("div", null, expand ? _react.default.createElement("span", null, text, _react.default.createElement(_ClickableDiv2.default, {
    className: "xms-lines-ellipsis-button",
    onClick: onClickButton
  }, "\u6536\u8D77")) : _react.default.createElement(_reactLinesEllipsis.default, (0, _extends2.default)({}, props, {
    text: text,
    ellipsis: _react.default.createElement("span", null, "...", _react.default.createElement(_ClickableDiv2.default, {
      className: "xms-lines-ellipsis-button",
      onClick: onClickButton
    }, "\u5C55\u5F00"))
  })));
}

LinesEllipsis.propTypes = {
  text: _propTypes.default.string
};
LinesEllipsis.defaultProps = {
  text: ''
};

var _default = _react.default.memo(LinesEllipsis);

exports.default = _default;