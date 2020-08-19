"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processRoutes;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _react = _interopRequireDefault(require("react"));

var _reactIs = require("react-is");

var _dva = require("dva");

var _dynamicComponents = require("./dynamicComponents");

var _processListConfig = _interopRequireDefault(require("./processListConfig"));

var _processSingleConfig = _interopRequireDefault(require("./processSingleConfig"));

var _migrate = require("./migrate");

var _processFormConfig = _interopRequireDefault(require("./processFormConfig"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isDynamicComponent(component) {
  return (0, _isFunction2.default)(component) && String(component).includes('import');
}

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
          models = route.models,
          inline = route.inline,
          subRoutes = route.routes,
          others = (0, _objectWithoutProperties2.default)(route, ["config", "path", "models", "inline", "routes"]);
      var useFormPage = config.useFormPage;
      var inlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (sr) {
        return sr.inline;
      }) : [];
      var component = route.component;
      var processedConfig = {};

      if ((0, _reactIs.isElement)(component)) {
        var c = component;

        component = function NewComponent() {
          return _react.default.createElement(_react.default.Fragment, null, c);
        };
      } else if (isDynamicComponent(component)) {
        component = (0, _dva.dynamic)({
          component: component,
          models: models,
          app: app
        });
      }

      if (config.type === 'table') {
        processedConfig = (0, _processListConfig.default)({
          config: config,
          path: path,
          prefix: prefix,
          inline: inline,
          useFormPage: useFormPage
        });
        component = (0, _dynamicComponents.dynamicRecordsComponent)(_objectSpread({
          app: app,
          component: component,
          inline: inline,
          config: processedConfig
        }, others));
      } else if (inlineRoutes.length > 0 || config.type === 'descriptions') {
        processedConfig = (0, _processSingleConfig.default)({
          config: config,
          path: path
        });
        component = (0, _dynamicComponents.dynamicRecordComponent)(_objectSpread({
          app: app,
          component: component,
          inline: inline,
          config: processedConfig
        }, others));
      } else if (config.type === 'form') {
        component = (0, _dynamicComponents.dynamicRecordFormComponent)(_objectSpread({
          app: app,
          inline: inline,
          config: (0, _processFormConfig.default)({
            config: config,
            path: path
          })
        }, others));
      }

      if (useFormPage) {
        var idIdentifier = (0, _uniqueId2.default)('_id');
        var formPageRoute = {
          breadcrumb: function breadcrumb(_ref3) {
            var id = _ref3.id;
            return id === 'new' ? '新建' : '编辑';
          },
          path: "".concat(path, "/:").concat(idIdentifier, "/edit"),
          config: _objectSpread(_objectSpread({}, processedConfig), {}, {
            idIdentifier: idIdentifier,
            type: 'form'
          })
        };

        if (!route.routes) {
          route.routes = [formPageRoute];
        } else {
          route.routes.push(formPageRoute);
        }
      }

      return _objectSpread(_objectSpread({}, route), {}, {
        component: component,
        namespace: processedConfig.namespace,
        routes: processRoutesInternal(route.routes, route.path)
      });
    });
  }

  return processRoutesInternal(routes);
}