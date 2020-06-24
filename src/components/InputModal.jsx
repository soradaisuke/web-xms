import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { makeCancelablePromise } from '@qt/web-common';
import ActivatorModal from './ActivatorModal';

const FormItem = Form.Item;
const { TextArea } = Input;

function InputModal({ activator, title, required, onOk }) {
  const [form] = Form.useForm();
  const onOkHandler = useRef();
  const onOkCallback = useCallback(async () => {
    onOkHandler.current = makeCancelablePromise(
      form.validateFields().then(({ input }) => onOk(input))
    );
    await onOkHandler.current;
  }, [form, onOk]);
  const onVisibleChange = useCallback(() => form.resetFields(['input']), [
    form
  ]);

  useEffect(() => () => onOkHandler.current?.cancel(), []);

  return (
    <ActivatorModal
      activator={activator}
      title={title}
      onOk={onOkCallback}
      onVisibleChange={onVisibleChange}
    >
      <Form form={form}>
        <FormItem
          key="input"
          name="input"
          initialValue=""
          rules={[
            {
              required,
              message: '输入不能为空',
              whitespace: true
            }
          ]}
        >
          <TextArea autosize placeholder="请输入" />
        </FormItem>
      </Form>
    </ActivatorModal>
  );
}

InputModal.propTypes = {
  activator: PropTypes.node.isRequired,
  onOk: PropTypes.func.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool
};

InputModal.defaultProps = {
  title: '',
  required: true
};

export default React.memo(InputModal);
