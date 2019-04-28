import React from 'react';
import PropTypes from 'prop-types';
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
    ssoToken: PropTypes.string,
    fileMaxSize: PropTypes.number, // 单位MB
    limit: PropTypes.shape({
      maxWidth: PropTypes.number,
      minWidth: PropTypes.number,
      maxHeight: PropTypes.number,
      minHeight: PropTypes.number,
    }),
    modalWidth: PropTypes.string,
    bucket: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    ssoToken: '',
    modalWidth: '500px',
    fileMaxSize: 5, // 单位MB
    bucket: '',
    limit: {
      maxWidth: 0,
      minWidth: 0,
      maxHeight: 0,
      minHeight: 0,
    },
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

  checkFile = (file) => {
    const {
      limit: {
        maxWidth, minWidth, maxHeight, minHeight,
      },
    } = this.props;
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();

        img.onload = () => {
          if (maxWidth > 0 && img.width > maxWidth) {
            reject(new Error(`图片宽度不能大于${maxWidth}`));
          } else if (minWidth > 0 && img.width < minWidth) {
            reject(new Error(`图片宽度不能小于${minWidth}`));
          } else if (maxHeight > 0 && img.height > maxHeight) {
            reject(new Error(`图片高度不能大于${maxHeight}`));
          } else if (minHeight > 0 && img.height < minHeight) {
            reject(new Error(`图片高度不能小于${minHeight}`));
          } else {
            resolve(file);
          }
        };

        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  uploadImage = async (options) => {
    const { ssoToken, onChange, bucket } = this.props;
    this.setState({
      imageLoading: true,
    });

    try {
      await this.checkFile(options.file);
      const url = await uploadImage(options.file, { ssoToken, bucket });
      onChange(url);
      this.setState({
        imageLoading: false,
      });
    } catch (e) {
      message.error(e.message || e);
      this.setState({
        imageLoading: false,
      });
    }
  }

  beforeUpload = (file) => {
    const { fileMaxSize } = this.props;
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLtMaxSize = file.size / 1024 / 1024 <= fileMaxSize;
    if (!(isJPG || isPNG)) {
      message.error('文件格式要求是JPEG/JPG或PNG');
    } else if (!isLtMaxSize) {
      message.error(`图片大小超过限制（${fileMaxSize}MB）`);
    }

    return (isJPG || isPNG) && isLtMaxSize;
  }

  render() {
    const {
      title, modalWidth, ssoToken, onChange, ...props
    } = this.props;
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
            {...props}
          >
            {fileList.length ? null : uploadButton}
          </Upload>
          <Modal
            width={modalWidth}
            visible={previewVisible}
            footer={null}
            onCancel={this.onClickCancel}
          >
            <img alt="" style={{ width: '100%', padding: '15px' }} src={previewImage} />
          </Modal>
        </Row>
      </Col>
    );
  }
}
