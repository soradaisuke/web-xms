"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateConfig = migrateConfig;
exports.migrateRoute = migrateRoute;
exports.migrateColumn = migrateColumn;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function migrateConfig() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var type = _ref.type,
      api = _ref.api,
      schema = _ref.schema,
      inlineWidgetType = _ref.inlineWidgetType,
      other = (0, _objectWithoutProperties2.default)(_ref, ["type", "api", "schema", "inlineWidgetType"]);
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
    api: api,
    type: newType,
    table: schema,
    layout: inlineWidgetType
  }, other);
}

function migrateRoute() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = _ref2.component,
      config = _ref2.config,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["component", "config"]);
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

function migrateColumn(_ref3) {
  var visibility = _ref3.visibility,
      other = (0, _objectWithoutProperties2.default)(_ref3, ["visibility"]);
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