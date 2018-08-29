"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processSingleConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

function processSingleConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  return (0, _objectSpread2.default)({}, config, {
    namespace: path.replace(/(\/|:)/g, '@')
  });
}