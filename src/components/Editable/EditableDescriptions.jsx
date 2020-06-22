import React from 'react';
import { Form, Descriptions } from 'antd';
import { EditableContext } from './EditableTableRow';

const EditableDescriptions = props => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <Descriptions {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableDescriptions;
