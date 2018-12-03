import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import shortId from 'shortid';
import { uploadImage } from 'web-core';
import {
  Upload, Icon, Col, Row, Modal, message,
} from 'antd';

export default class UploadImage extends React.PureComponent {
  static displayName = 'UploadImage';

  static propTypes = {
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    title: PropTypes.string,
    user: PropTypes.instanceOf(Immutable.Map),
  };

  static defaultProps = {
    title: '',
    user: null,
  };

  state = {
    previewImage: '',
    previewVisible: false,
    imageLoading: false,
    fileList: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const file = prevState.fileList && prevState.fileList.length ? prevState.fileList[0] : null;
    if (file) {
      if (!nextProps.url) {
        return ({ fileList: [] });
      }
      if (nextProps.url !== file.url) {
        return ({ fileList: [{ uid: shortId.generate(), url: nextProps.url }] });
      }
    } else if (nextProps.url) {
      return ({ fileList: [{ uid: shortId.generate(), url: nextProps.url }] });
    }
    return null;
  }

  onClickPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  onClickRemove = () => {
    const { onChange } = this.props;
    onChange('');
  }

  onClickCancel = () => {
    this.setState({
      previewVisible: false,
    });
  }

  uploadImage = (options) => {
    const { user, onChange } = this.props;
    this.setState({
      imageLoading: true,
    });
    uploadImage(options.file, { ssoToken: user ? user.get('sso_token') : '' })
      .then((url) => {
        onChange(url);
        this.setState({
          imageLoading: false,
        });
      }, (err) => {
        message.error(err);
        this.setState({
          imageLoading: false,
        });
      });
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isPNG)) {
      message.error('文件格式要求是JPEG/JPG或PNG');
    }

    return isJPG || isPNG;
  }

  render() {
    const { title } = this.props;
    const {
      previewVisible, previewImage, imageLoading, fileList,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type={imageLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Col>
        { title }
        <Row>
          <Upload
            listType="picture-card"
            accept="image/jpeg, image/png"
            fileList={fileList}
            customRequest={this.uploadImage}
            onPreview={this.onClickPreview}
            onRemove={this.onClickRemove}
            beforeUpload={this.beforeUpload}
          >
            {fileList.length ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.onClickCancel}>
            <img alt="" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Row>
      </Col>
    );
  }
}
