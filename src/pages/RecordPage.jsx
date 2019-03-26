import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Divider, Card, Collapse,
} from 'antd';
import { map } from 'lodash';
import Page from './Page';

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    routes: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.bode,
    })),
    inlineWidgetType: PropTypes.oneOf(['stack', 'tabs', 'collapse']),
  };

  static defaultProps = {
    component: null,
    routes: [],
    inlineWidgetType: 'stack',
  };

  state = {
    isLoading: false,
    isError: false,
  };

  renderRoutes() {
    const { routes, inlineWidgetType } = this.props;
    if (routes && routes.length) {
      switch (inlineWidgetType) {
        case 'collapse':
          return (
            <Collapse>
              {
                map(routes, ({ component: Component, path, title = '' }) => (
                  <Panel header={title} key={path}><Component /></Panel>
                ))
              }
            </Collapse>
          );
        case 'card':
          return map(routes, ({ component: Component, path, title = '' }) => (
            <Card className="inline-card" title={title} key={path}>
              <Component />
            </Card>
          ));
        case 'tabs':
          return (
            <Tabs>
              {
                map(routes, ({ component: Component, path, title = '' }) => (
                  <TabPane tab={title} key={path}><Component /></TabPane>
                ))
              }
            </Tabs>
          );
        case 'stack':
        default:
          return map(routes, ({ component: Component, path, title = '' }) => (
            <React.Fragment key={path}>
              <Divider>{title}</Divider>
              <Component />
            </React.Fragment>
          ));
      }
    }

    return null;
  }

  render() {
    const { component: Component, routes } = this.props;
    const { isLoading, isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {Component ? <Component /> : null}
        {routes && routes.length && <Divider />}
        {this.renderRoutes()}
      </Page>
    );
  }
}
