import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'dva';
import { ClickableDiv } from '@qt/react-core';
import './User.less';

class User extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    user: null
  };

  render() {
    const { user, logout } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <ClickableDiv onClick={logout}>退出登录</ClickableDiv>
            </Menu.Item>
          </Menu>
        }
      >
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

const mapDispatchToProps = dispatch => ({
  logout: async () =>
    dispatch({
      type: 'user/logout'
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
