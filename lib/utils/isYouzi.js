"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var isYouzi = (0, _includes2.default)(window.location.host, 'youzi');
var _default = isYouzi;
exports.default = _default;