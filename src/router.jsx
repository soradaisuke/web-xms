import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import { filter } from 'lodash';
import { Layout, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import Menu from './components/Menu';
import User from './components/User';
import Breadcrumb from './components/Breadcrumb';
import './router.less';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => (
  <div className="dynamic-loading">
    <Spin size="large" />
  </div>
));

function renderRoute({
  app, path, component: Component, routes,
}) {
  const children = [];
  if (Component) {
    const inlineRoutes = routes ? filter(routes, ({ inline }) => inline) : [];

    children.push((
      <Route
        exact
        key={path}
        path={path}
        render={() => (
          <React.Fragment>
            <Breadcrumb routes={app.routes} />
            <Content>
              <Component routes={inlineRoutes} />
            </Content>
          </React.Fragment>
        )}
      />
    ));
  }
  if (routes && routes.length > 0) {
    return children.concat(routes.map(route => renderRoute({ ...route, app })));
  }

  return children;
}

function RouterConfig({ history, app }) { // eslint-disable-line react/prop-types
  return (
    <ConnectedRouter history={history}>
      <Layout className="xms-layout">
        <Header>
          {app.config.name}
          <User />
        </Header>
        <Layout>
          <Sider width="9.6rem">
            <Menu routes={app.routes} />
          </Sider>
          <Layout className="content-layout">
            <Switch>
              {
                app.routes.map(route => renderRoute({ ...route, app }))
              }
            </Switch>
            <Footer>
              ©2011-2018 qingting.fm All Rights Reserved.
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConnectedRouter>
  );
}

export default RouterConfig;
