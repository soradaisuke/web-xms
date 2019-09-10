import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { filter, find, map, forEach } from 'lodash';
import { Layout, Spin, ConfigProvider, BackTop } from 'antd';
import { connect } from 'dva';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Menu from './components/Menu';
import User from './components/User';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import 'moment/locale/zh-cn';
import './router.less';

const { Content } = Layout;

dynamic.setDefaultLoadingComponent(() => (
  <div className="dynamic-loading">
    <Spin size="large" />
  </div>
));

function getValidRoutes(routes, user) {
  return filter(
    map(routes, route => {
      let newRoute = route;
      if (route.enable) {
        if (user && route.enable(user)) {
          newRoute = route;
        } else {
          newRoute = null;
        }
      }

      if (newRoute && newRoute.routes) {
        newRoute = {
          ...newRoute,
          routes: getValidRoutes(newRoute.routes, user)
        };
      }

      return newRoute;
    }),
    route => !!route
  );
}

// eslint-disable-next-line react/prop-types
function RouterConfig({ history, app, user }) {
  const {
    routes: unCheckRoutes,
    config: { name, api = {} }
  } = app;

  const { auth } = api;

  const routes = getValidRoutes(unCheckRoutes, user);

  function renderRoute({
    path,
    inline,
    title,
    breadcrumb,
    routes: subRoutes,
    component: Component
  }) {
    const children = [];
    if ((title || breadcrumb || Component) && !inline) {
      const inlineRoutes = subRoutes ? filter(subRoutes, r => r.inline) : [];

      children.push(
        <Route
          exact
          key={path}
          path={path}
          render={() => (
            <React.Fragment>
              <Breadcrumb routes={routes} />
              {!!Component && <Component routes={inlineRoutes} />}
            </React.Fragment>
          )}
        />
      );
    }
    if (subRoutes && subRoutes.length > 0) {
      return children.concat(subRoutes.map(route => renderRoute(route)));
    }

    return children;
  }

  const homeRoute = find(routes, ({ path }) => path === '/');

  let firstAvaliableNonHomeRoutePath;

  function findFirstAvaliableNonHomeRoute({
    path,
    routes: subRoutes,
    component
  }) {
    if (path !== '/' && !!component) {
      firstAvaliableNonHomeRoutePath = path;
    } else {
      const nonInlineRoutes = subRoutes
        ? filter(subRoutes, ({ inline }) => !inline)
        : [];
      if (nonInlineRoutes && nonInlineRoutes.length > 0) {
        forEach(nonInlineRoutes, r => findFirstAvaliableNonHomeRoute(r));
      }
    }
    return !firstAvaliableNonHomeRoutePath;
  }
  forEach(routes, r => findFirstAvaliableNonHomeRoute(r));

  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Layout className="xms-layout">
          <Header name={name}>
            <User />
          </Header>
          <Layout className="xms-main-layout">
            <Menu routes={routes} />
            <Content className="xms-content">
              <Switch>
                {map(routes, route => renderRoute(route))}
                {(!auth || !!user) &&
                !homeRoute &&
                firstAvaliableNonHomeRoutePath ? (
                  <Redirect from="/" to={firstAvaliableNonHomeRoutePath} />
                ) : null}
              </Switch>
            </Content>
          </Layout>
          <BackTop
            target={() => document.getElementsByClassName('xms-content')[0]}
          />
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

const ConnectedRouter = connect(mapStateToProps)(RouterConfig);

// eslint-disable-next-line react/prop-types
export default ({ history, app }) => (
  <ConnectedRouter history={history} app={app} />
);
