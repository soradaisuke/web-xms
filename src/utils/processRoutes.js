import { startsWith } from 'lodash';
import dynamicRecordsComponent from './dynamicRecordsComponent';

function valiadateRoute({
  path, component, config, routes,
}, prefix = '/') {
  if (!path) {
    throw new Error('valiadateRoute: path is required');
  }
  if (!startsWith(path, prefix)) {
    throw new Error(`valiadateRoute: path ${path} must start with ${prefix}`);
  }
  if (!component && !config && (!routes || routes.length === 0)) {
    throw new Error(`valiadateRoute: path ${path} must have component or config or routes`);
  }
  if (component && config) {
    throw new Error(`valiadateRoute: path ${path} must have only component or config`);
  }
}

export default function processRoutes({ app, routes }) {
  function processRoutesInternal(rs, prefix = '/') {
    if (!rs) {
      return rs;
    }

    return (rs || []).map((route) => {
      valiadateRoute(route, prefix);

      const { config, path } = route;
      let { component } = route;

      if (config) {
        component = dynamicRecordsComponent({
          app,
          config: {
            ...config, namespace: path.replace(/\//g, '@'),
          },
        });
      }

      return {
        ...route,
        component,
        routes: processRoutesInternal(route.routes, route.path),
      };
    });
  }

  return processRoutesInternal(routes);
}
