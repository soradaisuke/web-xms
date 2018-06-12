import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Alert, Spin } from 'antd';
import './BasePage.less';

class Page extends React.PureComponent {
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
    if (this.props.isError) {
      return (
        <Alert
          showIcon
          description="This is an error message about copywriting."
          message="错误"
          type="error"
        />
      );
    }

    return <Spin className="xms-page-loading" spinning={this.props.isLoading} size="large">{this.props.children}</Spin>;
  }

  render() {
    return (
      <div className={classNames('xms-page', this.props.className)}>
        { this.renderContent() }
      </div>
    );
  }
}

export default BasePage;
