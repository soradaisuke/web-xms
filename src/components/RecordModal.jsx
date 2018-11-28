import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, InputNumber, Select,
} from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import { find, forEach, isFunction } from 'lodash';
import ActivatorModal from './ActivatorModal';
import UploadImage from './UploadImage';
import DataType from '../constants/DataType';

const FormItem = Form.Item;
const {
  STRING, NUMBER, URL, ENUM, IMAGE,
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
    user: PropTypes.instanceOf(Immutable.Map),
  };

  static defaultProps = {
    user: null,
  }

  onOk = async () => {
    const {
      form, record, onOk, schema,
    } = this.props;

    await new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const formatValues = {};
          forEach(values, (value, key) => {
            const targetSchema = find(schema, { key }) || {};
            const formConfig = targetSchema.form || {};
            if (isFunction(formConfig.generateSubmitValue)) {
              formatValues[key] = formConfig.generateSubmitValue(value);
            } else {
              formatValues[key] = value;
            }
          });
          await onOk({ ...record, ...formatValues });
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

  renderFormItem({
    key, type, title, user,
  }) {
    const { form, record, schema } = this.props;
    const { getFieldDecorator } = form;
    const targetSchema = find(schema, { key }) || {};
    const { form: formConfig = {}, filters = [] } = targetSchema;
    const enable = isFunction(formConfig.enable) ? formConfig.enable(form) : true;
    let initialValue = this.isEdit() ? record[key] : '';
    if (isFunction(formConfig.generateInitValue)) {
      initialValue = formConfig.generateInitValue(initialValue);
    }

    let children;
    switch (type) {
      case NUMBER:
      case STRING:
      case URL:
        children = enable ? getFieldDecorator(key, {
          initialValue,
          validateFirst: true,
          rules: [{
            required: !formConfig.optional,
            message: `${title}不能为空`,
            whitespace: true,
          }, {
            type,
            message: `格式不正确，要求为${type}`,
          }].concat(formConfig.rules || []),
        })(type === NUMBER ? <InputNumber /> : <Input />) : null;
        break;
      case ENUM:
        children = enable ? getFieldDecorator(key, {
          initialValue,
          validateFirst: true,
          rules: [{
            required: !formConfig.optional, message: `${title}不能为空`,
          }].concat(formConfig.rules || []),
        })(
          <Select placeholder="请选择一个选项">
            {
              filters.map(op => (
                <Select.Option key={op.value} value={op.value}>
                  {op.text}
                </Select.Option>
              ))
            }
          </Select>,
        ) : null;
        break;
      case IMAGE:
        children = enable ? getFieldDecorator(key, {
          initialValue,
          validateFirst: true,
          valuePropName: 'url',
          rules: [{
            required: !formConfig.optional, message: `${title}不能为空`,
          }].concat(formConfig.rules || []),
        })(
          <UploadImage user={user} title={formConfig.tip} />,
        ) : null;
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
    const { children, schema, user } = this.props;

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
            )).map(definition => this.renderFormItem({ user, ...definition }))
          }
        </Form>
      </ActivatorModal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Form.create()(RecordModal));
