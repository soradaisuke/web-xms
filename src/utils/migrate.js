export function migrateApi({ login, ...other } = {}) {
  if (login) {
    console.error('api.logint is deprecated, please use api.auth');
  }
  return {
    auth: login,
    ...other
  };
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

  if (config && config.inlineWidgetType) {
    console.error(
      'route.config.inlineWidgetType is deprecated, please use route.inlineLayout'
    );
    newRoute = { ...newRoute, inlineLayout: config.inlineWidgetType };
  }

  newRoute = { ...newRoute, ...other };

  return newRoute;
}
