import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import ActivatorModal from './ActivatorModal';
import RecordForm from './RecordForm';

class RecordModal extends React.PureComponent {
  static displayName = 'RecordModal';

  static propTypes = {
    children: PropTypes.node.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired
    }).isRequired,
    onOk: PropTypes.func.isRequired,
    checkVisibility: PropTypes.bool,
    user: PropTypes.instanceOf(Immutable.Map),
    columns: PropTypes.instanceOf(Immutable.List),
    title: PropTypes.string,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    records: PropTypes.array // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    title: '',
    checkVisibility: true,
    columns: Immutable.List(),
    record: null,
    records: null,
    user: null
  };

  onOk = () => {
    if (this.form) {
      return this.form.onOk();
    }
    return Promise.resolve();
  };

  onVisibleChange = async visibility => {
    if (visibility && this.form) {
      await this.form.reset();
    }
  };

  onRef = ref => {
    this.form = ref;
  };

  isEdit() {
    const { record, records } = this.props;
    return (
      (record && Object.keys(record).length > 0) ||
      (records && records.length > 0)
    );
  }

  render() {
    const { children, title, ...props } = this.props;
    const defaultTitle = this.isEdit() ? '编辑' : '添加';

    return (
      <ActivatorModal
        {...this.props}
        activator={children}
        title={title || defaultTitle}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        <RecordForm {...props} onRef={this.onRef} />
      </ActivatorModal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Form.create()(RecordModal));
