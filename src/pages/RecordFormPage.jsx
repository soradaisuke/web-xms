import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'dva';
import { Card, Row, Button, Modal } from 'antd';
import TableType from '../schema/Table';
import Page from './Page';
import RecordForm from '../components/RecordForm';
import TableActions from '../actions/TableActions';
import './RecordsPage.less';
import visiblePromise from '../utils/visiblePromise';

class RecordFormPage extends React.PureComponent {
  static displayName = 'RecordFormPage';

  static propTypes = {
    actions: PropTypes.instanceOf(TableActions).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired,
    table: PropTypes.instanceOf(TableType).isRequired,
    reset: PropTypes.func,
    renderActions: PropTypes.func,
    fetch: PropTypes.func,
    create: PropTypes.func,
    edit: PropTypes.func,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    reset: null,
    user: null,
    renderActions: null,
    fetch: null,
    create: null,
    edit: null,
    record: null
  };

  state = {
    action: null,
    isLoading: false,
    error: null
  };

  componentDidMount() {
    const { actions, reset } = this.props;
    const isEdit = this.isEdit();
    this.setState({
      action: isEdit ? actions.getEditAction() : actions.getCreateAction()
    });
    if (reset) {
      reset();
    }
    if (isEdit) {
      this.fetch();
    }
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

  onOk = body => {
    const { action } = this.state;
    const {
      create,
      edit,
      match: {
        params: { id }
      }
    } = this.props;
    const handler = action.getHandler({ create, edit });
    return visiblePromise({
      promise: handler({ body, id }),
      loadingMessage: action.getHandlingMessage(),
      successMessage: '保存成功',
      throwError: true
    });
  };

  onRef = ref => {
    this.form = ref;
  };

  onClickGoBack = () => {
    const { history } = this.props;
    if (this.form) {
      Modal.confirm({
        title: '确认放弃所编辑的内容返回上一页？',
        onOk: history.goBack
      });
    }
  };

  onClickReset = () => {
    if (this.form) {
      Modal.confirm({
        title: '确认重置？',
        onOk: () => {
          this.form.reset();
        }
      });
    }
  };

  onClickSubmit = () => {
    const { history } = this.props;
    if (this.form) {
      Modal.confirm({
        title: '确认提交？',
        onOk: () => {
          this.form.onOk().then(isOk => {
            if (isOk) {
              history.goBack();
            }
          });
        }
      });
    }
  };

  isEdit() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return id !== 'new';
  }

  renderActions = (data) => {
    const { isLoading } = this.state;
    const { renderActions } = this.props;

    return (
      <Row type="flex" align="middle">
        <Button onClick={this.onClickGoBack}>返回</Button>
        <Button
          className="form-action"
          disabled={isLoading}
          type="danger"
          onClick={this.onClickReset}
        >
          重置
        </Button>
        <Button
          className="form-action"
          disabled={isLoading}
          type="primary"
          onClick={this.onClickSubmit}
        >
          提交
        </Button>
        {renderActions && renderActions(data)}
      </Row>
    );
  };

  renderContent() {
    const { table, record, user } = this.props;
    const { action } = this.state;
    if (!table || !action) {
      return null;
    }

    return (
      <Card title={action.getTitle()} className="content-card">
        <RecordForm
          className="record-form-page-form"
          onRef={this.onRef}
          record={record}
          columns={table.getColumns()}
          user={user}
          onOk={this.onOk}
          renderActions={this.renderActions}
        />
      </Card>
    );
  }

  render() {
    const { isLoading, error } = this.state;

    return (
      <Page
        showWatermark
        isLoading={isLoading}
        isError={!!error}
        errorMessage={error ? error.message : ''}
      >
        {this.renderContent()}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RecordFormPage);
