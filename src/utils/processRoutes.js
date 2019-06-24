import React from 'react';
import { startsWith, isFunction } from 'lodash';
import dynamic from 'dva/dynamic';
import dynamicRecordsComponent from './dynamicRecordsComponent';
import dynamicRecordComponent from './dynamicRecordComponent';
import processGroupConfig from './processGroupConfig';
import processSingleConfig from './processSingleConfig';
import { migrateRoute } from './migrate';

const FUNCTION_REGEX = /react(\d+)?./i;

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
    !!String(component).match(FUNCTION_REGEX) &&
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

      const { config = {}, path, models } = route;
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
