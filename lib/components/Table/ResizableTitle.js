"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactResizable = require("react-resizable");

require("./ResizableTitle.less");

function ResizableTitle(_ref) {
  var onResize = _ref.onResize,
      width = _ref.width,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["onResize", "width"]);

  if (!width) {
    return _react.default.createElement("th", restProps);
  }

  return _react.default.createElement(_reactResizable.Resizable, {
    width: width,
    height: 0,
    handle: _react.default.createElement("span", {
      className: "react-resizable-handle",
      onClick: function onClick(e) {
        e.stopPropagation();
      }
    }),
    onResize: onResize,
    draggableOpts: {
      enableUserSelectHack: false
    }
  }, _react.default.createElement("th", restProps));
}

ResizableTitle.propTypes = {
  onResize: _propTypes.default.func,
  width: _propTypes.default.number
};
ResizableTitle.defaultProps = {
  onResize: null,
  width: 0
};
var _default = ResizableTitle;
exports.default = _default;