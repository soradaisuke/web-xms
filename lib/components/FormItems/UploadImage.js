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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _uploadImage2 = _interopRequireDefault(require("web-core/lib/uploadImage"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      previewImage: '',
      previewVisible: false,
      imageLoading: false,
      fileList: []
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
      var _this$props$limit = _this.props.limit,
          maxWidth = _this$props$limit.maxWidth,
          minWidth = _this$props$limit.minWidth,
          maxHeight = _this$props$limit.maxHeight,
          minHeight = _this$props$limit.minHeight;
      return new Promise(function (resolve, reject) {
        var fr = new FileReader();

        fr.onload = function () {
          var img = new Image();

          img.onload = function () {
            if (maxWidth > 0 && img.width > maxWidth) {
              reject(new Error("\u56FE\u7247\u5BBD\u5EA6\u4E0D\u80FD\u5927\u4E8E".concat(maxWidth)));
            } else if (minWidth > 0 && img.width < minWidth) {
              reject(new Error("\u56FE\u7247\u5BBD\u5EA6\u4E0D\u80FD\u5C0F\u4E8E".concat(minWidth)));
            } else if (maxHeight > 0 && img.height > maxHeight) {
              reject(new Error("\u56FE\u7247\u9AD8\u5EA6\u4E0D\u80FD\u5927\u4E8E".concat(maxHeight)));
            } else if (minHeight > 0 && img.height < minHeight) {
              reject(new Error("\u56FE\u7247\u9AD8\u5EA6\u4E0D\u80FD\u5C0F\u4E8E".concat(minHeight)));
            } else {
              resolve(file);
            }
          };

          img.src = fr.result;
        };

        fr.readAsDataURL(file);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "uploadImage", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(options) {
        var _this$props, ssoToken, onChange, bucket, url;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, ssoToken = _this$props.ssoToken, onChange = _this$props.onChange, bucket = _this$props.bucket;

                _this.setState({
                  imageLoading: true
                });

                _context.prev = 2;
                _context.next = 5;
                return _this.checkFile(options.file);

              case 5:
                _context.next = 7;
                return (0, _uploadImage2.default)(options.file, {
                  ssoToken: ssoToken,
                  bucket: bucket
                });

              case 7:
                url = _context.sent;
                onChange(url);

                _this.setState({
                  imageLoading: false
                });

                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](2);

                _message2.default.error(_context.t0.message || _context.t0);

                _this.setState({
                  imageLoading: false
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 12]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
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
  fileMaxSize: _propTypes.default.number,
  limit: _propTypes.default.shape({
    maxWidth: _propTypes.default.number,
    minWidth: _propTypes.default.number,
    maxHeight: _propTypes.default.number,
    minHeight: _propTypes.default.number
  }),
  modalWidth: _propTypes.default.string,
  bucket: _propTypes.default.string
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
  }
});