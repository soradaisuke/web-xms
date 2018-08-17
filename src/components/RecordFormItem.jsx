import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export default class RecordFormItem extends React.PureComponent {
  static displayName = 'RecordFormItem';

  static propTypes = {
    definition: PropTypes.shape({
      key: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number']),
      title: PropTypes.string.isRequired,
    }).isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  };

  renderItem() {
    const { definition: { key, type, title }, getFieldDecorator } = this.props;

    switch (type) {
      case 'text':
        return getFieldDecorator(key, {
          rules: [{ required: true, message: `${title}不能为空`, whitespace: true }],
        })(<Input />);
      default:
        return null;
    }
  }

  render() {
    const { definition: { title } } = this.props;

    return (
      <FormItem
        label={title}
      >
        {this.renderItem()}
      </FormItem>
    );
  }
}
