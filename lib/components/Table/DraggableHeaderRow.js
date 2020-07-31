"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function DraggableHeaderRow(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  return _react.default.createElement("tr", restProps, children, _react.default.createElement("th", null));
}

DraggableHeaderRow.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)])
};
DraggableHeaderRow.defaultProps = {
  children: null
};

var _default = _react.default.memo(DraggableHeaderRow);

exports.default = _default;