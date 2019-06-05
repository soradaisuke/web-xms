import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Card, Collapse } from 'antd';
import { map } from 'lodash';
import classNames from 'classnames';
import Page from './Page';

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.bode
      })
    ),
    inline: PropTypes.bool,
    inlineWidgetType: PropTypes.oneOf(['card', 'tabs', 'collapse'])
  };

  static defaultProps = {
    component: null,
    routes: [],
    inline: false,
    inlineWidgetType: 'card'
  };

  state = {
    isLoading: false,
    isError: false
  };

  onChangeTabs = () => {
    const { history } = this.props;
    history.push(window.location.pathname);
  };

  renderRoutes() {
    const { routes, inlineWidgetType, inline } = this.props;
    if (routes && routes.length) {
      switch (inlineWidgetType) {
        case 'collapse':
          return (
            <Card
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Collapse>
                {map(routes, ({ component: Component, path, title = '' }) => (
                  <Panel header={title} key={path}>
                    <Component inline />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          );
        case 'tabs':
          return (
            <Card
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Tabs onChange={this.onChangeTabs}>
                {map(routes, ({ component: Component, path, title = '' }) => (
                  <TabPane tab={title} key={path}>
                    <Component inline />
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          );
        case 'card':
        default:
          return map(routes, ({ component: Component, path, title = '' }) => (
            <Card
              key={path}
              title={title}
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Component inline />
            </Card>
          ));
      }
    }

    return null;
  }

  render() {
    const { component: Component, inline } = this.props;
    const { isLoading, isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {Component ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            <Component />
          </Card>
        ) : null}
        {this.renderRoutes()}
      </Page>
    );
  }
}
