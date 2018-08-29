import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Avatar } from 'antd';
import { connect } from 'dva';
import './User.less';

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
      <div className="user-wrapper">
        <Avatar className="avatar" src={user.get('avatar')} icon="user" />
        {user.get('nickname')}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(User);
