import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Alert, Spin } from 'antd';
import './Page.less';

export default class Page extends React.PureComponent {
  static displayName = 'Page';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    className: '',
    isError: false,
    isLoading: false,
  };

  renderContent() {
    const { isLoading, isError, children } = this.props;
    if (isError) {
      return (
        <Alert
          showIcon
          description="This is an error message about copywriting."
          message="错误"
          type="error"
        />
      );
    }

    return <Spin className="xms-page-loading" spinning={isLoading} size="large">{children}</Spin>;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames('xms-page', className)}>
        { this.renderContent() }
      </div>
    );
  }
}
