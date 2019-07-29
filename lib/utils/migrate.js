"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateApi = migrateApi;
exports.migrateRouteApi = migrateRouteApi;
exports.migrateConfig = migrateConfig;
exports.migrateRoute = migrateRoute;
exports.migrateColumn = migrateColumn;

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

function migrateRouteApi() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultFilter = _ref2.defaultFilter,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["defaultFilter"]);
  var newApi = {};

  if (defaultFilter) {
    console.error('route.api.defaultFilter is deprecated, please use route.api.fetchFixedFilter');
    newApi = {
      fetchFixedFilter: defaultFilter
    };
  }

  return (0, _objectSpread2.default)({}, newApi, other);
}

function migrateConfig() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var type = _ref3.type,
      api = _ref3.api,
      schema = _ref3.schema,
      inlineWidgetType = _ref3.inlineWidgetType,
      other = (0, _objectWithoutProperties2.default)(_ref3, ["type", "api", "schema", "inlineWidgetType"]);
  var newType = type;

  if (type === 'group') {
    console.error("route.config.type 'group' is deprecated, please use 'list'");
    newType = 'list';
  }

  if (schema) {
    console.error('route.config.schema is deprecated, please use table');
  }

  if (inlineWidgetType) {
    console.error('route.config.inlineWidgetType is deprecated, please use route.config.layout');
  }

  return (0, _objectSpread2.default)({
    type: newType,
    api: migrateRouteApi(api),
    table: schema,
    layout: inlineWidgetType
  }, other);
}

function migrateRoute() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = _ref4.component,
      config = _ref4.config,
      other = (0, _objectWithoutProperties2.default)(_ref4, ["component", "config"]);
  var newRoute;

  if (component && component.component) {
    console.error('route.component.component is deprecated, please use route.component和route.models');
    newRoute = (0, _objectSpread2.default)({}, component);
  } else {
    newRoute = {
      component: component
    };
  }

  return (0, _objectSpread2.default)({
    config: migrateConfig(config)
  }, newRoute, other);
}

function migrateColumn(_ref5) {
  var visibility = _ref5.visibility,
      other = (0, _objectWithoutProperties2.default)(_ref5, ["visibility"]);
  var newColumn = {};

  if (visibility) {
    console.error('visibility is deprecated, please use invisible, creatable or editable');

    if (visibility === 'all' || visibility === true) {
      newColumn = {
        creatable: true,
        editable: true
      };
    } else if (visibility === 'table') {} else if (visibility === 'modal') {
      newColumn = {
        invisible: true,
        creatable: true,
        editable: true
      };
    } else if (visibility === 'edit') {
      newColumn = {
        invisible: true,
        editable: true
      };
    } else {
      newColumn = {
        invisible: !visibility.table,
        creatable: visibility.create,
        editable: newColumn.editable
      };
    }
  }

  return (0, _objectSpread2.default)({}, newColumn, other);
}