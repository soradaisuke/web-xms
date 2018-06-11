import { forEach, startsWith, split } from 'lodash';

/*
{
  path: required, the route path, must start with '/' and not be nested such as '/users/programs'
  title: required, displayed in nav menu or breadcrumb
  icon: required for primary route, displayed in nav menu
  component: required if no child routes, must be dynamic component
  routes: optional, child routes
}
*/

export default function valiadateRoute({
  path, title, icon, component, routes,
}, level = 0) {
  if (!path) {
    throw new Error('route: path is required');
  }
  if (!startsWith(path, '/')) {
    throw new Error(`route ${path} : path must start with /`);
  }
  if (split(path, '/').length > 2) {
    throw new Error(`route ${path} : path must not be nested`);
  }
  if (!title) {
    throw new Error(`route ${path} : title is required`);
  }
  if (level === 0 && !icon) {
    throw new Error(`route ${path} : icon is required`);
  }
  if (!component && (!routes || routes.length === 0)) {
    throw new Error(`route ${path} : component or routes is required`);
  }

  forEach(routes, route => valiadateRoute(route, level + 1));

  return true;
}
