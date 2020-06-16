import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Form, Button } from 'antd';
import { useEventCallback } from '@qt/react';
import { useParams, useHistory } from 'react-router-dom';
import TableType from '../schema/Table';
import Page from './Page';
import TableActions from '../actions/TableActions';
import useUser from '../hooks/useUser';
import ConfirmButton from '../components/Common/ConfirmButton';
import visiblePromise from '../utils/visiblePromise';
import formatColumnsSubmitValues from '../utils/formatColumnsSubmitValues';
import FormContext from '../contexts/FormContext';
import './RecordsPage.less';

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

function RecordFormPage({
  record,
  table,
  actions,
  reset,
  fetch,
  create,
  edit
}) {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(null);

  const user = useUser();

  const history = useHistory();

  const [form] = Form.useForm();

  const { id } = useParams();
  const isEdit = id !== 'new';

  const columns = table.getColumns();

  const onConfirmReset = useEventCallback(() => {
    form.resetFields();
  }, [form]);

  const fetchInternal = useCallback(() => {
    if (fetch) {
      setIsLoading(true);
      setError(null);
      fetch({ id })
        .then(() => {
          setIsLoading(false);
          setError(null);
        })
        .catch(e => {
          setIsLoading(true);
          setError(e);
        });
    }
  }, [fetch, id]);

  const onFinish = useEventCallback(values => {
    const handler = action.getHandler({ create, edit });

    return visiblePromise({
      promise: handler({
        body: formatColumnsSubmitValues({ columns, values }),
        id
      }),
      onComplete: history.goBack,
      loadingMessage: action.getHandlingMessage(),
      successMessage: '保存成功',
      throwError: true
    });
  }, [id, create, edit, action, columns]);

  useEffect(() => {
    setAction(isEdit ? actions.getEditAction() : actions.getCreateAction());

    reset();

    if (isEdit) {
      fetchInternal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormContext.Provider value={form}>
      <Page
        showWatermark
        isLoading={isLoading}
        isError={!!error}
        errorMessage={error ? error.message : ''}
      >
        <Card title={action?.getTitle() || ''} className="content-card">
          <Form
            {...formItemLayout}
            scrollToFirstError
            form={form}
            onFinish={onFinish}
          >
            {columns.map(column => (
              column.renderInForm({
                user,
                record,
                form,
                isEdit
              })
            ))}
            <Form.Item {...tailFormItemLayout}>
              <Row type="flex" align="middle">
                <ConfirmButton
                  title="确认放弃所编辑的内容返回上一页？"
                  onOk={history.goBack}
                >
                  返回
                </ConfirmButton>
                <ConfirmButton
                  danger
                  type="primary"
                  className="form-action"
                  disabled={isLoading}
                  title="确认重置？"
                  onOk={onConfirmReset}
                >
                  重置
                </ConfirmButton>
                <Button
                  className="form-action"
                  disabled={isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Page>
    </FormContext.Provider>
  );
}

RecordFormPage.propTypes = {
  actions: PropTypes.instanceOf(TableActions).isRequired,
  table: PropTypes.instanceOf(TableType).isRequired,
  reset: PropTypes.func,
  fetch: PropTypes.func,
  create: PropTypes.func,
  edit: PropTypes.func,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

RecordFormPage.defaultProps = {
  reset: null,
  fetch: null,
  create: null,
  edit: null,
  record: null
}

export default React.memo(RecordFormPage);
