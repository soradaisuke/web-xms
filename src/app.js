import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { forEach, isFunction, merge } from 'lodash';
import valiadateRoute from './utils/valiadateRoute';
import defaultConfig from './defaultConfig';
import router from './router';

export default function xms(config) {
  const app = dva({
    history: createHistory(),
    onError() {},
  });

  app.config = merge(defaultConfig, config);

  app.routes = (data) => {
    const routes = isFunction(data) ? data(app) : data;
    forEach(routes, route => valiadateRoute(route));
    app.routes = routes;
  };

  app.router(router);

  return app;
}

