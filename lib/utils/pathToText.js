"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _replace2 = _interopRequireDefault(require("lodash/fp/replace"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _default = (0, _flow2.default)((0, _replace2.default)(/\{slashes\}/g, '/'), (0, _replace2.default)(/\{percent\}/g, '%'), (0, _replace2.default)(/\{hash\}/g, '#'), (0, _replace2.default)(/\{qmark\}/g, '?'));

exports.default = _default;