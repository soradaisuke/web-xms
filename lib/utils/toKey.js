"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toKey;

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

function toKey(v) {
  if ((0, _isPlainObject2.default)(v)) {
    return JSON.stringify(v);
  }

  return (0, _toString2.default)(v);
}