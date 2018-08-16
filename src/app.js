import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { merge } from 'lodash';
import processRoutes from './utils/processRoutes';
import defaultConfig from './defaultConfig';
import router from './router';

export default function xms(config = {}) {
  const app = dva({
    history: createHistory(),
    onError() {},
  });

  app.config = merge(defaultConfig, config);

  const { routes } = config;

  app.routes = processRoutes({ app, routes });

  app.router(router);

  return app;
}
