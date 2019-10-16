import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { uploadFile, makeCancelablePromise } from '@qt/web-core';
import { Upload, Icon, message, Button } from 'antd';

class UploadFile extends React.PureComponent {
  static displayName = 'UploadFile';

  static propTypes = {
    title: PropTypes.string.isRequired,
    postFileUrl: PropTypes.func.isRequired,
    user: PropTypes.shape({
      get: PropTypes.func
    })
  };

  static defaultProps = {
    user: null
  };

  state = {
    loading: false
  };

  postFileUrl = async url => {
    const { postFileUrl } = this.props;
    try {
      await makeCancelablePromise(postFileUrl(url));
      this.setState({ loading: false });
      message.info('上传文件成功');
    } catch (err) {
      message.error(err.message);
      if (!err.canceled) {
        this.setState({ loading: false });
      }
    }
  };

  upload = options => {
    const { user } = this.props;
    this.setState({
      loading: true
    });
    makeCancelablePromise(
      uploadFile(options.file, { ssoToken: user ? user.get('sso_token') : '' })
    ).then(
      url => {
        this.postFileUrl(url, options.file);
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
        accept=".csv, .xls, .xlsx"
        customRequest={this.upload}
        showUploadList={false}
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
