import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEventCallback } from '@qt/react';
import { filter, find, map } from 'lodash';
import { Layout, Spin, ConfigProvider, BackTop } from 'antd';
import { dynamic, router } from 'dva';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import useUser from './hooks/useUser';
import Menu from './components/Menu';
import User from './components/User';
import Breadcrumb from './components/Nav/Breadcrumb';
import Watermark from './components/Watermark';
import 'moment/locale/zh-cn';
import './router.less';
import WelcomePage from './pages/WelcomePage';
import hasPermission from './utils/hasPermission';
import isTuboshu from './utils/isTuboshu';
import isYouzi from './utils/isYouzi';

const { Route, Switch, Router, Redirect } = router;
const { Content, Sider, Header } = Layout;

dynamic.setDefaultLoadingComponent(() => (
  <div className="dynamic-loading">
    <Spin size="large" />
  </div>
));

function getValidRoutes(routes, user) {
  return filter(
    map(routes, (route) => {
      let newRoute = route;
      if (route.enable && !(user && route.enable(user))) {
        newRoute = null;
      }

      if (
        !hasPermission({
          configPermissions: route.permissions,
          userPermissions: user?.get('permissions'),
        })
      ) {
        newRoute = null;
      }

      if (newRoute && newRoute.routes) {
        newRoute = {
          ...newRoute,
          routes: getValidRoutes(newRoute.routes, user),
        };
      }

      return newRoute;
    }),
    (route) => !!route
  );
}

function renderRoute({
  path,
  inline,
  title,
  breadcrumb,
  routes: subRoutes,
  component: Component,
}) {
  const children = [];
  if ((title || breadcrumb || Component) && !inline) {
    const inlineRoutes = subRoutes ? filter(subRoutes, (r) => r.inline) : [];

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
    return children.concat(subRoutes.map((route) => renderRoute(route)));
  }

  return children;
}

function ConnectedRouter({ history, app }) {
  const user = useUser();

  const {
    routes: unCheckRoutes,
    config: { name, api: { auth } = {} },
  } = app;

  const routes = useMemo(() => getValidRoutes(unCheckRoutes, user), [
    unCheckRoutes,
    user,
  ]);
  const homeRoute = useMemo(() => find(routes, ({ path }) => path === '/'), [
    routes,
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = useEventCallback((c) => setCollapsed(c));

  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Layout className="xms-layout">
          <Sider
            className="xms-sider"
            collapsible
            theme={isTuboshu || isYouzi ? 'light' : 'dark'}
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <div
              className={classNames(
                'logo',
                // eslint-disable-next-line no-nested-ternary
                isTuboshu ? 'tuboshu' : isYouzi ? 'youzi' : ''
              )}
            />
            {(!auth || !!user) && <Menu routes={routes} />}
          </Sider>
          <Layout
            className={classNames(
              'xms-site-layout',
              collapsed ? 'collapsed' : ''
            )}
          >
            <Header className="xms-site-layout-heder">
              {name}
              <User />
            </Header>
            <Content className="xms-content">
              <Breadcrumb routes={routes} />
              <Switch>
                {!homeRoute && (
                  <Route exact key="/" path="/">
                    <WelcomePage title={name} />
                  </Route>
                )}
                {map(routes, (route) => renderRoute(route))}
                <Redirect from="/" to="/" />
              </Switch>
            </Content>
          </Layout>
          <BackTop />
        </Layout>
      </Router>
      <Watermark />
    </ConfigProvider>
  );
}

ConnectedRouter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  app: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    routes: PropTypes.array.isRequired,
    config: PropTypes.shape({
      name: PropTypes.string,
      api: PropTypes.shape({
        auth: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
};

// eslint-disable-next-line react/prop-types
export default ({ history, app }) => (
  <ConnectedRouter history={history} app={app} />
);
