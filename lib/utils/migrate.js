"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRouteApi = migrateRouteApi;
exports.migrateConfig = migrateConfig;
exports.migrateRoute = migrateRoute;
exports.migrateColumn = migrateColumn;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    newApi = _objectSpread(_objectSpread({}, newApi), {}, {
      defaultBody: createDefaultBody
    });
  }

  return _objectSpread(_objectSpread({}, newApi), other);
}

function migrateConfig() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var type = _ref2.type,
      api = _ref2.api,
      schema = _ref2.schema,
      table = _ref2.table,
      inlineWidgetType = _ref2.inlineWidgetType,
      formPageProps = _ref2.formPageProps,
      bordered = _ref2.bordered,
      descriptionsProps = _ref2.descriptionsProps,
      _ref2$tableProps = _ref2.tableProps;
  _ref2$tableProps = _ref2$tableProps === void 0 ? {} : _ref2$tableProps;
  var pagination = _ref2$tableProps.pagination,
      tableProps = (0, _objectWithoutProperties2.default)(_ref2$tableProps, ["pagination"]),
      defaultPageSize = _ref2.defaultPageSize,
      tableScroll = _ref2.tableScroll,
      tableComponentProps = _ref2.tableComponentProps,
      paginationComponentProps = _ref2.paginationComponentProps,
      other = (0, _objectWithoutProperties2.default)(_ref2, ["type", "api", "schema", "table", "inlineWidgetType", "formPageProps", "bordered", "descriptionsProps", "tableProps", "defaultPageSize", "tableScroll", "tableComponentProps", "paginationComponentProps"]);
  var newType = type;

  if (type === 'group') {
    console.warn("route.config.type 'group' is deprecated, please use 'table'");
    newType = 'table';
  }

  if (type === 'list') {
    console.warn("route.config.type 'list' is deprecated, please use 'table'");
    newType = 'table';
  }

  if (type === 'detail') {
    console.warn("route.config.type 'detail' is deprecated, please use 'descriptions'");
    newType = 'descriptions';
  }

  if (schema) {
    console.warn('route.config.schema is deprecated, please use columns');
  }

  if (table) {
    console.warn('route.config.table is deprecated, please use columns');
  }

  if (inlineWidgetType) {
    console.warn('route.config.inlineWidgetType is deprecated, please use route.config.layout');
  }

  if (formPageProps) {
    console.error('route.config.formPageProps is deprecated, please use route.config.formProps');
  }

  if (bordered) {
    console.warn('route.config.bordered is deprecated, please use route.config.descriptionsProps');
  }

  if (defaultPageSize) {
    console.warn('route.config.defaultPageSize is deprecated, please use route.config.tableProps');
  }

  if (tableScroll) {
    console.warn('route.config.tableScroll is deprecated, please use route.config.tableProps');
  }

  if (tableComponentProps) {
    console.warn('route.config.tableComponentProps is deprecated, please use route.config.tableProps');
  }

  if (paginationComponentProps) {
    console.warn('route.config.paginationComponentProps is deprecated, please use route.config.tableProps');
  }

  return _objectSpread({
    api: migrateRouteApi(api),
    type: newType,
    columns: schema || table,
    layout: inlineWidgetType,
    formProps: formPageProps,
    descriptionsProps: _objectSpread({
      bordered: bordered
    }, descriptionsProps !== null && descriptionsProps !== void 0 ? descriptionsProps : {}),
    tableProps: _objectSpread(_objectSpread({
      pagination: _objectSpread(_objectSpread({
        defaultPageSize: defaultPageSize !== null && defaultPageSize !== void 0 ? defaultPageSize : 10
      }, pagination !== null && pagination !== void 0 ? pagination : {}), paginationComponentProps !== null && paginationComponentProps !== void 0 ? paginationComponentProps : {}),
      tableScroll: tableScroll
    }, tableProps !== null && tableProps !== void 0 ? tableProps : {}), tableComponentProps !== null && tableComponentProps !== void 0 ? tableComponentProps : {})
  }, other);
}

function migrateRoute() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = _ref3.component,
      breadcrumb = _ref3.breadcrumb,
      config = _ref3.config,
      other = (0, _objectWithoutProperties2.default)(_ref3, ["component", "breadcrumb", "config"]);
  var newRoute;

  if (component && component.component) {
    console.warning('route.component.component is deprecated, please use route.component和route.models');
    newRoute = _objectSpread({}, component);
  } else {
    newRoute = {
      component: component
    };
  }

  if (breadcrumb && !(0, _includes2.default)(breadcrumb.toString(), '(_ref')) {
    console.error('route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })');
  }

  return _objectSpread(_objectSpread({
    config: migrateConfig(config)
  }, newRoute), {}, {
    breadcrumb: breadcrumb
  }, other);
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

  return _objectSpread(_objectSpread({}, newColumn), other);
}