import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import { split, last } from 'lodash';
import { uploadFile } from '../../utils/upload';

class UploadFile extends React.PureComponent {
  static displayName = 'UploadFile';

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    generateFileName: PropTypes.func,
    title: PropTypes.string,
    ssoToken: PropTypes.string,
    platform: PropTypes.oneOf(['aliyun', 'upyun']),
  };

  static defaultProps = {
    value: undefined,
    generateFileName: null,
    title: '上传',
    ssoToken: '',
    platform: 'aliyun',
  };

  state = {
    loading: false,
  };

  onClickRemove = () => {
    const { onChange } = this.props;
    onChange('');
  };

  afterUpload = async (url, file) => {
    const { onChange } = this.props;
    console.log(url);
    try {
      await onChange(encodeURI(url), file);
      this.setState({ loading: false });
      message.info('上传成功');
    } catch (err) {
      message.error(err.message);
      if (!err.canceled) {
        this.setState({ loading: false });
      }
    }
  };

  customRequest = async (options) => {
    const { ssoToken, generateFileName, platform } = this.props;
    this.setState({
      loading: true,
    });

    try {
      const url = await uploadFile(options.file, {
        ssoToken,
        fileName: generateFileName ? generateFileName(options.file) : null,
        platform,
      });
      this.afterUpload(url, options.file);
    } catch (e) {
      message.error(e.message);
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const { title, value, onChange, ...props } = this.props;
    console.log(value);
    return (
      <Upload
        {...props}
        customRequest={this.customRequest}
        fileList={
          value
            ? [{ uid: value, name: last(split(value, '/')), url: value }]
            : []
        }
        onRemove={this.onClickRemove}
      >
        <Button type="primary" loading={loading}>
          <UploadOutlined />
          {title}
        </Button>
      </Upload>
    );
  }
}

const mapStateToProps = (state) => ({
  ssoToken: state.user?.get('sso_token'),
});

export default connect(mapStateToProps)(UploadFile);
