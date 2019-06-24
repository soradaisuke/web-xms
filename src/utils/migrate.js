export function migrateApi({ login, other } = {}) {
  if (login) {
    console.error('api.login is deprecated, use api.auth');
  }
  return {
    auth: login,
    ...other
  };
}

export function migrateRoute() {}
