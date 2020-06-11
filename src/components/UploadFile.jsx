import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { makeCancelablePromise } from '@qt/web-core';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import { wrappedUploadFile as uploadFile } from '../utils/uploadFile';

class UploadFile extends React.PureComponent {
  static displayName = 'UploadFile';

  static propTypes = {
    afterUpload: PropTypes.func.isRequired,
    generateFileName: PropTypes.func,
    title: PropTypes.string,
    user: PropTypes.shape({
      get: PropTypes.func
    })
  };

  static defaultProps = {
    generateFileName: null,
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
    const { user, generateFileName } = this.props;
    this.setState({
      loading: true
    });

    makeCancelablePromise(
      uploadFile(options.file, {
        ssoToken: user ? user.get('sso_token') : '',
        fileName: generateFileName ? generateFileName(options.file) : null
      })
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
          <UploadOutlined />
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
