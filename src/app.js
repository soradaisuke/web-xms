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
      message.error(err.message);
    },
  });

  app.config = merge(defaultConfig, config);
  const { routes, api: { host, login } = {} } = config;
  if (host) {
    request.setHost(host);
  }
  try {
    if (login) {
      if (window.location.host.indexOf('qingtingfm.com') === -1) {
        throw new Error('域名必须是*.qingtingfm.com');
      }
      app.model(generateUserModel(login));
    }
    app.routes = processRoutes({ app, routes });
    app.router(router);
  } catch (err) {
    message.error(err.message);
  }

  const appStart = app.start;
  app.start = function start() {
    appStart('#root');
  };

  return app;
}
