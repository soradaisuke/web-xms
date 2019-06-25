import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import { find, forEach, isFunction, get, unset, split } from 'lodash';
import ActivatorModal from './ActivatorModal';

const FormItem = Form.Item;

class RecordModal extends React.PureComponent {
  static displayName = 'RecordModal';

  static propTypes = {
    children: PropTypes.node.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired
    }).isRequired,
    updateModalFilters: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    table: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        visibility: PropTypes.shape({
          create: PropTypes.bool,
          edit: PropTypes.bool
        })
      })
    ).isRequired,
    onOk: PropTypes.func.isRequired,
    multipleKey: PropTypes.string,
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    multipleKey: '',
    user: null
  };

  onOk = async () => {
    const { form, record, onOk, table } = this.props;

    await new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const formatValues = {};
          forEach(table, ({ key, ignoreWhenNotEdit }) => {
            const newKey = split(key, '.')[0];
            if (ignoreWhenNotEdit && newKey) {
              unset(record, newKey);
            }
          });
          forEach(values, (value, key) => {
            const targetTable = find(table, { mapKey: key }) || {};
            const formConfig = targetTable.form || {};
            if (isFunction(formConfig.generateSubmitValue)) {
              formatValues[key] = formConfig.generateSubmitValue(value);
            } else if (isFunction(targetTable.type.formatSubmitValue)) {
              formatValues[key] = targetTable.type.formatSubmitValue(value);
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

  checkRelevant = () => {
    const { table, form, updateModalFilters } = this.props;
    const formFieldsValue = form.getFieldsValue();
    forEach(table, ({ childKey }) =>
      childKey ? updateModalFilters(childKey, formFieldsValue) : null
    );
  };

  onVisibleChange = async visibility => {
    const { form } = this.props;
    if (visibility) {
      await form.resetFields();
      this.checkRelevant();
    }
  };

  onChangeFormItem = (v, mapKey, childKey) => {
    const { form, updateModalFilters } = this.props;
    form.setFieldsValue({ [childKey]: undefined });
    updateModalFilters(childKey, { [mapKey]: v });
  };

  isEdit() {
    const { record } = this.props;
    return record && Object.keys(record).length > 0;
  }

  renderFormItem({ key, type, title, user }) {
    const { form, record, table } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const targetTable = find(table, { key }) || {};
    const {
      form: formConfig = {},
      filters = [],
      mapKey,
      modalFilters,
      childKey
    } = targetTable;
    const enable = isFunction(formConfig.enable)
      ? formConfig.enable(getFieldsValue(), record)
      : true;

    if (!enable) {
      return null;
    }

    let initialValue = this.isEdit()
      ? type.formatFormValue(get(record, key))
      : type.getFormDefaultInitialValue();
    if (isFunction(formConfig.generateInitValue)) {
      initialValue = formConfig.generateInitValue(initialValue);
    }

    const commonEmptyRule = {
      required: !formConfig.optional,
      message: `${title}不能为空`
    };

    if (type.canCheckWhiteSpace()) {
      commonEmptyRule.whitespace = !formConfig.optional;
    }

    const children = type.canShowInForm()
      ? getFieldDecorator(mapKey, {
          initialValue,
          validateFirst: true,
          onChange: childKey
            ? v => this.onChangeFormItem(v, mapKey, childKey)
            : null,
          rules: [commonEmptyRule]
            .concat(type.getFormRules({ ...formConfig, title, user }))
            .concat(formConfig.rules || []),
          ...type.getFormExtraConfig()
        })(
          type.renderFormItem({
            ...formConfig,
            title,
            user,
            filters: modalFilters || filters,
            formFieldValues: getFieldsValue()
          })
        )
      : null;

    if (children) {
      return (
        <FormItem key={mapKey} label={title}>
          {children}
        </FormItem>
      );
    }

    return null;
  }

  render() {
    const { children, table, user, multipleKey } = this.props;

    const targetTable = multipleKey
      ? table.filter(({ mapKey }) => mapKey === multipleKey)
      : table.filter(
          ({ visibility }) =>
            (this.isEdit() && visibility.edit) ||
            (!this.isEdit() && visibility.create)
        );

    return (
      <ActivatorModal
        activator={children}
        title={this.isEdit() || multipleKey ? '编辑' : '添加'}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        <Form onSubmit={this.okHandler}>
          {targetTable.map(definition =>
            this.renderFormItem({ user, ...definition })
          )}
        </Form>
      </ActivatorModal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Form.create()(RecordModal));
