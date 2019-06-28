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
    inlineLayout: PropTypes.oneOf(['card', 'tab', 'collapse'])
  };

  static defaultProps = {
    component: null,
    routes: [],
    inline: false,
    inlineLayout: 'card'
  };

  state = {
    isError: false
  };

  onChangeTabs = () => {
    const { history } = this.props;
    history.push(window.location.pathname);
  };

  renderRoutes() {
    const { routes, inlineLayout, inline } = this.props;
    if (routes && routes.length) {
      switch (inlineLayout) {
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
        case 'tab':
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

  renderCustomActions() {
    const { actions } = this.props;
  }

  renderDescriptions() {
    const { table, record, title } = this.props;
    return (
      <Descriptions title={title} border>
        {
          table.getColumns().map((column, index) => (
            column.canShowInDescriptions(user)
              ? (
                <Descriptions.Item
                  key={index}
                  label={column.getTitle()}
                  span={column.getSpan()}
                >
                  {
                    isFunction(column.renderInDescription)
                      ? column.renderInDescription({ value: record.get(column.getKey()), record })
                      : column.renderInTable({ value: record.get(column.getKey()), record })
                  }
                </Descriptions.Item>
              ) : null
          ))
        }
        {this.renderCustomActions()}
      </Descriptions>
    )
  }

  render() {
    const { component: Component, inline, isLoading, record } = this.props;
    const { isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {record ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            {this.renderDescriptions()}
          </Card>
        ) : null}
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
