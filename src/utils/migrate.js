import { includes, isFunction } from 'lodash';

export function migrateRouteApi({
  fetchFixedFilter,
  createDefaultBody,
  ...other
} = {}) {
  let newApi = {};

  if (fetchFixedFilter) {
    console.error(
      'route.api.fetchFixedFilter is deprecated, please use route.api.fixedFilter'
    );
    newApi = { fixedFilter: fetchFixedFilter };
  }

  if (createDefaultBody) {
    console.error(
      'route.api.createDefaultBody is deprecated, please use route.api.defaultBody'
    );
    newApi = { ...newApi, defaultBody: createDefaultBody };
  }

  return { ...newApi, ...other };
}

export function migrateConfig({
  type,
  api,
  schema,
  table,
  inlineWidgetType,
  formPageProps,
  bordered,
  descriptionsProps,
  tableProps: { pagination, ...tableProps } = {},
  defaultPageSize,
  tableScroll,
  tableComponentProps,
  paginationComponentProps,
  ...other
} = {}) {
  let newType = type;
  if (type === 'group') {
    console.warn("route.config.type 'group' is deprecated, please use 'table'");
    newType = 'table';
  }
  if (type === 'list') {
    console.warn("route.config.type 'list' is deprecated, please use 'table'");
    newType = 'table';
  }
  if (type === 'detail') {
    console.warn(
      "route.config.type 'detail' is deprecated, please use 'descriptions'"
    );
    newType = 'descriptions';
  }
  if (schema) {
    console.warn('route.config.schema is deprecated, please use columns');
  }
  if (table) {
    console.warn('route.config.table is deprecated, please use columns');
  }

  if (inlineWidgetType) {
    console.warn(
      'route.config.inlineWidgetType is deprecated, please use route.config.layout'
    );
  }

  if (formPageProps) {
    console.error(
      'route.config.formPageProps is deprecated, please use route.config.formProps'
    );
  }

  if (bordered) {
    console.warn(
      'route.config.bordered is deprecated, please use route.config.descriptionsProps'
    );
  }

  if (defaultPageSize) {
    console.warn(
      'route.config.defaultPageSize is deprecated, please use route.config.tableProps'
    );
  }

  if (tableScroll) {
    console.warn(
      'route.config.tableScroll is deprecated, please use route.config.tableProps'
    );
  }

  if (tableComponentProps) {
    console.warn(
      'route.config.tableComponentProps is deprecated, please use route.config.tableProps'
    );
  }

  if (paginationComponentProps) {
    console.warn(
      'route.config.paginationComponentProps is deprecated, please use route.config.tableProps'
    );
  }

  return {
    api: migrateRouteApi(api),
    type: newType,
    columns: schema || table,
    layout: inlineWidgetType,
    formProps: formPageProps,
    descriptionsProps: {
      bordered,
      ...(descriptionsProps ?? {}),
    },
    tableProps: {
      pagination: {
        defaultPageSize: defaultPageSize ?? 10,
        ...(pagination ?? {}),
        ...(paginationComponentProps ?? {}),
      },
      tableScroll,
      ...(tableProps ?? {}),
      ...(tableComponentProps ?? {}),
    },
    ...other,
  };
}

export function migrateRoute({ component, breadcrumb, config, ...other } = {}) {
  let newRoute;
  if (component && component.component) {
    console.warning(
      'route.component.component is deprecated, please use route.component和route.models'
    );
    newRoute = { ...component };
  } else {
    newRoute = { component };
  }

  if (
    breadcrumb &&
    isFunction(breadcrumb) &&
    !includes(breadcrumb.toString(), '(_ref')
  ) {
    console.error(
      'route.breadcrumb(matchParams) is deprecated, please use route.breadcrumb({ matchParams })'
    );
  }

  return { config: migrateConfig(config), ...newRoute, breadcrumb, ...other };
}

export function migrateColumn({ visibility, ...other }) {
  let newColumn = {};

  if (visibility) {
    console.error(
      'visibility is deprecated, please use invisible, creatable or editable'
    );

    if (visibility === 'all' || visibility === true) {
      newColumn = {
        creatable: true,
        editable: true,
      };
    } else if (visibility === 'table') {
      // keep
    } else if (visibility === 'modal') {
      newColumn = {
        invisible: true,
        creatable: true,
        editable: true,
      };
    } else if (visibility === 'edit') {
      newColumn = {
        invisible: true,
        editable: true,
      };
    } else {
      newColumn = {
        invisible: !visibility.table,
        creatable: visibility.create,
        editable: newColumn.editable,
      };
    }
  }

  return { ...newColumn, ...other };
}
