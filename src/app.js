import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { forEach } from 'lodash';
import valiadateRoute from './utils/valiadateRoute';
import './app.less';

const app = dva({
  history: createHistory(),
  onError() {},
});

app.routes = (routes) => {
  forEach(routes, route => valiadateRoute(route));
  app.routes = routes;
};

export default app;

