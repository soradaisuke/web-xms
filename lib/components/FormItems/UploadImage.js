"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/upload/style");

var _upload = _interopRequireDefault(require("antd/lib/upload"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _uploadImage2 = _interopRequireDefault(require("web-core/lib/uploadImage"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _reactImageCrop = _interopRequireDefault(require("react-image-crop"));

require("react-image-crop/dist/ReactCrop.css");

var _getImageSize = _interopRequireDefault(require("../../utils/getImageSize"));

var UploadImage = function (_React$PureComponent) {
  (0, _inherits2.default)(UploadImage, _React$PureComponent);

  function UploadImage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, UploadImage);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UploadImage).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initFileCheck", function () {
      var _this$props = _this.props,
          url = _this$props.url,
          value = _this$props.value,
          onChange = _this$props.onChange,
          _this$props$limit = _this$props.limit,
          maxWidth = _this$props$limit.maxWidth,
          minWidth = _this$props$limit.minWidth,
          maxHeight = _this$props$limit.maxHeight,
          minHeight = _this$props$limit.minHeight;
      var imageUrl = url || value || '';
      if (!imageUrl) return;

      if (maxWidth || minWidth || maxHeight || minHeight) {
        (0, _getImageSize.default)({
          url: imageUrl
        }).then(function (_ref) {
          var width = _ref.width,
              height = _ref.height;

          if (maxWidth > 0 && width > maxWidth) {
            onChange('');
          } else if (minWidth > 0 && width < minWidth) {
            onChange('');
          } else if (maxHeight > 0 && height > maxHeight) {
            onChange('');
          } else if (minHeight > 0 && height < minHeight) {
            onChange('');
          } else {
            _this.setState({
              fileList: [{
                uid: _shortid.default.generate(),
                url: imageUrl
              }]
            });
          }
        });
      } else {
        _this.setState({
          fileList: [{
            uid: _shortid.default.generate(),
            url: imageUrl
          }]
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickPreview", function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickRemove", function () {
      var onChange = _this.props.onChange;
      onChange('');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickCancel", function () {
      _this.setState({
        previewVisible: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "checkFile", function (file) {
      var _this$props$limit2 = _this.props.limit,
          maxWidth = _this$props$limit2.maxWidth,
          minWidth = _this$props$limit2.minWidth,
          maxHeight = _this$props$limit2.maxHeight,
          minHeight = _this$props$limit2.minHeight;
      if (!(maxWidth || minWidth || maxHeight || minHeight)) return null;
      return (0, _getImageSize.default)({
        file: file
      }).then(function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;

        if (maxWidth > 0 && width > maxWidth) {
          throw new Error("\u56FE\u7247\u5BBD\u5EA6\u4E0D\u80FD\u5927\u4E8E".concat(maxWidth));
        } else if (minWidth > 0 && width < minWidth) {
          throw new Error("\u56FE\u7247\u5BBD\u5EA6\u4E0D\u80FD\u5C0F\u4E8E".concat(minWidth));
        } else if (maxHeight > 0 && height > maxHeight) {
          throw new Error("\u56FE\u7247\u9AD8\u5EA6\u4E0D\u80FD\u5927\u4E8E".concat(maxHeight));
        } else if (minHeight > 0 && height < minHeight) {
          throw new Error("\u56FE\u7247\u9AD8\u5EA6\u4E0D\u80FD\u5C0F\u4E8E".concat(minHeight));
        } else {
          return file;
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "uploadImage", function () {
      var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(options) {
        var _this$props2, ssoToken, onChange, bucket, needCrop, pixelCrop, upYunSyncPreprocessor, url;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = _this.props, ssoToken = _this$props2.ssoToken, onChange = _this$props2.onChange, bucket = _this$props2.bucket, needCrop = _this$props2.needCrop;
                pixelCrop = _this.state.cropParameter.pixelCrop;
                upYunSyncPreprocessor = needCrop ? "/crop/".concat(pixelCrop.width, "x").concat(pixelCrop.height, "a").concat(pixelCrop.x, "a").concat(pixelCrop.y) : '';

                _this.setState({
                  imageLoading: true
                });

                _context.prev = 4;
                _context.next = 7;
                return _this.checkFile(options.file);

              case 7:
                _context.next = 9;
                return (0, _uploadImage2.default)(options.file, {
                  ssoToken: ssoToken,
                  bucket: bucket,
                  upYunSyncPreprocessor: upYunSyncPreprocessor
                });

              case 9:
                url = _context.sent;
                onChange(url);

                _this.setState({
                  imageLoading: false
                });

                _this.setCropState({
                  cropVisible: false
                });

                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](4);

                _message2.default.error(_context.t0.message || _context.t0);

                _this.setState({
                  imageLoading: false
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 15]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setCropState", function (cropParameter) {
      _this.setState(function (prevState) {
        return {
          cropParameter: (0, _objectSpread2.default)({}, prevState.cropParameter, cropParameter)
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCropChange", function (crop, pixelCrop) {
      _this.setCropState({
        crop: crop,
        pixelCrop: pixelCrop
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleCropCancel", function () {
      _this.setCropState({
        cropVisible: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "generateFileSrc", function (file) {
      return new Promise(function (resolve, reject) {
        try {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            return resolve(reader.result);
          });
          reader.addEventListener('error', function () {
            return reject(new Error('读取图片失败'));
          });
          reader.readAsDataURL(file);
        } catch (_unused) {
          reject(new Error('读取图片失败'));
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "customRequest", function (options) {
      var needCrop = _this.props.needCrop;

      if (needCrop) {
        _this.setCropState({
          fileLoading: true
        });

        _this.generateFileSrc(options.file).then(function (fileSrc) {
          _this.setCropState({
            fileSrc: fileSrc,
            cropVisible: true,
            handleCropOk: function handleCropOk() {
              _this.uploadImage(options);
            },
            fileLoading: false
          });
        }).catch(function (e) {
          _message2.default.error(e);

          _this.setCropState({
            fileLoading: false
          });
        });
      } else {
        _this.uploadImage(options);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "beforeUpload", function (file) {
      var fileMaxSize = _this.props.fileMaxSize;
      var isJPG = file.type === 'image/jpeg';
      var isPNG = file.type === 'image/png';
      var isLtMaxSize = file.size / 1024 / 1024 <= fileMaxSize;

      if (!(isJPG || isPNG)) {
        _message2.default.error('文件格式要求是JPEG/JPG或PNG');
      } else if (!isLtMaxSize) {
        _message2.default.error("\u56FE\u7247\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF08".concat(fileMaxSize, "MB\uFF09"));
      }

      return (isJPG || isPNG) && isLtMaxSize;
    });
    var aspect = props.aspect;
    _this.state = {
      cropParameter: {
        crop: {
          aspect: aspect,
          width: 60,
          x: 0,
          y: 0
        },
        fileSrc: '',
        cropVisible: false,
        pixelCrop: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        fileLoading: false
      },
      previewImage: '',
      previewVisible: false,
      imageLoading: false,
      fileList: null
    };
    return _this;
  }

  (0, _createClass2.default)(UploadImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initFileCheck();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          url = _this$props3.url,
          value = _this$props3.value;
      var preUrl = prevProps.url,
          preValue = prevProps.value;
      var fileList = this.state.fileList;
      var imageUrl = url || value || '';
      var preImageUrl = preUrl || preValue || '';

      if (!fileList) {
        this.initFileCheck();
      } else if (preImageUrl !== imageUrl) {
        this.setState({
          fileList: imageUrl ? [{
            uid: _shortid.default.generate(),
            url: imageUrl
          }] : []
        });
      }
    }
  }, {
    key: "renderCropModal",
    value: function renderCropModal() {
      var _this$state = this.state,
          _this$state$cropParam = _this$state.cropParameter,
          fileSrc = _this$state$cropParam.fileSrc,
          crop = _this$state$cropParam.crop,
          cropVisible = _this$state$cropParam.cropVisible,
          handleCropOk = _this$state$cropParam.handleCropOk,
          imageLoading = _this$state.imageLoading;
      return _react.default.createElement(_modal.default, {
        title: "\u88C1\u526A\u56FE\u7247",
        maskClosable: false,
        destroyOnClose: true,
        visible: cropVisible,
        onCancel: this.handleCropCancel,
        onOk: handleCropOk,
        confirmLoading: imageLoading
      }, _react.default.createElement(_reactImageCrop.default, {
        keepSelection: true,
        src: fileSrc,
        crop: crop,
        onChange: this.onCropChange
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          title = _this$props4.title,
          modalWidth = _this$props4.modalWidth,
          ssoToken = _this$props4.ssoToken,
          onChange = _this$props4.onChange,
          needCrop = _this$props4.needCrop,
          props = (0, _objectWithoutProperties2.default)(_this$props4, ["title", "modalWidth", "ssoToken", "onChange", "needCrop"]);
      var _this$state2 = this.state,
          previewVisible = _this$state2.previewVisible,
          previewImage = _this$state2.previewImage,
          imageLoading = _this$state2.imageLoading,
          fileList = _this$state2.fileList,
          fileLoading = _this$state2.cropParameter.fileLoading;

      var uploadButton = _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
        type: imageLoading || fileLoading ? 'loading' : 'plus'
      }), _react.default.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20"));

      return _react.default.createElement(_col.default, null, title, _react.default.createElement(_row.default, null, _react.default.createElement(_upload.default, (0, _extends2.default)({
        listType: "picture-card",
        accept: "image/jpeg, image/png",
        fileList: fileList,
        customRequest: this.customRequest,
        onPreview: this.onClickPreview,
        onRemove: this.onClickRemove,
        beforeUpload: this.beforeUpload
      }, props), fileList && fileList.length ? null : uploadButton), _react.default.createElement(_modal.default, {
        width: modalWidth,
        visible: previewVisible,
        footer: null,
        onCancel: this.onClickCancel
      }, _react.default.createElement("img", {
        alt: "",
        style: {
          width: '100%',
          padding: '15px'
        },
        src: previewImage
      })), needCrop && this.renderCropModal()));
    }
  }]);
  return UploadImage;
}(_react.default.PureComponent);

exports.default = UploadImage;
(0, _defineProperty2.default)(UploadImage, "displayName", 'UploadImage');
(0, _defineProperty2.default)(UploadImage, "propTypes", {
  onChange: _propTypes.default.func,
  title: _propTypes.default.string,
  ssoToken: _propTypes.default.string,
  fileMaxSize: _propTypes.default.number,
  limit: _propTypes.default.shape({
    maxWidth: _propTypes.default.number,
    minWidth: _propTypes.default.number,
    maxHeight: _propTypes.default.number,
    minHeight: _propTypes.default.number
  }),
  modalWidth: _propTypes.default.string,
  bucket: _propTypes.default.string,
  needCrop: _propTypes.default.bool,
  aspect: _propTypes.default.number
});
(0, _defineProperty2.default)(UploadImage, "defaultProps", {
  title: '',
  ssoToken: '',
  modalWidth: '500px',
  fileMaxSize: 5,
  bucket: '',
  limit: {
    maxWidth: 0,
    minWidth: 0,
    maxHeight: 0,
    minHeight: 0
  },
  needCrop: false,
  aspect: 0
});