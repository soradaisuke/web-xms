import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Card, Row, Form } from 'antd';
import { router } from 'dva';
import Immutable from 'immutable';
import Page from './Page';
import useUser from '../hooks/useUser';
import FormContext from '../contexts/FormContext';
import usePageConfig from '../hooks/usePageConfig';
import ActionComponent from '../components/Action';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';
import FormItem from '../components/Form/FormItem';
import usePageData from '../hooks/usePageData';
import './RecordsPage.less';

const { useParams, useHistory } = router;

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

function RecordFormPage() {
  const pageData = usePageData();
  const { record } = pageData;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();

  const history = useHistory();

  const { formProps, idIdentifier, table, reset, fetch } = usePageConfig();

  const [form] = Form.useForm();

  const params = useParams();

  const id = params[idIdentifier];
  const isEdit = id !== 'new';

  const columns = useMemo(() => {
    if (isEdit) {
      return table
        .getColumns()
        .filter((c) => c.canShowInEditFrom({ record, user }));
    }
    return table.getColumns().filter((c) => c.canShowInCreateFrom({ user }));
  }, [isEdit, record, table, user]);

  // const onConfirmReset = useEventCallback(() => {
  //   form.resetFields();
  // }, [form]);

  const fetchInternal = useCallback(() => {
    if (fetch) {
      setIsLoading(true);
      setError(null);
      fetch({ id })
        .then(() => {
          setIsLoading(false);
          setError(null);
        })
        .catch((e) => {
          setIsLoading(true);
          setError(e);
        });
    }
  }, [fetch, id]);

  const renderActions = useMemo(() => {
    let result = Immutable.List([
      isEdit
        ? table.getEditAction()?.setLink(null)
        : table.getCreateAction()?.setLink(null),
    ]);
    result = result.concat(table.getFormActions());

    return isEdit && table.getDeleteAction()
      ? result.push(table.getDeleteAction())
      : result;
  }, [table, isEdit]);

  useEffect(() => {
    reset();

    if (isEdit) {
      fetchInternal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormContext.Provider value={form}>
      <Page
        isLoading={isLoading}
        isError={!!error}
        errorMessage={error ? error.message : ''}
      >
        <Card title={isEdit ? '编辑' : '新建'} className="content-card">
          {(!isEdit || record) && (
            <Form
              {...formItemLayout}
              scrollToFirstError
              {...formProps}
              initialValues={record}
              form={form}
            >
              {columns.map((column) => (
                <FormItem
                  isEdit={isEdit}
                  key={column.getTitle()}
                  record={record}
                  column={column}
                />
              ))}
              <Form.Item {...tailFormItemLayout}>
                <Row type="flex" align="middle" className="actions">
                  {/* <Popconfirm
                    key="重置"
                    title="确认重置表单？"
                    onConfirm={onConfirmReset}
                  >
                    <Button style={{ marginRight: 10 }} danger>
                      重置
                    </Button>
                  </Popconfirm> */}
                  {renderActions.map((a) => (
                    <ActionComponent
                      key={a.getKey()}
                      disabledRecordModal={
                        a instanceof CreateAction || a instanceof EditAction
                      }
                      action={a}
                      record={record}
                      loading={isLoading}
                      reload={a instanceof EditAction ? fetchInternal : null}
                      onComplete={
                        // eslint-disable-next-line no-nested-ternary
                        a instanceof CreateAction || a instanceof DeleteAction
                          ? history.goBack
                          : null
                      }
                    />
                  ))}
                </Row>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Page>
    </FormContext.Provider>
  );
}

export default React.memo(RecordFormPage);
