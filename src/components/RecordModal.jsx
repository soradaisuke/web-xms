import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useEventCallback } from '@qt/react';
import { Form, Row } from 'antd';
import ActivatorModal from './ActivatorModal';
import ActionComponent from './Action';
import useUser from '../hooks/useUser';
import FormContext from '../contexts/FormContext';
import usePageConfig from '../hooks/usePageConfig';
import FormItem from './Form/FormItem';

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

function RecordModal({
  children,
  onOk,
  columns,
  title,
  record,
  records,
  actions,
  ...props
}) {
  const user = useUser();
  const [form] = Form.useForm();

  const { formProps } = usePageConfig();

  const cols = useMemo(() => {
    if (record && Object.keys(record).length > 0) {
      return columns.filter(c => c.canShowInEditFrom({ record, user }));
    }
    if (records && records.length > 0) {
      return columns;
    }
    return columns.filter(c => c.canShowInCreateFrom({ user }));
  }, [columns, record, records, user]);

  const isEdit = useMemo(
    () =>
      (record && Object.keys(record).length > 0) ||
      (records && records.length > 0),
    [record, records]
  );

  const defaultTilte = isEdit ? '编辑' : '新建';

  const onSubmit = useEventCallback(() => onOk(form), [form, onOk]);

  return (
    <FormContext.Provider value={form}>
      <ActivatorModal
        {...props}
        destroyOnClose
        activator={children}
        title={title || defaultTilte}
        onOk={onSubmit}
      >
        <Form {...formItemLayout} {...formProps} form={form}>
          {cols.map(column => (
            <FormItem key={column.getTitle()} record={record} column={column} />
          ))}
        </Form>
        {
          actions && actions.size > 0 && (
            <Form.Item {...tailFormItemLayout}>
              <Row type="flex" align="middle">
                {actions.map(a => (
                  <ActionComponent
                    key={a.getTitle()}
                    action={a}
                    record={record}
                  />
                ))}
              </Row>
            </Form.Item>
          )
        }
      </ActivatorModal>
    </FormContext.Provider>
  );
}

RecordModal.propTypes = {
  children: PropTypes.node.isRequired,
  onOk: PropTypes.func.isRequired,
  columns: PropTypes.instanceOf(Immutable.List),
  actions: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  records: PropTypes.array // eslint-disable-line react/forbid-prop-types
};

RecordModal.defaultProps = {
  actions: null,
  title: '',
  columns: Immutable.List(),
  record: null,
  records: null
};

export default React.memo(RecordModal);
