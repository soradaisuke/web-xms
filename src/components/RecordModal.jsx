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
  ...props
}) {
  const user = useUser();
  const [form] = Form.useForm();

  const { formProps } = usePageConfig();

  const cols = useMemo(() => {
    if (record && Object.keys(record).length > 0) {
      return columns.filter((c) => c.canShowInEditFrom({ record, user }));
    }
    if (records && records.length > 0) {
      return columns;
    }
    return columns.filter((c) => c.canShowInCreateFrom({ user }));
  }, [columns, record, records, user]);

  const isEdit = useMemo(
    () =>
      (record && Object.keys(record).length > 0) ||
      (records && records.length > 0),
    [record, records]
  );

  const defaultTilte = isEdit ? '编辑' : '新建';

  const onSubmit = useEventCallback(() => onOk(form), [form, onOk]);

  const onVisibleChange = useEventCallback((visible) => {
    if (!visible) {
      form.resetFields();
    }
  });

  const onValuesChange = useEventCallback(
    (...args) => formProps?.onValuesChange?.(...args, form),
    [formProps]
  );

  return (
    <FormContext.Provider value={form}>
      <ActivatorModal
        {...props}
        className={classNames(className, 'xms-modal')}
        destroyOnClose
        activator={children}
        title={title || defaultTilte}
        onOk={onSubmit}
        onVisibleChange={onVisibleChange}
      >
        <Form
          {...formItemLayout}
          {...formProps}
          onValuesChange={onValuesChange}
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
                <ActionComponent
                  key={a.getTitle()}
                  action={a}
                  record={record}
                />
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
  columns: PropTypes.instanceOf(Immutable.List),
  actions: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  records: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

RecordModal.defaultProps = {
  className: '',
  actions: null,
  title: '',
  columns: Immutable.List(),
  record: null,
  records: null,
};

export default React.memo(RecordModal);
