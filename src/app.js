import dva from 'dva';
import createLoading from 'dva-loading';
import { merge } from 'lodash';
import { message } from 'antd';
import history from './utils/history';
import request from './services/request';
import processRoutes from './utils/processRoutes';
import generateUserModel from './utils/generateUserModel';
import defaultConfig from './defaultConfig';
import router from './router';
import audio from './models/audio';
import loginRoute from './routes/login';

export default function xms(config = {}) {
  const app = dva({
    history,
    onError(err) {
      console.error(err.message);
      message.error(err.message);
    }
  });

  app.use(createLoading());

  app.config = merge(defaultConfig, config);
  const { routes = [], api = {} } = config;
  const { host = window.location.host, auth, login } = api;
  if (host) {
    request.setHost(host);
  }
  if (login) {
    routes.push(loginRoute);
  }
  try {
    if (auth) {
      if (window.location.host.indexOf('qingtingfm.com') === -1) {
        throw new Error('域名必须是*.qingtingfm.com');
      }
      app.model(generateUserModel(auth, login));
    }
    app.model(audio);
    app.routes = processRoutes({ app, routes });
    app.router(router);
  } catch (err) {
    console.error(err);
    message.error(err.message);
  }

  const appStart = app.start;
  app.start = function start() {
    appStart('#root');
  };

  return app;
}
