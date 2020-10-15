import { includes, isFunction, merge } from 'lodash';

function isNotRefFunction(func) {
  return func && isFunction(func) && !includes(func.toString(), '(_ref');
}

export function migrateRouteApi(api = {}) {
  const { fetchFixedFilter, createDefaultBody } = api;
  const newApi = merge({}, api);

  if (fetchFixedFilter) {
    console.error(
      'route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter'
    );
    merge(newApi, { fixedFilter: fetchFixedFilter });
  }

  if (createDefaultBody) {
    console.error(
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
    console.warn("route.config.type 'group' is deprecated, please use 'table'");
    merge(newConfig, { type: 'table' });
  }

  if (type === 'list') {
    console.warn("route.config.type 'list' is deprecated, please use 'table'");
    merge(newConfig, { type: 'table' });
  }

  if (type === 'detail') {
    console.warn(
      "route.config.type 'detail' is deprecated, please use 'descriptions'"
    );
    merge(newConfig, { type: 'descriptions' });
  }

  if (schema) {
    console.warn('route.config.schema is deprecated, please use columns');
    merge(newConfig, { columns: schema });
  }
  if (table) {
    console.warn('route.config.table is deprecated, please use columns');
    merge(newConfig, { columns: table });
  }

  if (inlineWidgetType) {
    console.warn(
      'route.config.inlineWidgetType is deprecated, please use route.config.layout'
    );
    merge(newConfig, { layout: inlineWidgetType });
  }

  if (formPageProps) {
    console.error(
      'route.config.formPageProps is deprecated, please use route.config.formProps'
    );
    merge(newConfig, { formProps: formPageProps });
  }

  if (bordered) {
    console.warn(
      'route.config.bordered is deprecated, please use route.config.descriptionsProps'
    );
    merge(newConfig, { descriptionsProps: { bordered } });
  }

  if (defaultPageSize) {
    console.warn(
      'route.config.defaultPageSize is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: { pagination: { defaultPageSize } } });
  }

  if (tableScroll) {
    console.warn(
      'route.config.tableScroll is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: { tableScroll } });
  }

  if (tableComponentProps) {
    console.warn(
      'route.config.tableComponentProps is deprecated, please use route.config.tableProps'
    );
    merge(newConfig, { tableProps: tableComponentProps });
  }

  if (paginationComponentProps) {
    console.warn(
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
    console.warning(
      'route.component.component is deprecated, please use route.component和route.models'
    );
    merge(newRoute, { ...component });
  } else {
    merge(newRoute, { component });
  }

  if (isNotRefFunction(breadcrumb)) {
    console.error(
      'route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })'
    );
  }

  return newRoute;
}

export function migrateColumn(column) {
  const {
    visibility,
    table: {
      defaultSortOrder,
      fixedSortOrder,
      link,
      filterComponentProps,
      format,
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
    console.error(
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
    console.warn(
      "Column's config.table.defaultSortOrder is deprecated, please use config.table.defaultSortDirection"
    );
    merge(newColumn, {
      table: {
        defaultSortDirection: defaultSortOrder,
      },
    });
  }
  if (fixedSortOrder) {
    console.warn(
      "Column's config.table.fixedSortOrder is deprecated, please use config.table.fixedSortDirection"
    );
    merge(newColumn, {
      table: {
        fixedSortDirection: fixedSortOrder,
      },
    });
  }
  if (componentProps) {
    console.warn(
      "Column's config.form.componentProps is deprecated, please use config.form.formItemComponentProps"
    );
    merge(newColumn, {
      form: {
        formItemComponentProps: componentProps,
      },
    });
  }
  if (generateInitialValue) {
    console.warn(
      "Column's config.form.generateInitialValue is deprecated, please use config.form.normalizeInitialValue"
    );
    merge(newColumn, {
      form: {
        normalizeInitialValue: generateInitialValue,
      },
    });
  }
  if (generateSubmitValue) {
    console.error(
      "Column's config.form.generateSubmitValue is deprecated, please use Action's config.normalize"
    );
  }
  if (renderInFormItem) {
    console.error(
      "Column's config.form.renderInFormItem is deprecated, please use config.form.render"
    );
    merge(newColumn, {
      form: {
        render: renderInFormItem,
      },
    });
  }
  if (radioOptions) {
    console.error("Column's config.form.radioOptions is deprecated");
  }
  if (searchPlaceholder) {
    console.error("Column's config.form.searchPlaceholder is deprecated");
  }
  if (searchRequest) {
    console.warn(
      "Column's config.form.searchRequest is deprecated, please use config.valueOptionsSearchRequest"
    );
    merge(newColumn, {
      valueOptionsSearchRequest: searchRequest,
    });
  }
  if (filterComponentProps) {
    console.warn(
      "Column's config.table.filterComponentProps is deprecated, please use config.table.filterFormItemComponentProps"
    );
    merge(newColumn, {
      table: {
        filterFormItemComponentProps: filterComponentProps,
      },
    });
  }
  if (format) {
    console.warn(
      "Column's config.table.format is deprecated, please use config.format"
    );
    merge(newColumn, {
      format,
    });
  }
  if (isNotRefFunction(link)) {
    console.error(
      "Column's config.table.link(record) is deprecated, please use config.table.link({ record })"
    );
  }

  return newColumn;
}

export function migrateAction(action) {
  const { link, confirm: { componentProps } = {} } = action;
  const newAction = merge({}, action);

  if (isNotRefFunction(link)) {
    console.error(
      "Action's config.link(record) is deprecated, please use config.link({ record })"
    );
  }
  if (componentProps) {
    console.warn(
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
