"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRouteApi = migrateRouteApi;
exports.migrateConfig = migrateConfig;
exports.migrateRoute = migrateRoute;
exports.migrateColumn = migrateColumn;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function migrateRouteApi() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var fetchFixedFilter = _ref.fetchFixedFilter,
      createDefaultBody = _ref.createDefaultBody,
      other = (0, _objectWithoutProperties2.default)(_ref, ["fetchFixedFilter", "createDefaultBody"]);
  var newApi = {};

  if (fetchFixedFilter) {
    console.error('route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter');
    newApi = {
      fixedFilter: fetchFixedFilter
    };
  }

  if (createDefaultBody) {
    console.error('route.api.createDefaultBody is deprecated, please use route.api.defaultBody');
    newApi = (0, _objectSpread2.default)({}, newApi, {
      defaultBody: createDefaultBody
    });
  }

  return (0, _objectSpread2.default)({}, newApi, other);
}

function migrateConfig() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var type = _ref2.type,
      api = _ref2.api,
      schema = _ref2.schema,
      inlineWidgetType = _ref2.inlineWidgetType,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["type", "api", "schema", "inlineWidgetType"]);
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
    api: migrateRouteApi(api),
    type: newType,
    table: schema,
    layout: inlineWidgetType
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

  return (0, _objectSpread2.default)({
    config: migrateConfig(config)
  }, newRoute, other);
}

function migrateColumn(_ref4) {
  var visibility = _ref4.visibility,
      other = (0, _objectWithoutProperties2.default)(_ref4, ["visibility"]);
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