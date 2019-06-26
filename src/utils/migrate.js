export function migrateApi({ login, ...other } = {}) {
  if (login) {
    console.error('api.logint is deprecated, please use api.auth');
  }
  return {
    auth: login,
    ...other
  };
}

export function migrateRouteApi({ defaultFilter, ...other } = {}) {
  let newApi = {};

  if (defaultFilter) {
    console.error(
      'route.api.defaultFilter is deprecated, please use route.api.fetchFixedFilter'
    );
    newApi = { fetchFixedFilter: defaultFilter };
  }

  return { ...newApi, ...other };
}

export function migrateConfig({ type, api, schema, ...other } = {}) {
  let newType = type;
  if (type === 'group') {
    console.error("route.config.type 'group' is deprecated, please use 'list'");
    newType = 'list';
  }
  if (schema) {
    console.error('route.config.schema is deprecated, please use table');
  }

  return { type: newType, api: migrateRouteApi(api), table: schema, ...other };
}

export function migrateRoute({ component, config, ...other } = {}) {
  let newRoute;
  if (component && component.component) {
    console.error(
      'route.component.component is deprecated, please use route.component和route.models'
    );
    newRoute = { ...component };
  } else {
    newRoute = { component };
  }

  const newConfig = migrateConfig(config);

  if (newConfig && newConfig.inlineWidgetType) {
    console.error(
      'route.config.inlineWidgetType is deprecated, please use route.inlineLayout'
    );
    newRoute = { ...newRoute, inlineLayout: newConfig.inlineWidgetType };
  }

  newRoute = { config: newConfig, ...newRoute, ...other };

  return newRoute;
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
        editable: true
      };
    } else if (visibility === 'table') {
      // keep
    } else if (visibility === 'modal') {
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

  return { ...newColumn, ...other };
}
