import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { forEach, isFunction } from 'lodash';
import valiadateRoute from './utils/valiadateRoute';
import router from './router';
import './app.less';

const app = dva({
  history: createHistory(),
  onError() {},
});

app.routes = (data) => {
  const routes = isFunction(data) ? data(app) : data;
  forEach(routes, route => valiadateRoute(route));
  app.routes = routes;
};

app.router(router);

export default app;

