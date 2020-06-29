import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'dva';
import { Tabs, Card, Collapse, Descriptions, message } from 'antd';
import { map, get, reduce } from 'lodash';
import classNames from 'classnames';
import TableType from '../schema/Table';
import Page from './Page';
import showError from '../utils/showError';
import Action from '../components/Action';
import EditableCell from '../components/Editable/EditableCell';
import EditableDescriptions from '../components/Editable/EditableDescriptions';

const { TabPane } = Tabs;
const { Panel } = Collapse;

class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired,
    bordered: PropTypes.bool,
    table: PropTypes.instanceOf(TableType),
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    fetch: PropTypes.func,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.bode
      })
    ),
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['card', 'tab', 'collapse']),
    // eslint-disable-next-line react/forbid-prop-types
    descriptionsColumn: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    bordered: false,
    table: null,
    component: null,
    routes: [],
    inline: false,
    layout: 'card',
    user: null,
    fetch: null,
    record: null,
    descriptionsColumn: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }
  };

  state = {
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { fetch } = this.props;
    if (fetch) {
      this.setState({ isLoading: true, error: null });
      fetch()
        .then(() => {
          this.setState({ isLoading: false, error: null });
        })
        .catch(e => this.setState({ isLoading: false, error: e }));
    }
  };

  updateRecord = async ({ promise, loadingMessage, throwError = false }) => {
    let hide;
    if (loadingMessage) {
      hide = message.loading(loadingMessage, 0);
    }

    try {
      await promise;
      if (hide) {
        hide();
      }
    } catch (e) {
      if (hide) {
        hide();
      }
      showError(e.message);
      if (throwError) {
        throw e;
      }
    }
    this.fetch();
  };

  renderActions() {
    const { table, user, record } = this.props;

    const validActions = table
      .getActions()
      .filter(action => action.isVisible(user));

    if (validActions.size === 0) {
      return null;
    }

    return (
      <Descriptions.Item label="操作">
        {validActions.map(action => (
          <Action action={action} record={record} onComplete={this.fetch} />
        ))}
      </Descriptions.Item>
    );
  }

  renderDescriptionItem(column) {
    const { user, record } = this.props;

    if (!column.canShowInDescription({ user, record })) {
      return null;
    }

    return (
      <Descriptions.Item
        label={column.getTitle()}
        key={column.getKey()}
        span={column.getDescriptionSpan()}
      >
        <EditableCell column={column} record={record} onComplete={this.fetch}>
          {column.renderInDescription({
            record,
            value: get(record, column.getKey())
          })}
        </EditableCell>
      </Descriptions.Item>
    );
  }

  renderContent() {
    const { record, inline, table, bordered, descriptionsColumn } = this.props;

    if (!record || !table) {
      return null;
    }

    const children = (
      <EditableDescriptions bordered={bordered} column={descriptionsColumn}>
        {table.getColumns().map(column => this.renderDescriptionItem(column))}
        {this.renderActions()}
      </EditableDescriptions>
    );

    return inline ? (
      children
    ) : (
      <Card className={classNames('content-card', inline ? 'inline' : '')}>
        {children}
      </Card>
    );
  }

  renderRouteChunk(chunk) {
    const { layout, inline, record } = this.props;
    if (chunk && chunk.length) {
      const chunkLayout = chunk[0].layout || layout;

      switch (chunkLayout) {
        case 'collapse':
          return (
            <Card
              key={chunk[0].path}
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Collapse>
                {map(chunk, ({ component: Component, path, title = '' }) => (
                  <Panel header={title} key={path}>
                    <Component inline record={record} />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          );
        case 'tab':
          return (
            <Card
              key={chunk[0].path}
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Tabs>
                {map(chunk, ({ component: Component, path, title = '' }) => (
                  <TabPane tab={title} key={path}>
                    <Component inline record={record} />
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          );
        case 'card':
        default:
          return map(chunk, ({ component: Component, path, title = '' }) => (
            <Card
              key={path}
              title={title}
              className={classNames('content-card', inline ? 'inline' : '')}
            >
              <Component inline record={record} />
            </Card>
          ));
      }
    }

    return null;
  }

  renderRoutes() {
    const { routes, layout } = this.props;
    if (routes && routes.length) {
      return map(
        reduce(
          routes,
          (result, route) => {
            if (result.length === 0) {
              result.push([route]);
            } else {
              const routeLayout = route.layout || layout;
              const last = result[result.length - 1];
              const lastLayout = last[0].layout || layout;
              if (routeLayout === lastLayout) {
                last.push(route);
              } else {
                result.push([route]);
              }
            }
            return result;
          },
          []
        ),
        chunk => this.renderRouteChunk(chunk)
      );
    }

    return null;
  }

  render() {
    const { component: Component, inline, record } = this.props;
    const { isLoading, error } = this.state;

    return (
      <Page
        isLoading={isLoading}
        isError={!!error}
        errorMessage={error ? error.message : ''}
        showWatermark={!inline}
      >
        {Component ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            <Component record={record} />
          </Card>
        ) : null}
        {this.renderContent()}
        {this.renderRoutes()}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RecordPage);
