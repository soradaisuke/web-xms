"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateApi = migrateApi;
exports.migrateRoute = migrateRoute;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function migrateApi() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var login = _ref.login,
      other = (0, _objectWithoutProperties2.default)(_ref, ["login"]);

  if (login) {
    console.error('api.logint is deprecated, please use api.auth');
  }

  return (0, _objectSpread2.default)({
    auth: login
  }, other);
}

function migrateRoute() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = _ref2.component,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["component"]);

  if (component && component.component) {
    console.error('route.component.component is deprecated, please use route.component和route.models');
    return (0, _objectSpread2.default)({}, component, other);
  }

  return (0, _objectSpread2.default)({
    component: component
  }, other);
}