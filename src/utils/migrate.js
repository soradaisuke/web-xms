export function migrateApi({ login, ...other } = {}) {
  if (login) {
    console.error('api.logint is deprecated, please use api.auth');
  }
  return {
    auth: login,
    ...other
  };
}

export function migrateRoute({ component, ...other } = {}) {
  if (component && component.component) {
    console.error(
      'route.component.component is deprecated, please use route.component和route.models'
    );
    return { ...component, ...other };
  }

  return { component, ...other };
}
