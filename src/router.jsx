import React from 'react';
import {
  Route, Switch, Router, Redirect,
} from 'dva/router';
import { filter, find, map } from 'lodash';
import { Layout, Spin, LocaleProvider } from 'antd';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Menu from './components/Menu';
import User from './components/User';
import Breadcrumb from './components/Breadcrumb';
import 'moment/locale/zh-cn';
import './router.less';

const {
  Header, Content, Footer, Sider,
} = Layout;

dynamic.setDefaultLoadingComponent(() => (
  <div className="dynamic-loading">
    <Spin size="large" />
  </div>
));

function RouterConfig({ history, app }) { // eslint-disable-line react/prop-types
  const { routes, config: { name } } = app;

  function renderRoute({ path, routes: subRoutes, component: Component }) {
    const children = [];
    if (Component) {
      const inlineRoutes = subRoutes ? filter(subRoutes, ({ inline }) => inline) : [];

      children.push((
        <Route
          exact
          key={path}
          path={path}
          render={() => (
            <React.Fragment>
              <Breadcrumb routes={routes} />
              <Content>
                <Component routes={inlineRoutes} />
              </Content>
            </React.Fragment>
          )}
        />
      ));
    }
    const nonInlineRoutes = subRoutes ? filter(subRoutes, ({ inline }) => !inline) : [];
    if (nonInlineRoutes && nonInlineRoutes.length > 0) {
      return children.concat(nonInlineRoutes.map(route => renderRoute(route)));
    }

    return children;
  }

  const homeRoute = find(routes, ({ path }) => path === '/');
  const firstAvaliableNonHomeRoute = find(routes, ({ path, component }) => path !== '/' && !!component);

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Layout className="xms-layout">
          <Header>
            {name}
            <User />
          </Header>
          <Layout>
            <Sider width="9.6rem">
              <Menu routes={routes} />
            </Sider>
            <Layout className="content-layout">
              <Switch>
                {
                  map(routes, route => renderRoute(route))
                }
                {
                  !homeRoute && firstAvaliableNonHomeRoute ? <Redirect from="/" to={firstAvaliableNonHomeRoute.path} /> : null
                }
              </Switch>
              <Footer>
                ©2011-2018 qingting.fm All Rights Reserved.
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
