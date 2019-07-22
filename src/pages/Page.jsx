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
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    children: null,
    className: '',
    errorMessage: '',
    isError: false,
    isLoading: false,
    user: null
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
    const name = user ? user.get('nickname') : '蜻蜓FM';
    const backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150px' width='150px'><text x='0' y='10' fill='rgba(0, 0, 0, 0.15)' font-size='16'>${name}</text></svg>")`;

    return <div className="watermark" style={{ backgroundImage }} />;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames('xms-page', className)}>
        {this.renderBackground()}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Page);
