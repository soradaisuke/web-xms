import { startsWith, isPlainObject, isFunction } from 'lodash';
import dynamic from 'dva/dynamic';
import dynamicRecordsComponent from './dynamicRecordsComponent';
import dynamicRecordComponent from './dynamicRecordComponent';
import processGroupConfig from './processGroupConfig';
import processSingleConfig from './processSingleConfig';

function valiadateRoute({ path }, prefix = '/') {
  if (!path) {
    throw new Error(`父页面path为${prefix}的route缺少path属性`);
  }
  if (!startsWith(path, prefix)) {
    throw new Error(`path为${path}的页面必须以${prefix}开头`);
  }
}

export default function processRoutes({ app, routes }) {
  function processRoutesInternal(rs, prefix = '/') {
    if (!rs) {
      return rs;
    }

    return (rs || []).map(route => {
      valiadateRoute(route, prefix);

      const { config = {}, path } = route;
      let { component } = route;

      if (
        !isFunction(component) &&
        !(isPlainObject(component) && isFunction(component.component))
      ) {
        console.error(
          `${path}: component的类型必须是() => ReactElement或{ models: [() => import(DvaModel)], component: () => import(ReactComponent) }`
        );
      }

      if (isPlainObject(component)) {
        component = dynamic({
          ...component,
          app
        });
      }

      if (config.type === 'group') {
        component = dynamicRecordsComponent({
          app,
          component,
          config: processGroupConfig({ config, path })
        });
      } else {
        component = dynamicRecordComponent({
          app,
          component,
          config: processSingleConfig({ config, path })
        });
      }

      return {
        ...route,
        component,
        routes: processRoutesInternal(route.routes, route.path)
      };
    });
  }

  return processRoutesInternal(routes);
}
