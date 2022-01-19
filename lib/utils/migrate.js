"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRouteApi = migrateRouteApi;
exports.migrateConfig = migrateConfig;
exports.migrateRoute = migrateRoute;
exports.migrateColumn = migrateColumn;
exports.migrateAction = migrateAction;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _env = require("@qt/env");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function deprecatedError(message) {
  if (!_env.isStaging && !_env.isProduction) {
    console.error(message);
  }
}

function deprecatedWarn(message) {
  if (!_env.isStaging && !_env.isProduction) {
    console.warn(message);
  }
}

function isNotRefFunction(func) {
  if (func && (0, _isFunction2.default)(func)) {
    if (func.length === 0) {
      return false;
    }

    var str = func.toString();
    return !(0, _includes2.default)(str, '(_ref') && !(0, _includes2.default)(str, 'arguments[0]') || func.length > 1;
  }

  return false;
}

function migrateRouteApi() {
  var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fetchFixedFilter = api.fetchFixedFilter,
      createDefaultBody = api.createDefaultBody;
  var newApi = (0, _merge2.default)({}, api);

  if (fetchFixedFilter) {
    deprecatedError('route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter');
    (0, _merge2.default)(newApi, {
      fixedFilter: fetchFixedFilter
    });
  }

  if (createDefaultBody) {
    deprecatedError('route.api.createDefaultBody is deprecated, please use route.api.defaultBody');
    (0, _merge2.default)(newApi, {
      defaultBody: createDefaultBody
    });
  }

  return newApi;
}

function migrateConfig(config) {
  var type = config.type,
      api = config.api,
      schema = config.schema,
      table = config.table,
      inlineWidgetType = config.inlineWidgetType,
      formPageProps = config.formPageProps,
      bordered = config.bordered,
      defaultPageSize = config.defaultPageSize,
      tableScroll = config.tableScroll,
      tableComponentProps = config.tableComponentProps,
      paginationComponentProps = config.paginationComponentProps;
  var newConfig = (0, _merge2.default)({}, config, {
    api: migrateRouteApi(api)
  });

  if (type === 'group') {
    deprecatedWarn("route.config.type 'group' is deprecated, please use 'table'");
    (0, _merge2.default)(newConfig, {
      type: 'table'
    });
  }

  if (type === 'list') {
    deprecatedWarn("route.config.type 'list' is deprecated, please use 'table'");
    (0, _merge2.default)(newConfig, {
      type: 'table'
    });
  }

  if (type === 'detail') {
    deprecatedWarn("route.config.type 'detail' is deprecated, please use 'descriptions'");
    (0, _merge2.default)(newConfig, {
      type: 'descriptions'
    });
  }

  if (schema) {
    deprecatedWarn('route.config.schema is deprecated, please use columns');
    (0, _merge2.default)(newConfig, {
      columns: schema
    });
  }

  if (table && type !== 'form') {
    deprecatedWarn('route.config.table is deprecated, please use columns');
    (0, _merge2.default)(newConfig, {
      columns: table
    });
  }

  if (inlineWidgetType) {
    deprecatedWarn('route.config.inlineWidgetType is deprecated, please use route.config.layout');
    (0, _merge2.default)(newConfig, {
      layout: inlineWidgetType
    });
  }

  if (formPageProps) {
    deprecatedError('route.config.formPageProps is deprecated, please use route.config.formProps');
    (0, _merge2.default)(newConfig, {
      formProps: formPageProps
    });
  }

  if (bordered) {
    deprecatedWarn('route.config.bordered is deprecated, please use route.config.descriptionsProps');
    (0, _merge2.default)(newConfig, {
      descriptionsProps: {
        bordered: bordered
      }
    });
  }

  if (defaultPageSize) {
    deprecatedWarn('route.config.defaultPageSize is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: {
        pagination: {
          defaultPageSize: defaultPageSize
        }
      }
    });
  }

  if (tableScroll) {
    deprecatedWarn('route.config.tableScroll is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: {
        tableScroll: tableScroll
      }
    });
  }

  if (tableComponentProps) {
    deprecatedWarn('route.config.tableComponentProps is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: tableComponentProps
    });
  }

  if (paginationComponentProps) {
    deprecatedWarn('route.config.paginationComponentProps is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: {
        pagination: paginationComponentProps
      }
    });
  }

  return newConfig;
}

function migrateRoute(route) {
  var component = route.component,
      breadcrumb = route.breadcrumb,
      config = route.config;
  var newRoute = (0, _merge2.default)({}, route);

  if (config) {
    (0, _merge2.default)(newRoute, {
      config: migrateConfig(config)
    });
  }

  if (component && component.component) {
    deprecatedWarn('route.component.component is deprecated, please use route.component和route.models');
    (0, _merge2.default)(newRoute, _objectSpread({}, component));
  } else {
    (0, _merge2.default)(newRoute, {
      component: component
    });
  }

  if (isNotRefFunction(breadcrumb)) {
    deprecatedError('route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })');
  }

  return newRoute;
}

function migrateColumn(column) {
  var visibility = column.visibility,
      valueOptions = column.valueOptions,
      _column$table = column.table;
  _column$table = _column$table === void 0 ? {} : _column$table;
  var defaultSortOrder = _column$table.defaultSortOrder,
      fixedSortOrder = _column$table.fixedSortOrder,
      link = _column$table.link,
      filterComponentProps = _column$table.filterComponentProps,
      format = _column$table.format,
      filterMultiple = _column$table.filterMultiple,
      _column$form = column.form;
  _column$form = _column$form === void 0 ? {} : _column$form;
  var componentProps = _column$form.componentProps,
      generateInitialValue = _column$form.generateInitialValue,
      generateSubmitValue = _column$form.generateSubmitValue,
      renderInFormItem = _column$form.renderInFormItem,
      radioOptions = _column$form.radioOptions,
      searchPlaceholder = _column$form.searchPlaceholder,
      searchRequest = _column$form.searchRequest;
  var newColumn = (0, _merge2.default)({}, column);

  if (visibility) {
    deprecatedError('visibility is deprecated, please use invisible, creatable or editable');

    if (visibility === 'all' || visibility === true) {
      (0, _merge2.default)(newColumn, {
        form: {
          creatable: true,
          editable: true
        }
      });
    } else if (visibility === 'table') {} else if (visibility === 'modal') {
      (0, _merge2.default)(newColumn, {
        table: {
          invisible: true
        },
        form: {
          creatable: true,
          editable: true
        }
      });
    } else if (visibility === 'edit') {
      (0, _merge2.default)(newColumn, {
        table: {
          invisible: true
        },
        form: {
          editable: true
        }
      });
    } else {
      (0, _merge2.default)(newColumn, {
        table: {
          invisible: !visibility.table
        },
        form: {
          creatable: visibility.create,
          editable: newColumn.editable
        }
      });
    }
  }

  if (defaultSortOrder) {
    deprecatedWarn("Column's config.table.defaultSortOrder is deprecated, please use config.table.defaultSortDirection");
    (0, _merge2.default)(newColumn, {
      table: {
        defaultSortDirection: defaultSortOrder
      }
    });
  }

  if (fixedSortOrder) {
    deprecatedWarn("Column's config.table.fixedSortOrder is deprecated, please use config.table.fixedSortDirection");
    (0, _merge2.default)(newColumn, {
      table: {
        fixedSortDirection: fixedSortOrder
      }
    });
  }

  if (componentProps) {
    deprecatedWarn("Column's config.form.componentProps is deprecated, please use config.form.formItemComponentProps");
    (0, _merge2.default)(newColumn, {
      form: {
        formItemComponentProps: componentProps
      }
    });
  }

  if (generateInitialValue) {
    deprecatedWarn("Column's config.form.generateInitialValue is deprecated, please use config.form.normalizeInitialValue");
    (0, _merge2.default)(newColumn, {
      form: {
        normalizeInitialValue: generateInitialValue
      }
    });
  }

  if (generateSubmitValue) {
    deprecatedError("Column's config.form.generateSubmitValue is deprecated, please use Action's config.normalize");
  }

  if (renderInFormItem) {
    deprecatedError("Column's config.form.renderInFormItem is deprecated, please use config.form.render");
    (0, _merge2.default)(newColumn, {
      form: {
        render: renderInFormItem
      }
    });
  }

  if (radioOptions) {
    deprecatedError("Column's config.form.radioOptions is deprecated");
  }

  if (searchPlaceholder) {
    deprecatedError("Column's config.form.searchPlaceholder is deprecated");
  }

  if (searchRequest) {
    deprecatedWarn("Column's config.form.searchRequest is deprecated, please use config.valueOptionsSearchRequest");
    (0, _merge2.default)(newColumn, {
      valueOptionsSearchRequest: searchRequest
    });
  }

  if (filterComponentProps) {
    deprecatedWarn("Column's config.table.filterComponentProps is deprecated, please use config.table.filterFormItemComponentProps");
    (0, _merge2.default)(newColumn, {
      table: {
        filterFormItemComponentProps: filterComponentProps
      }
    });
  }

  if (format) {
    deprecatedWarn("Column's config.table.format is deprecated, please use config.format");
    (0, _merge2.default)(newColumn, {
      format: format
    });
  }

  if (isNotRefFunction(link)) {
    deprecatedError("Column's config.table.link(record) is deprecated, please use config.table.link({ record })");
  }

  if ((valueOptions === null || valueOptions === void 0 ? void 0 : valueOptions.length) > 0) {
    var defaultOptions = (0, _map2.default)((0, _filter2.default)(valueOptions, {
      default: true
    }), function (_ref) {
      var value = _ref.value;
      return value;
    });

    if (defaultOptions.length > 0) {
      deprecatedWarn("Column's valueOption.default is deprecated, please use config.table.filterDefault");
      (0, _merge2.default)(newColumn, {
        table: {
          filterDefault: filterMultiple ? defaultOptions : defaultOptions[0]
        }
      });
    }
  }

  return newColumn;
}

function migrateAction(action) {
  var link = action.link,
      _action$confirm = action.confirm;
  _action$confirm = _action$confirm === void 0 ? {} : _action$confirm;
  var componentProps = _action$confirm.componentProps;
  var newAction = (0, _merge2.default)({}, action);

  if (isNotRefFunction(link)) {
    deprecatedError("Action's config.link(record) is deprecated, please use config.link({ record })");
  }

  if (componentProps) {
    deprecatedWarn("Action's config.confirm.componentProps is deprecated, please use config.confirm.confirmProps");
    (0, _merge2.default)(newAction, {
      confirm: {
        confirmProps: componentProps
      }
    });
  }

  return newAction;
}