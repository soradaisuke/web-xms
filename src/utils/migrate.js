export function migrateApi({ login, ...other } = {}) {
  if (login) {
    console.error('api.logint is deprecated, please use api.auth');
  }
  return {
    auth: login,
    ...other
  };
}

export function migrateConfig({ type, ...other } = {}) {
  let newType = type;
  if (type === 'group') {
    console.error("route.config.type 'group' is deprecated, please use 'list'");
    newType = 'list';
  }

  return { type: newType, ...other };
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
