"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processRoutes;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _dynamicRecordsComponent = _interopRequireDefault(require("./dynamicRecordsComponent"));

function valiadateRoute(_ref) {
  var path = _ref.path,
      component = _ref.component,
      config = _ref.config,
      routes = _ref.routes;
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if (!path) {
    throw new Error('valiadateRoute: path is required');
  }

  if (!(0, _startsWith2.default)(path, prefix)) {
    throw new Error("valiadateRoute: path ".concat(path, " must start with ").concat(prefix));
  }

  if (!component && !config && (!routes || routes.length === 0)) {
    throw new Error("valiadateRoute: path ".concat(path, " must have component or config or routes"));
  }

  if (component && config) {
    throw new Error("valiadateRoute: path ".concat(path, " must have only component or config"));
  }
}

function processRoutes(_ref2) {
  var app = _ref2.app,
      routes = _ref2.routes;

  function processRoutesInternal(rs) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

    if (!rs) {
      return rs;
    }

    return (rs || []).map(function (route) {
      valiadateRoute(route, prefix);
      var config = route.config,
          path = route.path;
      var component = route.component;

      if (config) {
        component = (0, _dynamicRecordsComponent.default)({
          app: app,
          config: (0, _objectSpread2.default)({}, config, {
            namespace: path.replace(/\//g, '@')
          })
        });
      }

      return (0, _objectSpread2.default)({}, route, {
        component: component,
        routes: processRoutesInternal(route.routes, route.path)
      });
    });
  }

  return processRoutesInternal(routes);
}