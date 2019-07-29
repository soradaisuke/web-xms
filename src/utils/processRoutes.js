import React from 'react';
import { startsWith, isFunction } from 'lodash';
import dynamic from 'dva/dynamic';
import dynamicRecordsComponent from './dynamicRecordsComponent';
import dynamicRecordComponent from './dynamicRecordComponent';
import processListConfig from './processListConfig';
import processSingleConfig from './processSingleConfig';
import { migrateRoute } from './migrate';

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

      const { config = {}, path, models, inline } = route;
      let { component } = route;

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

      if (config.type === 'list') {
        component = dynamicRecordsComponent({
          app,
          component,
          inline,
          config: processListConfig({ config, path })
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
