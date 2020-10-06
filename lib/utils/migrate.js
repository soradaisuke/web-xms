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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isNotRefFunction(func) {
  return func && (0, _isFunction2.default)(func) && !(0, _includes2.default)(func.toString(), '(_ref');
}

function migrateRouteApi(api) {
  var fetchFixedFilter = api.fetchFixedFilter,
      createDefaultBody = api.createDefaultBody;
  var newApi = (0, _merge2.default)({}, api);

  if (fetchFixedFilter) {
    console.error('route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter');
    (0, _merge2.default)(newApi, {
      fixedFilter: fetchFixedFilter
    });
  }

  if (createDefaultBody) {
    console.error('route.api.createDefaultBody is deprecated, please use route.api.defaultBody');
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
    console.warn("route.config.type 'group' is deprecated, please use 'table'");
    (0, _merge2.default)(newConfig, {
      type: 'table'
    });
  }

  if (type === 'list') {
    console.warn("route.config.type 'list' is deprecated, please use 'table'");
    (0, _merge2.default)(newConfig, {
      type: 'table'
    });
  }

  if (type === 'detail') {
    console.warn("route.config.type 'detail' is deprecated, please use 'descriptions'");
    (0, _merge2.default)(newConfig, {
      type: 'descriptions'
    });
  }

  if (schema) {
    console.warn('route.config.schema is deprecated, please use columns');
    (0, _merge2.default)(newConfig, {
      columns: schema
    });
  }

  if (table) {
    console.warn('route.config.table is deprecated, please use columns');
    (0, _merge2.default)(newConfig, {
      columns: table
    });
  }

  if (inlineWidgetType) {
    console.warn('route.config.inlineWidgetType is deprecated, please use route.config.layout');
    (0, _merge2.default)(newConfig, {
      layout: inlineWidgetType
    });
  }

  if (formPageProps) {
    console.error('route.config.formPageProps is deprecated, please use route.config.formProps');
    (0, _merge2.default)(newConfig, {
      formProps: formPageProps
    });
  }

  if (bordered) {
    console.warn('route.config.bordered is deprecated, please use route.config.descriptionsProps');
    (0, _merge2.default)(newConfig, {
      descriptionsProps: {
        bordered: bordered
      }
    });
  }

  if (defaultPageSize) {
    console.warn('route.config.defaultPageSize is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: {
        pagination: {
          defaultPageSize: defaultPageSize
        }
      }
    });
  }

  if (tableScroll) {
    console.warn('route.config.tableScroll is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: {
        tableScroll: tableScroll
      }
    });
  }

  if (tableComponentProps) {
    console.warn('route.config.tableComponentProps is deprecated, please use route.config.tableProps');
    (0, _merge2.default)(newConfig, {
      tableProps: tableComponentProps
    });
  }

  if (paginationComponentProps) {
    console.warn('route.config.paginationComponentProps is deprecated, please use route.config.tableProps');
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
  var newRoute = (0, _merge2.default)({}, route, {
    config: migrateConfig(config)
  });

  if (component && component.component) {
    console.warning('route.component.component is deprecated, please use route.component和route.models');
    (0, _merge2.default)(newRoute, _objectSpread({}, component));
  } else {
    (0, _merge2.default)(newRoute, {
      component: component
    });
  }

  if (isNotRefFunction(breadcrumb)) {
    console.error('route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })');
  }

  return newRoute;
}

function migrateColumn(column) {
  var visibility = column.visibility,
      _column$table = column.table;
  _column$table = _column$table === void 0 ? {} : _column$table;
  var defaultSortOrder = _column$table.defaultSortOrder,
      fixedSortOrder = _column$table.fixedSortOrder,
      link = _column$table.link,
      filterComponentProps = _column$table.filterComponentProps,
      format = _column$table.format,
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
    console.error('visibility is deprecated, please use invisible, creatable or editable');

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
    console.warn("Column's config.table.defaultSortOrder is deprecated, please use config.table.defaultSortDirection");
    (0, _merge2.default)(newColumn, {
      table: {
        defaultSortDirection: defaultSortOrder
      }
    });
  }

  if (fixedSortOrder) {
    console.warn("Column's config.table.fixedSortOrder is deprecated, please use config.table.fixedSortDirection");
    (0, _merge2.default)(newColumn, {
      table: {
        fixedSortDirection: fixedSortOrder
      }
    });
  }

  if (componentProps) {
    console.warn("Column's config.form.componentProps is deprecated, please use config.form.formItemComponentProps");
    (0, _merge2.default)(newColumn, {
      form: {
        formItemComponentProps: componentProps
      }
    });
  }

  if (generateInitialValue) {
    console.warn("Column's config.form.generateInitialValue is deprecated, please use config.form.normalizeInitialValue");
    (0, _merge2.default)(newColumn, {
      form: {
        normalizeInitialValue: generateInitialValue
      }
    });
  }

  if (generateSubmitValue) {
    console.error("Column's config.form.generateSubmitValue is deprecated, please use Action's config.normalize");
  }

  if (renderInFormItem) {
    console.error("Column's config.form.renderInFormItem is deprecated, please use config.form.render");
    (0, _merge2.default)(newColumn, {
      form: {
        render: renderInFormItem
      }
    });
  }

  if (radioOptions) {
    console.error("Column's config.form.radioOptions is deprecated");
  }

  if (searchPlaceholder) {
    console.error("Column's config.form.searchPlaceholder is deprecated");
  }

  if (searchRequest) {
    console.warn("Column's config.form.searchRequest is deprecated, please use config.valueOptionsSearchRequest");
    (0, _merge2.default)(newColumn, {
      valueOptionsSearchRequest: searchRequest
    });
  }

  if (filterComponentProps) {
    console.warn("Column's config.table.filterComponentProps is deprecated, please use config.table.filterFormItemComponentProps");
    (0, _merge2.default)(newColumn, {
      table: {
        filterFormItemComponentProps: filterComponentProps
      }
    });
  }

  if (format) {
    console.warn("Column's config.table.format is deprecated, please use config.format");
    (0, _merge2.default)(newColumn, {
      format: format
    });
  }

  if (isNotRefFunction(link)) {
    console.error("Column's config.table.link(record) is deprecated, please use config.table.link({ record })");
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
    console.error("Action's config.link(record) is deprecated, please use config.link({ record })");
  }

  if (componentProps) {
    console.warn("Action's config.confirm.componentProps is deprecated, please use config.confirm.confirmProps");
    (0, _merge2.default)(newAction, {
      confirm: {
        confirmProps: componentProps
      }
    });
  }

  return newAction;
}