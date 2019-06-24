"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processRoutes;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _dynamicRecordsComponent = _interopRequireDefault(require("./dynamicRecordsComponent"));

var _dynamicRecordComponent = _interopRequireDefault(require("./dynamicRecordComponent"));

var _processGroupConfig = _interopRequireDefault(require("./processGroupConfig"));

var _processSingleConfig = _interopRequireDefault(require("./processSingleConfig"));

function valiadateRoute(_ref) {
  var path = _ref.path;
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if (!path) {
    throw new Error("\u7236\u9875\u9762path\u4E3A".concat(prefix, "\u7684route\u7F3A\u5C11path\u5C5E\u6027"));
  }

  if (!(0, _startsWith2.default)(path, prefix)) {
    throw new Error("path\u4E3A".concat(path, "\u7684\u9875\u9762\u5FC5\u987B\u4EE5").concat(prefix, "\u5F00\u5934"));
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
      var _route$config = route.config,
          config = _route$config === void 0 ? {} : _route$config,
          path = route.path;
      var component = route.component;

      if (!(0, _isFunction2.default)(component) && !((0, _isPlainObject2.default)(component) && (0, _isFunction2.default)(component.component))) {
        console.error("".concat(path, ": component\u7684\u7C7B\u578B\u5FC5\u987B\u662F() => ReactElement\u6216{ models: [() => import(DvaModel)], component: () => import(ReactComponent) }"));
      }

      if ((0, _isPlainObject2.default)(component)) {
        component = (0, _dynamic.default)((0, _objectSpread2.default)({}, component, {
          app: app
        }));
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