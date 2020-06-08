import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'dva';
import { Tabs, Card, Collapse, Descriptions, message } from 'antd';
import { map, filter, get, reduce, find } from 'lodash';
import classNames from 'classnames';
import TableType from '../schema/Table';
import EditAction from '../actions/EditAction';
import Page from './Page';
import showError from '../utils/showError';

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
    actions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    fetch: PropTypes.func,
    remove: PropTypes.func,
    edit: PropTypes.func,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.bode
      })
    ),
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['card', 'tab', 'collapse']),
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    actions: null,
    bordered: false,
    table: null,
    component: null,
    routes: [],
    inline: false,
    layout: 'card',
    user: null,
    fetch: null,
    remove: null,
    edit: null,
    record: null
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

  renderAction(action, { column, inline } = {}) {
    const {
      user,
      remove,
      edit,
      record,
      table,
      match: { params: matchParams }
    } = this.props;

    const props = {
      user,
      matchParams,
      remove,
      edit,
      table,
      record,
      inline,
      column,
      confirm: this.fetch,
      submit: this.updateRecord
    };

    return action.render(props);
  }

  renderActions() {
    const { actions, user } = this.props;

    if (!actions) {
      return null;
    }

    const validActions = filter(actions, action => action.isVisible(user));

    if (validActions.length === 0) {
      return null;
    }

    return (
      <Descriptions.Item label="操作">
        {validActions.map(action => this.renderAction(action))}
      </Descriptions.Item>
    );
  }

  renderDescriptionItem(column) {
    const { user, record, actions } = this.props;

    if (!column.canShowInDescription({ user, record })) {
      return null;
    }

    let children = column.renderInDescription({
      record,
      value: get(record, column.getKey())
    });

    const editAction = find(actions, action => action instanceof EditAction);
    if (column.canInlineEdit() && editAction) {
      const action = this.renderAction(editAction, {
        record,
        column,
        inline: true
      });
      if (action) {
        children = action;
      }
    }

    return (
      <Descriptions.Item label={column.getTitle()} key={column.getKey()}>
        {children}
      </Descriptions.Item>
    );
  }

  renderContent() {
    const { record, inline, table, bordered } = this.props;

    if (!record || !table) {
      return null;
    }

    const children = (
      <Descriptions
        bordered={bordered}
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
      >
        {table.getColumns().map(column => this.renderDescriptionItem(column))}
        {this.renderActions()}
      </Descriptions>
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
    const { layout, inline } = this.props;
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
                    <Component inline />
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
                    <Component inline />
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
              <Component inline />
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
    const { component: Component, inline } = this.props;
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
            <Component />
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
