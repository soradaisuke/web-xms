import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  Avatar, Menu, Dropdown, Icon,
} from 'antd';
import { connect } from 'dva';
import { generateUri } from 'web-core';
import { ClickableDiv } from 'react-core';
import Cookie from 'js-cookie';
import './User.less';


function onClickLogOut() {
  Cookie.remove('sso_token', { domain: '.qingtingfm.com' });
  window.location.replace(generateUri('//entry.qingtingfm.com/v1/sso/login.html', { return_url: generateUri(window.location.href, { auth: 1 }) }).href);
}

const menu = (
  <Menu>
    <Menu.Item>
      <ClickableDiv onClick={onClickLogOut}>退出登录</ClickableDiv>
    </Menu.Item>
  </Menu>
);

class User extends React.PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Immutable.Map),
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Dropdown overlay={menu}>
        <div className="user-wrapper">
          <Avatar className="avatar" src={user.get('avatar')} icon="user" />
          {user.get('nickname') }
          <Icon type="down" />
        </div>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(User);
