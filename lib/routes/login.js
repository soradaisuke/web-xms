"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _default = {
  path: '/login',
  breadcrumb: '登录',
  component: function component() {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require('../pages/LoginPage'));
    });
  }
};
exports.default = _default;