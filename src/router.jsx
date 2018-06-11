import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import { Layout, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import NavMenu from './components/NavMenu';
import NavBreadcrumb from './components/NavBreadcrumb';
import Styles from './router.less';

const { Header, Content, Footer } = Layout;
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => (
  <div className={Styles.loading}>
    <Spin size="large" />
  </div>
));

function RouterConfig({ history, app }) { // eslint-disable-line react/prop-types
  function renderRoute({
    path, component, models, routes,
  }) { // eslint-disable-line react/prop-types
    const children = [];
    if (component) {
      let c = component;
      if (component instanceof Promise) {
        c = dynamic({
          app,
          models: () => models || [],
          component: () => component,
        });
      }
      children.push(<Route exact key={path} path={path} component={c} />);
    }
    if (routes && routes.length > 0) {
      return children.concat(routes.map(route => renderRoute({
        path: `${path}${route.path}`, component: route.component, models: routes.models, routes: route.routes,
      })));
    }

    return children;
  }

  return (
    <ConnectedRouter history={history}>
      <Layout className={Styles.layout}>
        <Header>
          <Route
            render={// eslint-disable-line react/jsx-no-bind
              ({ location }) => <NavMenu pathname={location.pathname} routes={app.routes} />
            }
          />
        </Header>
        <Content className={Styles.content}>
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
        <Footer className={Styles.footer}>
          Footer
        </Footer>
      </Layout>
    </ConnectedRouter>
  );
}

export default RouterConfig;
