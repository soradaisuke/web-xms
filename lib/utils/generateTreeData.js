"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateTreeData;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function generateTreeData(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        text = _ref.text,
        children = _ref.children,
        item = (0, _objectWithoutProperties2.default)(_ref, ["value", "text", "children"]);
    return (0, _objectSpread2.default)({
      value: value,
      key: value,
      title: text,
      children: generateTreeData(children)
    }, item);
  });
}