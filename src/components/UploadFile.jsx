import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { uploadFile, makeCancelablePromise } from '@qt/web-core';
import { Upload, Icon, message, Button } from 'antd';

class UploadFile extends React.PureComponent {
  static displayName = 'UploadFile';

  static propTypes = {
    afterUpload: PropTypes.func.isRequired,
    title: PropTypes.string,
    user: PropTypes.shape({
      get: PropTypes.func
    })
  };

  static defaultProps = {
    title: '上传',
    user: null
  };

  state = {
    loading: false
  };

  afterUpload = async (url, file) => {
    const { afterUpload } = this.props;
    try {
      await makeCancelablePromise(afterUpload(url, file));
      this.setState({ loading: false });
      message.info('上传成功');
    } catch (err) {
      message.error(err.message);
      if (!err.canceled) {
        this.setState({ loading: false });
      }
    }
  };

  customRequest = options => {
    const { user } = this.props;
    this.setState({
      loading: true
    });
    makeCancelablePromise(
      uploadFile(options.file, { ssoToken: user ? user.get('sso_token') : '' })
    ).then(
      url => {
        this.afterUpload(url, options.file);
      },
      err => {
        message.error(err.message);
        if (!err.canceled) {
          this.setState({ loading: false });
        }
      }
    );
  };

  render() {
    const { loading } = this.state;
    const { title } = this.props;
    return (
      <Upload
        customRequest={this.customRequest}
        showUploadList={false}
        {...this.props}
      >
        <Button type="primary" loading={loading}>
          <Icon type="upload" />
          {title}
        </Button>
      </Upload>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UploadFile);
