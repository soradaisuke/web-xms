import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class RecordModal extends React.PureComponent {
  static displayName = 'RecordModal';

  static propTypes = {
    activator: PropTypes.node.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      visibility: PropTypes.oneOfType([
        PropTypes.shape({
          create: PropTypes.bool,
          edit: PropTypes.bool,
        }),
        PropTypes.bool,
      ]),
    })).isRequired,
    onOk: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  onOk = () => {
    const { form, record, onOk } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onOk({ ...record, ...values });
        this.hideModelHandler();
      }
    });
  };

  showModelHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  isEdit() {
    const { record: { id } } = this.props;
    return !!id;
  }

  renderFormItem({ key, type, title }) {
    const { form: { getFieldDecorator }, record } = this.props;

    let children;

    switch (type) {
      case 'text':
        children = getFieldDecorator(key, {
          initialValue: this.isEdit() ? record[key] : '',
          rules: [{ required: true, message: `${title}不能为空`, whitespace: true }],
        })(<Input />);
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
    const { activator, schema } = this.props;
    const { visible } = this.state;

    return (
      <span>
        <span role="button" tabIndex={0} onClick={this.showModelHandler} onKeyPress={this.showModelHandler}>
          { activator }
        </span>
        {
          visible && (
            <Modal
              title={this.isEdit() ? '编辑' : '添加'}
              visible={visible}
              onOk={this.onOk}
              onCancel={this.hideModelHandler}
            >
              <Form onSubmit={this.okHandler}>
                {
                  schema.filter(({ visibility }) => (
                    visibility && (visibility === true || (this.isEdit() && visibility.edit)
                      || (!this.isEdit() && visibility.create))
                  )).map(definition => this.renderFormItem({ ...definition }))
                }
              </Form>
            </Modal>
          )
        }
      </span>
    );
  }
}

export default Form.create()(RecordModal);
