import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Immutable from 'immutable';
import { connect } from 'dva';
import { Alert, Spin } from 'antd';

class Page extends React.PureComponent {
  static displayName = 'Page';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    errorMessage: PropTypes.string,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.instanceOf(Immutable.Map),
    showWatermark: PropTypes.bool
  };

  static defaultProps = {
    children: null,
    className: '',
    errorMessage: '',
    isError: false,
    isLoading: false,
    user: null,
    showWatermark: false
  };

  renderContent() {
    const { isLoading, isError, errorMessage, children } = this.props;
    if (isError) {
      return (
        <Alert
          showIcon
          description={errorMessage || '发生错误，请检查网络后重试'}
          message="错误"
          type="error"
        />
      );
    }

    return (
      <Spin className="xms-page-loading" spinning={isLoading} size="large">
        {children}
      </Spin>
    );
  }

  renderBackground() {
    const { user } = this.props;

    let watermark = '蜻蜓FM';
    if (user) {
      watermark = `${watermark} ${user.get('nickname') || ''}`;

      const phone = user.get('phone');

      if (phone && phone.length >= 4) {
        watermark = `${watermark}${phone.substr(phone.length - 4, 4)}`;
      }
    }
    const backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150px' width='300px'><text x='50%' y='50%' fill='rgba(0, 0, 0, 0.1)' font-size='16'>${watermark}</text></svg>")`;

    return (
      <div className="watermark-wrapper">
        <div className="watermark" style={{ backgroundImage }} />
      </div>
    );
  }

  render() {
    const { className, showWatermark } = this.props;

    return (
      <div className={classNames('xms-page', className)}>
        {showWatermark && this.renderBackground()}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Page);
