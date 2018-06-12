import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import { Layout, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import NavMenu from './components/NavMenu';
import NavBreadcrumb from './components/NavBreadcrumb';
import './router.less';

const { Header, Content, Footer } = Layout;
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
    return children.concat(routes.map(route => renderRoute({
      path: `${path}${route.path}`, component: route.component, routes: route.routes,
    })));
  }

  return children;
}

function RouterConfig({ history, app }) { // eslint-disable-line react/prop-types
  return (
    <ConnectedRouter history={history}>
      <Layout className="xms-layout">
        <Header className="xms-layout-header">
          <Route
            render={// eslint-disable-line react/jsx-no-bind
              ({ location }) => <NavMenu pathname={location.pathname} routes={app.routes} />
            }
          />
        </Header>
        <Content className="xms-layout-content">
          <Route
            render={// eslint-disable-line react/jsx-no-bind
              ({ location }) => <NavBreadcrumb pathname={location.pathname} routes={app.routes} />
            }
          />
          <Switch>
            {
              app.routes.map(route => renderRoute(route))
            }
          </Switch>
        </Content>
        <Footer className="xms-layout-footer">
          Footer
        </Footer>
      </Layout>
    </ConnectedRouter>
  );
}

export default RouterConfig;
