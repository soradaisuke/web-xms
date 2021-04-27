import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useEventCallback } from '@qt/react';
import { Form, Row } from 'antd';
import classNames from 'classnames';
import ActivatorModal from './ActivatorModal';
import ActionComponent from './Action';
import useUser from '../hooks/useUser';
import FormContext from '../contexts/FormContext';
import usePageConfig from '../hooks/usePageConfig';
import FormItem from './Form/FormItem';
import './RecordModal.less';
import useFormInitialValues from '../hooks/useFormInitialValues';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    md: {
      span: 18,
      offset: 6,
    },
  },
};

function RecordModal({
  children,
  onOk,
  columns,
  title,
  record,
  records,
  actions,
  className,
  checkEditable,
  checkCreatable,
  ...props
}) {
  const user = useUser();
  const [form] = Form.useForm();

  const { formProps } = usePageConfig();

  const isEdit = useMemo(
    () => record && Object.keys(record).length > 0,
    [record]
  );

  const cols = useMemo(() => {
    if (checkEditable) {
      return columns.filter((c) => c.canShowInEditFrom({ record, user }));
    }
    if (checkCreatable) {
      return columns.filter((c) => c.canShowInCreateFrom({ user }));
    }
    return columns;
  }, [columns, user, record, checkEditable, checkCreatable]);

  const defaultTilte = isEdit ? '编辑' : '新建';

  const onSubmit = useEventCallback(() => onOk(form), [form, onOk]);

  const onVisibleChange = useEventCallback((visible) => {
    if (!visible) {
      form.resetFields();
    }
  });

  const initialValues = useFormInitialValues({ record });

  return (
    <FormContext.Provider value={form}>
      <ActivatorModal
        {...props}
        className={classNames(className, 'xms-modal')}
        activator={children}
        title={title || defaultTilte}
        onOk={onSubmit}
        onVisibleChange={onVisibleChange}
      >
        <Form
          {...formItemLayout}
          {...formProps}
          initialValues={initialValues}
          preserve={false}
          form={form}
        >
          {cols.map((column, index) => (
            <FormItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${column.getTitle()}${index}`}
              isEdit={isEdit}
              record={record}
              column={column}
            />
          ))}
        </Form>
        {actions && actions.size > 0 && (
          <Form.Item {...tailFormItemLayout}>
            <Row type="flex" align="middle">
              {actions.map((a) => (
                <ActionComponent key={a.getKey()} action={a} record={record} />
              ))}
            </Row>
          </Form.Item>
        )}
      </ActivatorModal>
    </FormContext.Provider>
  );
}

RecordModal.propTypes = {
  children: PropTypes.node.isRequired,
  onOk: PropTypes.func.isRequired,
  className: PropTypes.string,
  checkEditable: PropTypes.bool,
  checkCreatable: PropTypes.bool,
  columns: PropTypes.instanceOf(Immutable.List),
  actions: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  records: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

RecordModal.defaultProps = {
  checkEditable: false,
  checkCreatable: false,
  className: '',
  actions: null,
  title: '',
  columns: Immutable.List(),
  record: null,
  records: null,
};

export default React.memo(RecordModal);
