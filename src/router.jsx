import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import { Layout, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import Menu from './components/Menu';
import './router.less';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => (
  <div className="xms-layout-content-loading">
    <Spin size="large" />
  </div>
));

function renderRoute({ path, component, routes }) { // eslint-disable-line react/prop-types
  const children = [];
  if (component) {
    children.push(<Route exact key={path} path={path} component={component} />);
  }
  if (routes && routes.length > 0) {
    return children.concat(routes.map(route => renderRoute(route)));
  }

  return children;
}

function RouterConfig({ history, app }) { // eslint-disable-line react/prop-types
  return (
    <ConnectedRouter history={history}>
      <Layout className="xms-layout">
        <Header className="xms-layout-header">
          {app.config.name}
        </Header>
        <Layout>
          <Sider className="xms-layout-sider" width="9.6rem">
            <Menu routes={app.routes} />
          </Sider>
          <Content className="xms-layout-content">
            <Switch>
              {
                app.routes.map(route => renderRoute(route))
              }
            </Switch>
          </Content>
        </Layout>
        <Footer className="xms-layout-footer">
          Footer
        </Footer>
      </Layout>
    </ConnectedRouter>
  );
}

export default RouterConfig;
