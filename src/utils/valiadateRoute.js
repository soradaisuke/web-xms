import { forEach, startsWith } from 'lodash';

export default function valiadateRoute({ path, component, routes }, level = 0) {
  if (!path) {
    throw new Error('route: path is required');
  }
  if (!startsWith(path, '/')) {
    throw new Error(`route ${path} : path must start with /`);
  }
  if (!component && (!routes || routes.length === 0)) {
    throw new Error(`route ${path} : component or routes is required`);
  }

  forEach(routes, route => valiadateRoute(route, level + 1));

  return true;
}
