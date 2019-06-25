"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateApi = migrateApi;
exports.migrateConfig = migrateConfig;
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

function migrateConfig() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var type = _ref2.type,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["type"]);
  var newType = type;

  if (type === 'group') {
    console.error("route.config.type 'group' is deprecated, please use 'list'");
    newType = 'list';
  }

  return (0, _objectSpread2.default)({
    type: newType
  }, other);
}

function migrateRoute() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = _ref3.component,
      config = _ref3.config,
      other = (0, _objectWithoutProperties2.default)(_ref3, ["component", "config"]);
  var newRoute;

  if (component && component.component) {
    console.error('route.component.component is deprecated, please use route.component和route.models');
    newRoute = (0, _objectSpread2.default)({}, component);
  } else {
    newRoute = {
      component: component
    };
  }

  var newConfig = migrateConfig(config);

  if (newConfig && newConfig.inlineWidgetType) {
    console.error('route.config.inlineWidgetType is deprecated, please use route.inlineLayout');
    newRoute = (0, _objectSpread2.default)({}, newRoute, {
      inlineLayout: newConfig.inlineWidgetType
    });
  }

  newRoute = (0, _objectSpread2.default)({
    config: newConfig
  }, newRoute, other);
  return newRoute;
}