import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Input, Form, Icon } from 'antd';
import './LoginPage.less';
import { parse } from 'query-string';

const FormItem = Form.Item;

class LoginPage extends React.PureComponent {
  static displayName = 'LoginPage';

  static propTypes = {
    login: PropTypes.func.isRequired,
    form: PropTypes.shape({
      setFields: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    isLoading: false
  };

  login = async values => {
    const { login } = this.props;
    const queries = parse(window.location.search);
    try {
      await login(values);
      window.location.replace(
        queries.return_url ? queries.return_url : window.location.origin
      );
    } catch (e) {
      throw e;
    }
  };

  onClickLogin = () => {
    const {
      form: { validateFieldsAndScroll }
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isLoading
    } = this.props;
    return (
      <div className="login-form-wrapper">
        <Form className="login-form">
          <div className="logo" />
          <FormItem key="account" className="login-form-item">
            {getFieldDecorator('account', {
              rules: [
                { required: true, message: '请输入账号', whitespace: true }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入账号"
                className="login-input-area"
              />
            )}
          </FormItem>
          <FormItem key="password" className="login-form-item">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                className="login-input-area"
                placeholder="请输入密码"
                onPressEnter={this.onClickLogin}
              />
            )}
          </FormItem>
          <Button
            type="danger"
            className="login-button"
            style={{ width: '100%' }}
            onClick={this.onClickLogin}
            loading={isLoading}
          >
            登录
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects['user/login']
});

const mapDispatchToProps = dispatch => ({
  login: async ({ account, password }) =>
    dispatch({
      type: 'user/login',
      payload: { account, password }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LoginPage));
