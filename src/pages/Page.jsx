import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Alert, Spin } from 'antd';

function Page({ className, errorMessage, isLoading, isError, children }) {
  return (
    <div className={classNames('xms-page', className)}>
      {isError ? (
        <Alert
          showIcon
          description={errorMessage || '发生错误，请检查网络后重试'}
          message="错误"
          type="error"
        />
      ) : (
        <Spin className="xms-page-loading" spinning={isLoading} size="large">
          {children}
        </Spin>
      )}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};

Page.defaultProps = {
  children: null,
  className: '',
  errorMessage: '',
  isError: false,
  isLoading: false
};

export default React.memo(Page);
