import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { connect } from 'dva';
import {
  forEach,
  get,
  set,
  isFunction,
  isPlainObject,
  map,
  reduce,
  keys,
  concat
} from 'lodash';
import showError from '../utils/showError';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    },
    md: {
      span: 18,
      offset: 6
    }
  }
};

const generatePaths = object => {
  const paths = keys(object);
  return reduce(
    paths,
    (result, key) => {
      const value = object[key];
      if (isPlainObject(value)) {
        return concat(result, map(generatePaths(value), k => `${key}.${k}`));
      }
      return concat(result, [key]);
    },
    []
  );
};

class RecordForm extends React.PureComponent {
  static displayName = 'RecordForm';

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired
    }).isRequired,
    onOk: PropTypes.func.isRequired,
    renderActions: PropTypes.func,
    onRef: PropTypes.func,
    className: PropTypes.string,
    checkVisibility: PropTypes.bool,
    user: PropTypes.instanceOf(Immutable.Map),
    columns: PropTypes.instanceOf(Immutable.List),
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    records: PropTypes.array // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    className: '',
    onRef: null,
    checkVisibility: true,
    columns: Immutable.List(),
    renderActions: null,
    record: null,
    records: null,
    user: null
  };

  componentDidMount() {
    const { onRef } = this.props;
    if (isFunction(onRef)) {
      onRef(this);
    }
  }

  onOk = async customOnOk => {
    const { form, onOk, columns } = this.props;

    return new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const formatValues = {};
          forEach(generatePaths(values), key => {
            const value = get(values, key);
            const column = columns.find(c => c.getFormKey() === key);
            if (column) {
              const generateSubmitValue = column.getFormGenerateSubmitValue();
              if (generateSubmitValue && isFunction(generateSubmitValue)) {
                set(formatValues, key, generateSubmitValue(value));
              } else {
                set(formatValues, key, column.formatFormSubmitValue(value));
              }
            }
          });
          try {
            if (isFunction(customOnOk)) {
              await customOnOk(formatValues);
            } else {
              await onOk(formatValues);
            }
          } catch (e) {
            showError(e.message);
            resolve(false);
          }
          resolve(true);
        } else {
          reject();
        }
      });
    });
  };

  reset = () => {
    const { form } = this.props;
    return form.resetFields();
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
    const {
      user,
      columns,
      record,
      form,
      renderActions,
      className
    } = this.props;
    const values = form.getFieldsValue();

    return (
      <Form className={className} {...formItemLayout}>
        {columns.map(column => this.renderFormItem(column))}
        {renderActions && (
          <Form.Item {...tailFormItemLayout}>
            {renderActions({
              user,
              record,
              values,
              form: this
            })}
          </Form.Item>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Form.create()(RecordForm));
