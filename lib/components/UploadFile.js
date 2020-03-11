"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/upload/style");

var _upload = _interopRequireDefault(require("antd/lib/upload"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _makeCancelablePromise2 = _interopRequireDefault(require("@qt/web-core/lib/makeCancelablePromise"));

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

var _dva = require("dva");

var _uploadFile = require("../utils/uploadFile");

var UploadFile = function (_React$PureComponent) {
  (0, _inherits2.default)(UploadFile, _React$PureComponent);

  function UploadFile() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, UploadFile);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(UploadFile)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      loading: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "afterUpload", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(url, file) {
        var afterUpload;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                afterUpload = _this.props.afterUpload;
                _context.prev = 1;
                _context.next = 4;
                return (0, _makeCancelablePromise2.default)(afterUpload(url, file));

              case 4:
                _this.setState({
                  loading: false
                });

                _message2.default.info('上传成功');

                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                _message2.default.error(_context.t0.message);

                if (!_context.t0.canceled) {
                  _this.setState({
                    loading: false
                  });
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "customRequest", function (options) {
      var _this$props = _this.props,
          user = _this$props.user,
          generateFileName = _this$props.generateFileName;

      _this.setState({
        loading: true
      });

      (0, _makeCancelablePromise2.default)((0, _uploadFile.wrappedUploadFile)(options.file, {
        ssoToken: user ? user.get('sso_token') : '',
        fileName: generateFileName ? generateFileName(options.file) : null
      })).then(function (url) {
        _this.afterUpload(url, options.file);
      }, function (err) {
        _message2.default.error(err.message);

        if (!err.canceled) {
          _this.setState({
            loading: false
          });
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(UploadFile, [{
    key: "render",
    value: function render() {
      var loading = this.state.loading;
      var title = this.props.title;
      return _react.default.createElement(_upload.default, (0, _extends2.default)({
        customRequest: this.customRequest,
        showUploadList: false
      }, this.props), _react.default.createElement(_button.default, {
        type: "primary",
        loading: loading
      }, _react.default.createElement(_icon.default, {
        type: "upload"
      }), title));
    }
  }]);
  return UploadFile;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(UploadFile, "displayName", 'UploadFile');
(0, _defineProperty2.default)(UploadFile, "propTypes", {
  afterUpload: _propTypes.default.func.isRequired,
  generateFileName: _propTypes.default.func,
  title: _propTypes.default.string,
  user: _propTypes.default.shape({
    get: _propTypes.default.func
  })
});
(0, _defineProperty2.default)(UploadFile, "defaultProps", {
  generateFileName: null,
  title: '上传',
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(UploadFile);

exports.default = _default;