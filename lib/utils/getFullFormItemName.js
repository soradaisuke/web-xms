"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFullFormItemName;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function getFullFormItemName(_ref) {
  var prefix = _ref.prefix,
      column = _ref.column,
      name = _ref.name;
  var parentName = (column === null || column === void 0 ? void 0 : column.getFormItemName()) || name;
  return prefix && parentName ? [].concat((0, _toConsumableArray2.default)(prefix), (0, _toConsumableArray2.default)((0, _isArray2.default)(parentName) ? parentName : [parentName])) : parentName;
}