import { startsWith, isPlainObject } from 'lodash';
import dynamic from 'dva/dynamic';
import dynamicRecordsComponent from './dynamicRecordsComponent';
import dynamicRecordComponent from './dynamicRecordComponent';
import processGroupConfig from './processGroupConfig';
import processSingleConfig from './processSingleConfig';

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

      if (isPlainObject(component)) {
        component = dynamic({
          ...component,
          app,
        });
      }

      if (config) {
        if (config.type === 'group') {
          component = dynamicRecordsComponent({
            app,
            component,
            config: processGroupConfig({ config, path }),
          });
        } else {
          component = dynamicRecordComponent({
            app,
            component,
            config: processSingleConfig({ config, path }),
          });
        }
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
