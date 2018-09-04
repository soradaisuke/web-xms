"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _curry2 = _interopRequireDefault(require("lodash/fp/curry"));

var _default = (0, _curry2.default)(function (postfix, url) {
  if (url && postfix && ((0, _includes2.default)(url, 'pic.qingting.fm') || (0, _includes2.default)(url, 'sss.qingting.fm'))) {
    return "".concat(url.split('!')[0], "!").concat(postfix);
  }

  return url;
});

exports.default = _default;