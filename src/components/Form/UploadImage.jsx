/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { generateDeviceId } from '@qt/web-common';
import ReactCrop from 'react-image-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Col, Row, Modal } from 'antd';
import { wrappedUploadImage as uploadImage } from '../../utils/uploadFile';
import getImageSize from '../../utils/getImageSize';
import showError from '../../utils/showError';
import 'react-image-crop/dist/ReactCrop.css';

class UploadImage extends React.PureComponent {
  static displayName = 'UploadImage';

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
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
    needCrop: PropTypes.bool,
    aspect: PropTypes.number,
  };

  static defaultProps = {
    value: undefined,
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
    needCrop: false,
    aspect: 0,
  };

  constructor(props) {
    super(props);
    const { aspect } = props;
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      cropParameter: {
        crop: {
          aspect,
          width: 60,
          x: 0,
          y: 0,
        },
        fileSrc: '',
        cropVisible: false,
        pixelCrop: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        fileLoading: false,
      },
      previewImage: '',
      previewVisible: false,
      imageLoading: false,
      fileList: null,
    };
  }

  componentDidMount() {
    this.initFileCheck();
  }

  componentDidUpdate(prevProps) {
    const { url, value } = this.props;
    const { url: preUrl, value: preValue } = prevProps;
    const { fileList } = this.state;
    const imageUrl = url || value || '';
    const preImageUrl = preUrl || preValue || '';
    if (!fileList) {
      this.initFileCheck();
    } else if (preImageUrl !== imageUrl) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        fileList: imageUrl ? [{ uid: imageUrl, url: imageUrl }] : [],
      });
    }
  }

  initFileCheck = () => {
    const {
      url,
      value,
      onChange,
      limit: { maxWidth, minWidth, maxHeight, minHeight },
    } = this.props;
    const imageUrl = url || value || '';
    if (!imageUrl) return;
    if (maxWidth || minWidth || maxHeight || minHeight) {
      getImageSize({ url: imageUrl }).then(({ width, height }) => {
        if (maxWidth > 0 && width > maxWidth) {
          onChange('');
        } else if (minWidth > 0 && width < minWidth) {
          onChange('');
        } else if (maxHeight > 0 && height > maxHeight) {
          onChange('');
        } else if (minHeight > 0 && height < minHeight) {
          onChange('');
        } else {
          this.setState({
            fileList: [{ uid: imageUrl, url: imageUrl }],
          });
        }
      });
    } else {
      this.setState({
        fileList: [{ uid: imageUrl, url: imageUrl }],
      });
    }
  };

  onClickPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  onClickRemove = () => {
    const { onChange } = this.props;
    onChange('');
  };

  onClickCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  checkFile = (file) => {
    const {
      limit: { maxWidth, minWidth, maxHeight, minHeight },
    } = this.props;

    if (!(maxWidth || minWidth || maxHeight || minHeight)) return null;
    return getImageSize({ file }).then(({ width, height }) => {
      if (maxWidth > 0 && width > maxWidth) {
        throw new Error(`图片宽度不能大于${maxWidth}`);
      } else if (minWidth > 0 && width < minWidth) {
        throw new Error(`图片宽度不能小于${minWidth}`);
      } else if (maxHeight > 0 && height > maxHeight) {
        throw new Error(`图片高度不能大于${maxHeight}`);
      } else if (minHeight > 0 && height < minHeight) {
        throw new Error(`图片高度不能小于${minHeight}`);
      } else {
        return file;
      }
    });
  };

  uploadImage = async (options) => {
    const { ssoToken, onChange, bucket, needCrop } = this.props;
    const {
      cropParameter: { pixelCrop },
    } = this.state;

    const upYunSyncPreprocessor = needCrop
      ? `/crop/${pixelCrop.width}x${pixelCrop.height}a${pixelCrop.x}a${pixelCrop.y}`
      : '';

    this.setState({
      imageLoading: true,
    });

    try {
      await this.checkFile(options.file);
      const url = await uploadImage(options.file, {
        ssoToken,
        bucket,
        upYunSyncPreprocessor,
        deviceId: generateDeviceId(),
      });
      onChange(url);
      this.setState({
        imageLoading: false,
      });
      this.setCropState({ cropVisible: false });
    } catch (e) {
      showError(e.message || e, '上传失败');
      this.setState({
        imageLoading: false,
      });
    }
  };

  setCropState = (cropParameter) => {
    this.setState((prevState) => ({
      cropParameter: {
        ...prevState.cropParameter,
        ...cropParameter,
      },
    }));
  };

  onCropChange = (crop, pixelCrop) => {
    this.setCropState({ crop, pixelCrop });
  };

  handleCropCancel = () => {
    this.setCropState({ cropVisible: false });
  };

  generateFileSrc = (file) =>
    new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', () =>
          reject(new Error('读取图片失败'))
        );
        reader.readAsDataURL(file);
      } catch {
        reject(new Error('读取图片失败'));
      }
    });

  customRequest = (options) => {
    // NOTE: customRequest不能是async方法
    const { needCrop } = this.props;
    if (needCrop) {
      this.setCropState({ fileLoading: true });
      this.generateFileSrc(options.file)
        .then((fileSrc) => {
          this.setCropState({
            fileSrc,
            cropVisible: true,
            handleCropOk: () => {
              this.uploadImage(options);
            },
            fileLoading: false,
          });
        })
        .catch((e) => {
          showError(e);
          this.setCropState({ fileLoading: false });
        });
    } else {
      this.uploadImage(options);
    }
  };

  beforeUpload = (file) => {
    const { fileMaxSize } = this.props;
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLtMaxSize = file.size / 1024 / 1024 <= fileMaxSize;
    if (!(isJPG || isPNG)) {
      showError('文件格式要求是JPEG/JPG或PNG');
    } else if (!isLtMaxSize) {
      showError(`图片大小超过限制（${fileMaxSize}MB）`);
    }

    return (isJPG || isPNG) && isLtMaxSize;
  };

  renderCropModal() {
    const {
      cropParameter: { fileSrc, crop, cropVisible, handleCropOk },
      imageLoading,
    } = this.state;
    return (
      <Modal
        title="裁剪图片"
        maskClosable={false}
        destroyOnClose
        visible={cropVisible}
        onCancel={this.handleCropCancel}
        onOk={handleCropOk}
        confirmLoading={imageLoading}
      >
        <ReactCrop
          keepSelection
          src={fileSrc}
          crop={crop}
          onChange={this.onCropChange}
        />
      </Modal>
    );
  }

  render() {
    const {
      title,
      modalWidth,
      ssoToken,
      onChange,
      needCrop,
      ...props
    } = this.props;
    const {
      previewVisible,
      previewImage,
      imageLoading,
      fileList,
      cropParameter: { fileLoading },
    } = this.state;
    const uploadButton = (
      <div>
        {imageLoading || fileLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Col>
        {title}
        <Row>
          <Upload
            listType="picture-card"
            accept="image/jpeg, image/png"
            fileList={fileList}
            customRequest={this.customRequest}
            onPreview={this.onClickPreview}
            onRemove={this.onClickRemove}
            beforeUpload={this.beforeUpload}
            {...props}
          >
            {fileList && fileList.length ? null : uploadButton}
          </Upload>
          <Modal
            width={modalWidth}
            visible={previewVisible}
            footer={null}
            onCancel={this.onClickCancel}
          >
            <img
              alt=""
              style={{ width: '100%', padding: '15px' }}
              src={previewImage}
            />
          </Modal>
          {needCrop && this.renderCropModal()}
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  ssoToken: state.user?.get('sso_token'),
});

export default connect(mapStateToProps)(UploadImage);
