import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useEventCallback } from '@qt/react';
import { Form } from 'antd';
import ActivatorModal from './ActivatorModal';
import useUser from '../hooks/useUser';
import formatColumnsSubmitValues from '../utils/formatColumnsSubmitValues';
import FormContext from '../contexts/FormContext';
import usePageConfig from '../hooks/usePageConfigContext';

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

function RecordModal({
  children,
  onOk,
  checkVisibility,
  columns,
  title,
  record,
  records,
  ...props
}) {

  const [form] = Form.useForm();

  const user = useUser();

  const { formProps } = usePageConfig();

  const isEdit = useMemo(() => (
    (record && Object.keys(record).length > 0) ||
    (records && records.length > 0)
  ), [record, records]);

  const defaultTilte = isEdit ? '编辑' : '新建';

  const onVisibleChange = useEventCallback(visibility => {
    if (visibility && form) {
      form.resetFields();
    }
  }, [form]);

  const onSubmit = useEventCallback(() => {
    return form
      .validateFields()
      .then(async values => {
        try {
          await onOk(formatColumnsSubmitValues({
            columns,
            values
          }));
          return true;
        } catch (e) {
          return false;
        }
      }, () => {
        // Validate Failed
        return Promise.reject();
      });
  }, [form, onOk, columns])

  return (
    <FormContext.Provider value={form}>
      <ActivatorModal
        {...props}
        activator={children}
        title={title || defaultTilte}
        onOk={onSubmit}
        onVisibleChange={onVisibleChange}
      >
        <Form
          {...formItemLayout}
          {...formProps}
          form={form}
        >
          {columns.map(column => (
            column.renderInForm({
              user,
              record,
              records,
              form,
              isEdit,
              checkVisibility
            })
          ))}
        </Form>
      </ActivatorModal>
    </FormContext.Provider>
  );
}

RecordModal.propTypes = {
  children: PropTypes.node.isRequired,
  onOk: PropTypes.func.isRequired,
  checkVisibility: PropTypes.bool,
  columns: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  records: PropTypes.array // eslint-disable-line react/forbid-prop-types
}

RecordModal.defaultProps = {
  title: '',
  checkVisibility: true,
  columns: Immutable.List(),
  record: null,
  records: null
};

export default React.memo(RecordModal);
