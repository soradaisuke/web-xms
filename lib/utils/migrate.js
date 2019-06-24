"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateApi = migrateApi;
exports.migrateRoute = migrateRoute;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

function migrateApi() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      login = _ref.login,
      other = _ref.other;

  if (login) {
    console.error('api.login is deprecated, use api.auth');
  }

  return (0, _objectSpread2.default)({
    auth: login
  }, other);
}

function migrateRoute() {}