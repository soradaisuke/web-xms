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

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/upload/style");

var _upload = _interopRequireDefault(require("antd/lib/upload"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _uploadImage2 = _interopRequireDefault(require("web-core/lib/uploadImage"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var UploadImage = function (_React$PureComponent) {
  (0, _inherits2.default)(UploadImage, _React$PureComponent);

  function UploadImage() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, UploadImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(UploadImage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      previewImage: '',
      previewVisible: false,
      imageLoading: false,
      fileList: []
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickPreview", function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickRemove", function () {
      var onChange = _this.props.onChange;
      onChange('');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickCancel", function () {
      _this.setState({
        previewVisible: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "uploadImage", function (options) {
      var _this$props = _this.props,
          ssoToken = _this$props.ssoToken,
          onChange = _this$props.onChange,
          bucket = _this$props.bucket;

      _this.setState({
        imageLoading: true
      });

      (0, _uploadImage2.default)(options.file, {
        ssoToken: ssoToken,
        bucket: bucket
      }).then(function (url) {
        onChange(url);

        _this.setState({
          imageLoading: false
        });
      }, function (err) {
        _message2.default.error(err);

        _this.setState({
          imageLoading: false
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "beforeUpload", function (file) {
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
    return _this;
  }

  (0, _createClass2.default)(UploadImage, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          modalWidth = _this$props2.modalWidth,
          ssoToken = _this$props2.ssoToken,
          onChange = _this$props2.onChange,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["title", "modalWidth", "ssoToken", "onChange"]);
      var _this$state = this.state,
          previewVisible = _this$state.previewVisible,
          previewImage = _this$state.previewImage,
          imageLoading = _this$state.imageLoading,
          fileList = _this$state.fileList;

      var uploadButton = _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
        type: imageLoading ? 'loading' : 'plus'
      }), _react.default.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20"));

      return _react.default.createElement(_col.default, null, title, _react.default.createElement(_row.default, null, _react.default.createElement(_upload.default, (0, _extends2.default)({
        listType: "picture-card",
        accept: "image/jpeg, image/png",
        fileList: fileList,
        customRequest: this.uploadImage,
        onPreview: this.onClickPreview,
        onRemove: this.onClickRemove,
        beforeUpload: this.beforeUpload
      }, props), fileList.length ? null : uploadButton), _react.default.createElement(_modal.default, {
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
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var file = prevState.fileList && prevState.fileList.length ? prevState.fileList[0] : null;

      if (file) {
        if (!nextProps.url) {
          return {
            fileList: []
          };
        }

        if (nextProps.url !== file.url) {
          return {
            fileList: [{
              uid: _shortid.default.generate(),
              url: nextProps.url
            }]
          };
        }
      } else if (nextProps.url) {
        return {
          fileList: [{
            uid: _shortid.default.generate(),
            url: nextProps.url
          }]
        };
      }

      return null;
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
  modalWidth: _propTypes.default.string,
  fileMaxSize: _propTypes.default.number,
  bucket: _propTypes.default.string
});
(0, _defineProperty2.default)(UploadImage, "defaultProps", {
  title: '',
  ssoToken: '',
  fileMaxSize: 5,
  modalWidth: '500px',
  bucket: ''
});