import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import {
  find, forEach, isFunction, get,
} from 'lodash';
import ActivatorModal from './ActivatorModal';

const FormItem = Form.Item;

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
    const { form: formConfig = {}, filters = [], mapKey } = targetSchema;
    const enable = isFunction(formConfig.enable) ? formConfig.enable(form, record) : true;

    if (!enable) {
      return null;
    }

    let initialValue = this.isEdit() ? type.formatFormValue(get(record, key))
      : type.getFormDefaultInitialValue();
    if (isFunction(formConfig.generateInitValue)) {
      initialValue = formConfig.generateInitValue(initialValue);
    }

    const commonEmptyRule = {
      required: !formConfig.optional,
      message: `${title}不能为空`,
    };

    if (type.canCheckWhiteSpace()) {
      commonEmptyRule.whitespace = !formConfig.optional;
    }

    const children = type.canShowInForm() ? getFieldDecorator(mapKey, {
      initialValue,
      validateFirst: true,
      rules: [commonEmptyRule].concat(type.getFormRules({ ...formConfig, title, user }))
        .concat(formConfig.rules || []),
      ...type.getFormExtraConfig(),
    })(type.renderFormItem({
      ...formConfig, title, filters, user,
    })) : null;

    if (children) {
      return (
        <FormItem
          key={mapKey}
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
