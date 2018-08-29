import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { merge } from 'lodash';
import { message } from 'antd';
import request from './services/request';
import processRoutes from './utils/processRoutes';
import generateUserModel from './utils/generateUserModel';
import defaultConfig from './defaultConfig';
import router from './router';

export default function xms(config = {}) {
  const app = dva({
    history: createHistory(),
    onError(err) {
      err.preventDefault();
      message.error(err.message);
    },
  });

  app.config = merge(defaultConfig, config);
  const { routes, api: { host, login } = {} } = config;
  if (host) {
    request.setHost(host);
  }

  app.routes = processRoutes({ app, routes });
  app.router(router);

  app.model(generateUserModel(login));

  return app;
}
