import React from 'react';
import { startsWith, isFunction, filter, uniqueId } from 'lodash';
import { isElement } from 'react-is';
import { dynamic } from 'dva';
import {
  dynamicRecordsComponent,
  dynamicRecordComponent,
  dynamicRecordFormComponent,
} from './dynamicComponents';
import processListConfig from './processListConfig';
import processSingleConfig from './processSingleConfig';
import { migrateRoute } from './migrate';
import processFormConfig from './processFormConfig';

function isDynamicComponent(component) {
  return isFunction(component) && String(component).includes('import');
}

function valiadateRoute({ path }, prefix = '/') {
  if (!path) {
    throw new Error(`${prefix}: path is required`);
  }
  if (!startsWith(path, prefix)) {
    throw new Error(`${path}: path must start with ${prefix}`);
  }
}

export default function processRoutes({ app, routes }) {
  function processRoutesInternal(rs, prefix = '/') {
    if (!rs) {
      return rs;
    }

    return (rs || []).map((r) => {
      valiadateRoute(r, prefix);

      const route = migrateRoute(r, app);

      const { config = {}, path, models, inline, routes: subRoutes } = route;
      const { useFormPage } = config;
      const inlineRoutes = subRoutes
        ? filter(subRoutes, (sr) => sr.inline)
        : [];
      let { component } = route;
      let processedConfig = {};

      if (isElement(component)) {
        const c = component;
        component = function NewComponent() {
          return <>{c}</>;
        };
      } else if (isDynamicComponent(component)) {
        component = dynamic({
          component,
          models,
          app,
        });
      }

      if (config.type === 'table') {
        processedConfig = processListConfig({
          config,
          path,
          prefix,
          inline,
          useFormPage,
        });
        component = dynamicRecordsComponent({
          app,
          component,
          inline,
          config: processedConfig,
        });
      } else if (inlineRoutes.length > 0 || config.type === 'descriptions') {
        processedConfig = processSingleConfig({ config, path });
        component = dynamicRecordComponent({
          app,
          component,
          inline,
          config: processedConfig,
        });
      } else if (config.type === 'form') {
        component = dynamicRecordFormComponent({
          app,
          inline,
          config: processFormConfig({ config, path }),
        });
      }

      if (useFormPage) {
        const idIdentifier = uniqueId('_id');
        const formPageRoute = {
          breadcrumb: ({ id }) => (id === 'new' ? '新建' : '编辑'),
          path: `${path}/:${idIdentifier}/edit`,
          config: {
            ...processedConfig,
            idIdentifier,
            type: 'form',
          },
        };
        if (!route.routes) {
          route.routes = [formPageRoute];
        } else {
          route.routes.push(formPageRoute);
        }
      }

      return {
        ...route,
        component,
        namespace: processedConfig.namespace,
        routes: processRoutesInternal(route.routes, route.path),
      };
    });
  }

  return processRoutesInternal(routes);
}
