"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTreeSelectValue = formatTreeSelectValue;
exports.default = generateTreeData;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

function formatTreeSelectValue(value) {
  return (0, _isBoolean2.default)(value) || (0, _isNumber2.default)(value) ? String(value) : value;
}

function generateTreeData(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        text = _ref.text,
        children = _ref.children,
        item = (0, _objectWithoutProperties2.default)(_ref, ["value", "text", "children"]);
    return (0, _objectSpread2.default)({
      value: formatTreeSelectValue(value),
      key: value,
      title: _react.default.createElement("div", {
        style: {
          width: '100%'
        }
      }, text),
      children: generateTreeData(children)
    }, item);
  });
}