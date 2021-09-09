import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { makeCancelablePromise } from '@qt/web-common';
import ActivatorModal from './ActivatorModal';

const FormItem = Form.Item;
const { TextArea } = Input;

class InputModal extends React.PureComponent {
  static displayName = 'InputModal';

  static propTypes = {
    ...ActivatorModal.propTypes,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    required: PropTypes.bool
  };

  static defaultProps = {
    required: true
  };

  componentWillUnmount() {
    if (this.onOkHandler) {
      this.onOkHandler.cancel();
    }
  }

  onOk = async () => {
    this.onOkHandler = makeCancelablePromise(
      new Promise((resolve, reject) => {
        const { form, onOk } = this.props;
        form.validateFields((err, { input }) => {
          if (!err) {
            resolve(onOk(input));
          }
          reject(err);
        });
      })
    );
    await this.onOkHandler;
  };

  onVisibleChange = () => {
    const { form } = this.props;
    form.resetFields(['input']);
  };

  render() {
    const { activator, title, form, required } = this.props;
    return (
      <ActivatorModal
        activator={activator}
        title={title}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        <Form>
          <FormItem key="input">
            {form.getFieldDecorator('input', {
              initialValue: '',
              rules: [
                {
                  required,
                  message: '输入不能为空',
                  whitespace: true
                }
              ]
            })(<TextArea autosize placeholder="请输入" />)}
          </FormItem>
        </Form>
      </ActivatorModal>
    );
  }
}

export default Form.create()(InputModal);
