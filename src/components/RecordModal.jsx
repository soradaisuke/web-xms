import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, InputNumber, Select,
} from 'antd';
import { find } from 'lodash';
import ActivatorModal from './ActivatorModal';
import DataType from '../constants/DataType';

const FormItem = Form.Item;
const {
  STRING, NUMBER, URL, ENUM,
} = DataType;

class RecordModal extends React.PureComponent {
  static displayName = 'RecordModal';

  static propTypes = {
    children: PropTypes.node.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      visibility: PropTypes.shape({
        create: PropTypes.bool,
        edit: PropTypes.bool,
      }),
    })).isRequired,
    onOk: PropTypes.func.isRequired,
  };

  onOk = async () => {
    const { form, record, onOk } = this.props;

    await new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          await onOk({ ...record, ...values });
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  onVisibleChange = (visibility) => {
    const { form } = this.props;
    if (visibility) {
      form.resetFields();
    }
  }

  isEdit() {
    const { record } = this.props;
    return record && Object.keys(record).length > 0;
  }

  renderFormItem({ key, type, title }) {
    const { form: { getFieldDecorator }, record, schema } = this.props;
    const targetSchema = find(schema, { key }) || {};
    const filters = targetSchema.filters || [];

    let children;
    switch (type) {
      case NUMBER:
      case STRING:
      case URL:
        children = getFieldDecorator(key, {
          initialValue: this.isEdit() ? record[key] : '',
          rules: [{
            required: !targetSchema.optional, message: `${title}不能为空`, whitespace: true, type,
          }],
        })(type === NUMBER ? <InputNumber /> : <Input />);
        break;
      case ENUM:
        children = getFieldDecorator(key, {
          initialValue: this.isEdit() ? record[key] : '',
          rules: [{
            required: !targetSchema.optional, message: `${title}不能为空`,
          }],
        })(
          <Select placeholder="请选择">
            {
              filters.map(op => (
                <Select.Option key={op.value} value={op.value}>
                  {op.text}
                </Select.Option>
              ))
            }
          </Select>,
        );
        break;
      default:
        break;
    }

    if (children) {
      return (
        <FormItem
          key={key}
          label={title}
        >
          {children}
        </FormItem>
      );
    }

    return null;
  }

  render() {
    const { children, schema } = this.props;

    return (
      <ActivatorModal
        activator={children}
        title={this.isEdit() ? '编辑' : '添加'}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        <Form onSubmit={this.okHandler}>
          {
            schema.filter(({ visibility }) => (
              (this.isEdit() && visibility.edit) || (!this.isEdit() && visibility.create)
            )).map(definition => this.renderFormItem({ ...definition }))
          }
        </Form>
      </ActivatorModal>
    );
  }
}

export default Form.create()(RecordModal);
