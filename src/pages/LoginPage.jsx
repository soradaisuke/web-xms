import React, { useCallback } from 'react';
import { parse } from 'query-string';
import { useSelector, useDispatch } from 'dva';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import showError from '../utils/showError';
import './LoginPage.less';

function LoginPage() {
  const isLoading = useSelector(state => state.loading.effects['user/login']);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onClickLogin = useCallback(() => {
    form
      .validateFields()
      .then(values =>
        dispatch({
          type: 'user/login',
          payload: values
        })
          .then(() => {
            const queries = parse(window.location.search);
            window.location.replace(
              queries.return_url ? queries.return_url : window.location.origin
            );
          })
          .catch(e => showError(e.message))
      )
      .catch(() => {
        //
      });
  }, [dispatch, form]);

  return (
    <div className="login-form-wrapper">
      <Form className="login-form" form={form}>
        <div className="logo" />
        <Form.Item
          key="account"
          className="login-form-item"
          name="account"
          rules={[{ required: true, message: '请输入账号', whitespace: true }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入账号"
            className="login-input-area"
          />
        </Form.Item>
        <Form.Item
          key="password"
          className="login-form-item"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            type="password"
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            className="login-input-area"
            placeholder="请输入密码"
            onPressEnter={onClickLogin}
          />
        </Form.Item>
        <Button
          type="danger"
          className="login-button"
          style={{ width: '100%' }}
          onClick={onClickLogin}
          loading={isLoading}
        >
          登录
        </Button>
      </Form>
    </div>
  );
}

export default React.memo(LoginPage);
