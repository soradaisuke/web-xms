import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useEventCallback } from '@qt/react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { filter, find, map, forEach } from 'lodash';
import { Layout, Spin, ConfigProvider, BackTop } from 'antd';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import useUser from './hooks/useUser';
import Menu from './components/Menu';
import User from './components/User';
import Breadcrumb from './components/Breadcrumb';
import Watermark from './components/Watermark';
import 'moment/locale/zh-cn';
import './router.less';

const { Content, Sider, Header } = Layout;

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
        render={() => !!Component && <Component routes={inlineRoutes} />}
      />
    );
  }
  if (subRoutes && subRoutes.length > 0) {
    return children.concat(subRoutes.map(route => renderRoute(route)));
  }

  return children;
}

function ConnectedRouter({ history, app }) {
  const user = useUser();

  const {
    routes: unCheckRoutes,
    config: { name, api: { auth } = {} }
  } = app;

  const routes = useMemo(() => getValidRoutes(unCheckRoutes, user), [
    unCheckRoutes,
    user
  ]);
  const homeRoute = useMemo(() => find(routes, ({ path }) => path === '/'), [
    routes
  ]);
  const firstAvaliableNonHomeRoutePath = useMemo(() => {
    let nonHomeRoutePath;

    function findFirstAvaliableNonHomeRoute({
      path,
      routes: subRoutes,
      component
    }) {
      if (path !== '/' && !!component) {
        nonHomeRoutePath = path;
      } else {
        const nonInlineRoutes = subRoutes
          ? filter(subRoutes, ({ inline }) => !inline)
          : [];
        if (nonInlineRoutes && nonInlineRoutes.length > 0) {
          forEach(nonInlineRoutes, r => findFirstAvaliableNonHomeRoute(r));
        }
      }
      return !nonHomeRoutePath;
    }

    forEach(routes, r => findFirstAvaliableNonHomeRoute(r));

    return nonHomeRoutePath;
  }, [routes]);

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = useEventCallback(c => setCollapsed(c));

  return (
    <ConfigProvider locale={zhCN}>
      <Watermark />
      <Router history={history}>
        <Layout className="xms-layout">
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            {(!auth || !!user) && <Menu routes={routes} />}
          </Sider>
          <Layout className="xms-site-layout">
            <Header className="xms-site-layout-heder">
              <div className="site-name">{name}</div>
              <User />
            </Header>
            <Content className="xms-content">
              <Breadcrumb routes={routes} />
              <Switch>
                {map(routes, route => renderRoute(route))}
                {(!auth || !!user) &&
                !homeRoute &&
                firstAvaliableNonHomeRoutePath ? (
                  <Redirect
                    from="/"
                    to={{
                      pathname: firstAvaliableNonHomeRoutePath,
                      state: { unmatch: true }
                    }}
                  />
                ) : null}
              </Switch>
            </Content>
          </Layout>
          <BackTop />
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

ConnectedRouter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  app: PropTypes.shape({
    routes: PropTypes.array.isRequired,
    config: PropTypes.shape({
      name: PropTypes.string,
      api: PropTypes.shape({
        auth: PropTypes.string
      })
    }).isRequired
  }).isRequired
};

// eslint-disable-next-line react/prop-types
export default ({ history, app }) => (
  <ConnectedRouter history={history} app={app} />
);
