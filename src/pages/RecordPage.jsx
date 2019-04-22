import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Card, Collapse,
} from 'antd';
import { map } from 'lodash';
import classNames from 'classnames';
import Page from './Page';

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
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

  onChangeTabs = () => {
    const { history } = this.props;
    history.push(window.location.pathname);
  }

  renderRoutes() {
    const { routes, inlineWidgetType } = this.props;
    if (routes && routes.length) {
      switch (inlineWidgetType) {
        case 'collapse':
          return (
            <Card className="content-card">
              <Collapse>
                {
                  map(routes, ({ component: Component, path, title = '' }) => (
                    <Panel header={title} key={path}><Component /></Panel>
                  ))
                }
              </Collapse>
            </Card>
          );
        case 'card':
          return map(routes, ({ component: Component, path, title = '' }) => (
            <Card className="inline-card" title={title} key={path}>
              <Component />
            </Card>
          ));
        case 'tabs':
          return (
            <Card className="content-card">
              <Tabs onChange={this.onChangeTabs}>
                {
                  map(routes, ({ component: Component, path, title = '' }) => (
                    <TabPane tab={title} key={path}><Component /></TabPane>
                  ))
                }
              </Tabs>
            </Card>
          );
        case 'stack':
        default:
          return map(routes, ({ component: Component, path, title = '' }) => (
            <Card key={path} title={title} className="content-card">
              <Component />
            </Card>
          ));
      }
    }

    return null;
  }

  render() {
    const { component: Component } = this.props;
    const { isLoading, isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {
          Component
            ? <Card className={classNames('content-card', 'first-card')}><Component /></Card>
            : null
        }
        {this.renderRoutes()}
      </Page>
    );
  }
}
