"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function _default(rowKey) {
  return function (record) {
    var key;

    switch ((0, _typeof2.default)(rowKey)) {
      case 'function':
        key = rowKey(record);
        break;

      case 'string':
        key = record[rowKey];
        break;

      default:
    }

    return key;
  };
}