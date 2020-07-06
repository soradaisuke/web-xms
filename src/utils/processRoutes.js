import React from 'react';
import { startsWith, isFunction, filter } from 'lodash';
import dynamic from 'dva/dynamic';
import {
  dynamicRecordsComponent,
  dynamicRecordComponent,
  dynamicRecordFormComponent
} from './dynamicComponents';
import processListConfig from './processListConfig';
import processSingleConfig from './processSingleConfig';
import { migrateRoute } from './migrate';
import processFormConfig from './processFormConfig';

function isClassComponent(component) {
  return (
    typeof component === 'function' &&
    component.prototype &&
    !!component.prototype.isReactComponent
  );
}

// Ensure compatability with transformed code
function isFunctionComponent(component) {
  return (
    typeof component === 'function' &&
    String(component).includes('return') &&
    String(component).includes('.createElement')
  );
}

function isComponent(component) {
  return isClassComponent(component) || isFunctionComponent(component);
}

function isElement(typeElement) {
  return React.isValidElement(typeElement);
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

    return (rs || []).map(r => {
      valiadateRoute(r, prefix);

      const route = migrateRoute(r, app);

      const { config = {}, path, models, inline, routes: subRoutes } = route;
      const { useFormPage, formPageConfig } = config;
      const inlineRoutes = subRoutes ? filter(subRoutes, sr => sr.inline) : [];
      let { component } = route;
      let processedConfig = {};

      if (isElement(component)) {
        throw new Error(`${path}: component can not be React.Element`);
      } else if (isComponent(component)) {
        // keep
      } else if (isFunction(component)) {
        component = dynamic({
          component,
          models,
          app
        });
      }

      if (config.type === 'table') {
        processedConfig = processListConfig({
          config,
          path,
          formPageConfig,
          useFormPage
        });
        component = dynamicRecordsComponent({
          app,
          component,
          inline,
          config: processedConfig
        });
      } else if (
        !!component ||
        inlineRoutes.length > 0 ||
        config.type === 'descriptions'
      ) {
        processedConfig = processSingleConfig({ config, path });
        component = dynamicRecordComponent({
          app,
          component,
          config: processedConfig
        });
      } else if (config.type === 'form') {
        component = dynamicRecordFormComponent({
          app,
          config: processFormConfig({ config, path })
        });
      }

      if (useFormPage) {
        const formPageRoute = {
          breadcrumb: ({ id }) => (id === 'new' ? '新建' : '编辑'),
          path: `${path}/:id/edit`,
          config: {
            ...processedConfig.formPageConfig,
            type: 'form'
          }
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
        routes: processRoutesInternal(route.routes, route.path)
      };
    });
  }

  return processRoutesInternal(routes);
}
