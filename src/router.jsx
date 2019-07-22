import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { filter, find, map, forEach } from 'lodash';
import { Layout, Spin, LocaleProvider, Row, Col, Affix } from 'antd';
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
    config: { name }
  } = app;

  const routes = getValidRoutes(unCheckRoutes, user);

  function renderRoute({ path, routes: subRoutes, component: Component }) {
    const children = [];
    if (Component) {
      const inlineRoutes = subRoutes
        ? filter(subRoutes, ({ inline }) => inline)
        : [];

      children.push(
        <Route
          exact
          key={path}
          path={path}
          render={() => (
            <React.Fragment>
              <Breadcrumb routes={routes} />
              <Component routes={inlineRoutes} />
            </React.Fragment>
          )}
        />
      );
    }
    const nonInlineRoutes = subRoutes
      ? filter(subRoutes, ({ inline }) => !inline)
      : [];
    if (nonInlineRoutes && nonInlineRoutes.length > 0) {
      return children.concat(nonInlineRoutes.map(route => renderRoute(route)));
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
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Layout className="xms-layout">
          <Header name={name}>
            <User />
          </Header>
          <Layout className="xms-main-layout">
            <Row>
              <Col lg={3} xl={3} xxl={3}>
                <Affix>
                  <Menu routes={routes} />
                </Affix>
              </Col>
              <Col lg={21} xl={21} xxl={21}>
                <Content className="xms-content">
                  <Switch>
                    {map(routes, route => renderRoute(route))}
                    {!homeRoute && firstAvaliableNonHomeRoutePath ? (
                      <Redirect from="/" to={firstAvaliableNonHomeRoutePath} />
                    ) : null}
                  </Switch>
                </Content>
              </Col>
            </Row>
          </Layout>
        </Layout>
      </Router>
    </LocaleProvider>
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
