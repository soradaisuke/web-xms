import { isProduction, isStaging } from '@qt/env';
import { filter, includes, isFunction, map, merge } from 'lodash';

function deprecatedError(message) {
  if (!isStaging && !isProduction) {
    console.error(message);
  }
}

function deprecatedWarn(message) {
  if (!isStaging && !isProduction) {
    console.warn(message);
  }
}

function isNotRefFunction(func) {
  if (func && isFunction(func)) {
    if (func.length === 0) {
      return false;
    }
    const str = func.toString();
    return (
      (!includes(str, '(_ref') && !includes(str, 'arguments[0]')) ||
      func.length > 1
    );
  }
  return false;
}

export function migrateRouteApi(api = {}) {
  const { fetchFixedFilter, createDefaultBody } = api;
  const newApi = merge({}, api);

  if (fetchFixedFilter) {
    deprecatedError(
      'route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter'
    );
    merge(newApi, { fixedFilter: fetchFixedFilter });
  }

  if (createDefaultBody) {
    deprecatedError(
      'route.api.createDefaultBody is deprecated, please use route.api.defaultBody'
    );
    merge(newApi, { defaultBody: createDefaultBody });
  }

  return newApi;
}

export function migrateConfig(config) {
  const {
    type,
    api,
    schema,
    table,
    inlineWidgetType,
    formPageProps,
    bordered,
    defaultPageSize,
    tableScroll,
    tableComponentProps,
    paginationComponentProps,
  } = config;
  const newConfig = merge({}, config, { api: migrateRouteApi(api) });

  if (type === 'group') {
    deprecatedWarn("route.config.type 'group' is deprecated, please use 'table'");
    merge(newConfig, { type: 'table' });
  }

  if (type === 'list') {
    deprecatedWarn("route.config.type 'list' is deprecated, please use 'table'");
    merge(newConfig, { type: 'table' });
  }

  if (type === 'detail') {
    deprecatedWarn(
      "route.config.type 'detail' is deprecated, please use 'descriptions'"
    );
    merge(newConfig, { type: 'descriptions' });
  }

  if (schema) {
    deprecatedWarn('route.config.schema is deprecated, please use columns');
    merge(newConfig, { columns: schema });
  }
  if (table && type !== 'form') {
    deprecatedWarn('route.config.table is deprecated, please use columns');
    merge(newConfig, { columns: table });
  }

  if (inlineWidgetType) {
    deprecatedWarn(
      'route.config.inlineWidgetType is deprecated, please use route.config.layout'
    );
    merge(newConfig, { layout: inlineWidgetType });
  }

  if (formPageProps) {
    deprecatedError(
      'route.config.formPageProps is deprecated, please use route.config.formProps'
    );
    merge(newConfig, { formProps: formPageProps });
  }

  if (bordered) {
    deprecatedWarn(
      'route.config.bordered is deprecated, please use route.config.descriptionsProps'
    );
    merge(newConfig, { descriptionsProps: { bordered } });
  }

  if (defaultPageSize) {
    deprecatedWarn(
      'route.config.defaultPageSize is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: { pagination: { defaultPageSize } } });
  }

  if (tableScroll) {
    deprecatedWarn(
      'route.config.tableScroll is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: { tableScroll } });
  }

  if (tableComponentProps) {
    deprecatedWarn(
      'route.config.tableComponentProps is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: tableComponentProps });
  }

  if (paginationComponentProps) {
    deprecatedWarn(
      'route.config.paginationComponentProps is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: { pagination: paginationComponentProps } });
  }

  return newConfig;
}

export function migrateRoute(route) {
  const { component, breadcrumb, config } = route;
  const newRoute = merge({}, route);

  if (config) {
    merge(newRoute, { config: migrateConfig(config) });
  }

  if (component && component.component) {
    deprecatedWarn(
      'route.component.component is deprecated, please use route.component和route.models'
    );
    merge(newRoute, { ...component });
  } else {
    merge(newRoute, { component });
  }

  if (isNotRefFunction(breadcrumb)) {
    deprecatedError(
      'route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })'
    );
  }

  return newRoute;
}

export function migrateColumn(column) {
  const {
    visibility,
    valueOptions,
    table: {
      defaultSortOrder,
      fixedSortOrder,
      link,
      filterComponentProps,
      format,
      filterMultiple,
    } = {},
    form: {
      componentProps,
      generateInitialValue,
      generateSubmitValue,
      renderInFormItem,
      radioOptions,
      searchPlaceholder,
      searchRequest,
    } = {},
  } = column;
  const newColumn = merge({}, column);

  if (visibility) {
    deprecatedError(
      'visibility is deprecated, please use invisible, creatable or editable'
    );

    if (visibility === 'all' || visibility === true) {
      merge(newColumn, {
        form: {
          creatable: true,
          editable: true,
        },
      });
    } else if (visibility === 'table') {
      // keep
    } else if (visibility === 'modal') {
      merge(newColumn, {
        table: {
          invisible: true,
        },
        form: {
          creatable: true,
          editable: true,
        },
      });
    } else if (visibility === 'edit') {
      merge(newColumn, {
        table: {
          invisible: true,
        },
        form: {
          editable: true,
        },
      });
    } else {
      merge(newColumn, {
        table: {
          invisible: !visibility.table,
        },
        form: {
          creatable: visibility.create,
          editable: newColumn.editable,
        },
      });
    }
  }

  if (defaultSortOrder) {
    deprecatedWarn(
      "Column's config.table.defaultSortOrder is deprecated, please use config.table.defaultSortDirection"
    );
    merge(newColumn, {
      table: {
        defaultSortDirection: defaultSortOrder,
      },
    });
  }
  if (fixedSortOrder) {
    deprecatedWarn(
      "Column's config.table.fixedSortOrder is deprecated, please use config.table.fixedSortDirection"
    );
    merge(newColumn, {
      table: {
        fixedSortDirection: fixedSortOrder,
      },
    });
  }
  if (componentProps) {
    deprecatedWarn(
      "Column's config.form.componentProps is deprecated, please use config.form.formItemComponentProps"
    );
    merge(newColumn, {
      form: {
        formItemComponentProps: componentProps,
      },
    });
  }
  if (generateInitialValue) {
    deprecatedWarn(
      "Column's config.form.generateInitialValue is deprecated, please use config.form.normalizeInitialValue"
    );
    merge(newColumn, {
      form: {
        normalizeInitialValue: generateInitialValue,
      },
    });
  }
  if (generateSubmitValue) {
    deprecatedError(
      "Column's config.form.generateSubmitValue is deprecated, please use Action's config.normalize"
    );
  }
  if (renderInFormItem) {
    deprecatedError(
      "Column's config.form.renderInFormItem is deprecated, please use config.form.render"
    );
    merge(newColumn, {
      form: {
        render: renderInFormItem,
      },
    });
  }
  if (radioOptions) {
    deprecatedError("Column's config.form.radioOptions is deprecated");
  }
  if (searchPlaceholder) {
    deprecatedError("Column's config.form.searchPlaceholder is deprecated");
  }
  if (searchRequest) {
    deprecatedWarn(
      "Column's config.form.searchRequest is deprecated, please use config.valueOptionsSearchRequest"
    );
    merge(newColumn, {
      valueOptionsSearchRequest: searchRequest,
    });
  }
  if (filterComponentProps) {
    deprecatedWarn(
      "Column's config.table.filterComponentProps is deprecated, please use config.table.filterFormItemComponentProps"
    );
    merge(newColumn, {
      table: {
        filterFormItemComponentProps: filterComponentProps,
      },
    });
  }
  if (format) {
    deprecatedWarn(
      "Column's config.table.format is deprecated, please use config.format"
    );
    merge(newColumn, {
      format,
    });
  }
  if (isNotRefFunction(link)) {
    deprecatedError(
      "Column's config.table.link(record) is deprecated, please use config.table.link({ record })"
    );
  }

  if (valueOptions?.length > 0) {
    const defaultOptions = map(
      filter(valueOptions, { default: true }),
      ({ value }) => value
    );
    if (defaultOptions.length > 0) {
      deprecatedWarn(
        "Column's valueOption.default is deprecated, please use config.table.filterDefault"
      );
      merge(newColumn, {
        table: {
          filterDefault: filterMultiple ? defaultOptions : defaultOptions[0],
        },
      });
    }
  }

  return newColumn;
}

export function migrateAction(action) {
  const { link, confirm: { componentProps } = {} } = action;
  const newAction = merge({}, action);

  if (isNotRefFunction(link)) {
    deprecatedError(
      "Action's config.link(record) is deprecated, please use config.link({ record })"
    );
  }
  if (componentProps) {
    deprecatedWarn(
      "Action's config.confirm.componentProps is deprecated, please use config.confirm.confirmProps"
    );
    merge(newAction, {
      confirm: {
        confirmProps: componentProps,
      },
    });
  }

  return newAction;
}
