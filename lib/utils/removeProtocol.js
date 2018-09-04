"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _replace2 = _interopRequireDefault(require("lodash/fp/replace"));

var _default = (0, _replace2.default)(/https?:\/\//, '//');

exports.default = _default;