import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'dva';
import { Tabs, Card, Collapse, Descriptions, message } from 'antd';
import { map, filter, get } from 'lodash';
import classNames from 'classnames';
import TableType from '../schema/Table';
import Page from './Page';

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
    inlineLayout: PropTypes.oneOf(['card', 'tab', 'collapse']),
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    actions: null,
    table: null,
    component: null,
    routes: [],
    inline: false,
    inlineLayout: 'card',
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

  updateRecord = async ({
    promise,
    loadingMessage = '正在保存……',
    throwError = false
  }) => {
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
      message.error(e.message);
      if (throwError) {
        throw e;
      }
    }
    this.fetch();
  };

  onChangeTabs = () => {
    const { history } = this.props;
    history.push(window.location.pathname);
  };

  renderAction(action) {
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
    const { user, record } = this.props;

    if (!column.canShowInDescription(user)) {
      return null;
    }

    return (
      <Descriptions.Item label={column.getTitle()} key={column.getKey()}>
        {column.renderInDescription({
          record,
          value: get(record, column.getKey())
        })}
      </Descriptions.Item>
    );
  }

  renderContent() {
    const { record, inline, table } = this.props;

    if (!record || !table) {
      return null;
    }

    return (
      <Card
        title="详情"
        className={classNames('content-card', inline ? 'inline' : '')}
      >
        <Descriptions
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          {table.getColumns().map(column => this.renderDescriptionItem(column))}
          {this.renderActions()}
        </Descriptions>
      </Card>
    );
  }

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

  render() {
    const { component: Component, inline } = this.props;
    const { isLoading, error } = this.state;

    return (
      <Page
        isLoading={isLoading}
        isError={!!error}
        errorMessage={error ? error.message : ''}
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
