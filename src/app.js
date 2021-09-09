import dva from 'dva';
import createLoading from 'dva-loading';
import { merge } from 'lodash';
import history from './utils/history';
import request from './services/request';
import processRoutes from './utils/processRoutes';
import generateUserModel from './utils/generateUserModel';
import defaultConfig from './defaultConfig';
import routerConfig from './router';
import audio from './models/audio';
import loginRoute from './routes/login';
import showError from './utils/showError';

export default function xms(config = {}) {
  const app = dva({
    history,
    onError(err) {
      console.log(err.message);
    },
  });

  app.use(createLoading());

  app.config = merge(defaultConfig, config);
  const { routes = [], api = {} } = config;
  const { host = window.location.host, auth, login, logout } = api;
  if (host) {
    request.setHost(host);
  }
  if (login) {
    routes.push(loginRoute);
  }
  try {
    if (auth) {
      if (window.location.host.indexOf('qingtingfm.com') === -1 && !login) {
        throw new Error('域名必须是*.qingtingfm.com');
      }
      if (window.location.host.indexOf('qingting.fm') === -1 && login) {
        throw new Error('域名必须是*.qingting.fm');
      }
      if (window.location.host.indexOf('qtfm.cn') === -1 && login) {
        throw new Error('域名必须是*.qtfm.cn');
      }
      app.model(generateUserModel({ auth, login, logout }));
    }
    app.model(audio);
    app.routes = processRoutes({ app, routes });
    app.router(routerConfig);
  } catch (err) {
    showError(err.message);
  }

  const appStart = app.start;
  app.start = function start() {
    appStart('#root');
  };

  return app;
}
