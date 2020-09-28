import React from 'react';
import { Form } from 'antd';

export const EditableContext = React.createContext();

const EditableTableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export default Form.create()(EditableTableRow);