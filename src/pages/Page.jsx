import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Immutable from 'immutable';
import { connect } from 'dva';
import { range } from 'lodash';
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

    return (
      <div className="watermark">
        {range(100).map(i => (
          <div key={i}>{i % 2 === 0 ? '蜻蜓FM' : name}</div>
        ))}
      </div>
    );
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
