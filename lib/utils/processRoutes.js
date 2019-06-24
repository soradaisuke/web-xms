"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processRoutes;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _isReact = _interopRequireDefault(require("is-react"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _dynamicRecordsComponent = _interopRequireDefault(require("./dynamicRecordsComponent"));

var _dynamicRecordComponent = _interopRequireDefault(require("./dynamicRecordComponent"));

var _processGroupConfig = _interopRequireDefault(require("./processGroupConfig"));

var _processSingleConfig = _interopRequireDefault(require("./processSingleConfig"));

var _migrate = require("./migrate");

function valiadateRoute(_ref) {
  var path = _ref.path;
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if (!path) {
    throw new Error("".concat(prefix, ": path is required"));
  }

  if (!(0, _startsWith2.default)(path, prefix)) {
    throw new Error("".concat(path, ": path must start with ").concat(prefix));
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

    return (rs || []).map(function (r) {
      valiadateRoute(r, prefix);
      var route = (0, _migrate.migrateRoute)(r, app);
      var _route$config = route.config,
          config = _route$config === void 0 ? {} : _route$config,
          path = route.path,
          models = route.models;
      var component = route.component;

      if (_isReact.default.element(component)) {
        throw new Error("".concat(path, ": component can not be React.Element"));
      } else if (_isReact.default.component(component)) {} else if ((0, _isFunction2.default)(component)) {
        component = (0, _dynamic.default)({
          component: component,
          models: models,
          app: app
        });
      }

      if (config.type === 'group') {
        component = (0, _dynamicRecordsComponent.default)({
          app: app,
          component: component,
          config: (0, _processGroupConfig.default)({
            config: config,
            path: path
          })
        });
      } else {
        component = (0, _dynamicRecordComponent.default)({
          app: app,
          component: component,
          config: (0, _processSingleConfig.default)({
            config: config,
            path: path
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