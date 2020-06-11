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
        return concat(
          result,
          map(generatePaths(value), k => `${key}.${k}`)
        );
      }
      return concat(result, [key]);
    },
    []
  );
};

class RecordForm extends React.PureComponent {
  static displayName = 'RecordForm';

  static propTypes = {
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

  form = React.createRef();

  constructor(props) {
    super(props);

    if (props.columns) {
      props.columns.forEach(column => column.resetFilters());
    }
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (isFunction(onRef)) {
      onRef(this);
    }
  }

  onOk = customOnOk => {
    const { onOk, columns } = this.props;

    return this.form.current.validateFields().then(async values => {
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
        return true;
      } catch (e) {
        return false;
      }
    });
  };

  reset = () => {
    this.form.current.resetFields();
  };

  isEdit() {
    const { record, records } = this.props;
    return (
      (record && Object.keys(record).length > 0) ||
      (records && records.length > 0)
    );
  }

  renderFormItem(column) {
    const { user, record, checkVisibility } = this.props;

    return column.renderInForm({
      user,
      record,
      form: this.form.current,
      checkVisibility,
      isEdit: this.isEdit()
    });
  }

  render() {
    const { user, columns, record, renderActions, className } = this.props;
    const values = this.form.current ? this.form.current.getFieldsValue() : {};

    return (
      <Form className={className} ref={this.form} {...formItemLayout}>
        {columns.map(column => this.renderFormItem(column))}
        {renderActions && (
          <Form.Item {...tailFormItemLayout}>
            {renderActions({
              user,
              record,
              values,
              form: this.form.current
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

export default connect(mapStateToProps)(RecordForm);
