import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'dva';
import { ClickableDiv } from '@qt/react-core';
import Cookie from 'js-cookie';
import './User.less';

function onClickLogOut() {
  if (window.location.host.indexOf('qingtingfm.com') === -1) {
    Cookie.remove('sso_token', { domain: '.qingtingfm.com' });
  } else {
    Cookie.remove('sso_token', { domain: '.qingting.fm' });
  }
  window.location.reload();
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
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    user: null
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
          {user.get('nickname')}
          <Icon type="down" />
        </div>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(User);
