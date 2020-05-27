"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateAntdOptions;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function generateAntdOptions(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        text = _ref.text,
        item = (0, _objectWithoutProperties2.default)(_ref, ["value", "text"]);
    return (0, _objectSpread2.default)({
      value: value,
      label: text
    }, item);
  });
}