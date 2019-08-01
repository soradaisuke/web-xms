import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import { forEach, set } from 'lodash';
import ActivatorModal from './ActivatorModal';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

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
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    records: PropTypes.array // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    checkVisibility: true,
    columns: Immutable.List(),
    record: null,
    records: null,
    user: null
  };

  onOk = async () => {
    const { form, onOk, columns } = this.props;

    await new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const formatValues = {};
          forEach(values, (value, key) => {
            const column = columns.find(c => c.getFormKey() === key);
            if (column) {
              set(formatValues, key, column.formatFormSubmitValue(value));
            }
          });
          await onOk(formatValues);
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  onVisibleChange = async visibility => {
    const { form } = this.props;
    if (visibility) {
      await form.resetFields();
    }
  };

  isEdit() {
    const { record, records } = this.props;
    return (
      (record && Object.keys(record).length > 0) ||
      (records && records.length > 0)
    );
  }

  renderFormItem(column) {
    const { user, form, record, checkVisibility } = this.props;

    return column.renderInForm({
      user,
      record,
      form,
      checkVisibility,
      isEdit: this.isEdit()
    });
  }

  render() {
    const { children, columns } = this.props;

    return (
      <ActivatorModal
        activator={children}
        title={this.isEdit() ? '编辑' : '添加'}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        {() => (
          <Form {...formItemLayout} onSubmit={this.okHandler}>
            {columns.map(column => this.renderFormItem(column))}
          </Form>
        )}
      </ActivatorModal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Form.create()(RecordModal));
