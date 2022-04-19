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

var _UploadOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/UploadOutlined"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _upload2 = require("../../utils/upload");

var _constants = require("../../constants");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var UploadFile = function (_React$PureComponent) {
  (0, _inherits2.default)(UploadFile, _React$PureComponent);

  var _super = _createSuper(UploadFile);

  function UploadFile() {
    var _this;

    (0, _classCallCheck2.default)(this, UploadFile);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      loading: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickRemove", function () {
      var onChange = _this.props.onChange;
      onChange('');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "afterUpload", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(url, file) {
        var onChange;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onChange = _this.props.onChange;
                console.log(url);
                _context.prev = 2;
                _context.next = 5;
                return onChange(encodeURI(url), file);

              case 5:
                _this.setState({
                  loading: false
                });

                _message2.default.info('上传成功');

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

                _message2.default.error(_context.t0.message);

                if (!_context.t0.canceled) {
                  _this.setState({
                    loading: false
                  });
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "customRequest", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(options) {
        var _this$props, ssoToken, generateFileName, platform, url;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, ssoToken = _this$props.ssoToken, generateFileName = _this$props.generateFileName, platform = _this$props.platform;

                _this.setState({
                  loading: true
                });

                _context2.prev = 2;
                _context2.next = 5;
                return (0, _upload2.uploadFile)(options.file, {
                  ssoToken: ssoToken,
                  fileName: generateFileName ? generateFileName(options.file) : null,
                  platform: platform
                });

              case 5:
                url = _context2.sent;

                _this.afterUpload(url, options.file);

                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);

                _message2.default.error(_context2.t0.message);

                _this.setState({
                  loading: false
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 9]]);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(UploadFile, [{
    key: "render",
    value: function render() {
      var loading = this.state.loading;
      var _this$props2 = this.props,
          title = _this$props2.title,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["title", "value", "onChange"]);
      return _react.default.createElement(_upload.default, (0, _extends2.default)({}, props, {
        customRequest: this.customRequest,
        fileList: value ? [{
          uid: value,
          name: (0, _last2.default)((0, _split2.default)(value, '/')),
          url: value
        }] : [],
        onRemove: this.onClickRemove
      }), _react.default.createElement(_button.default, {
        type: "primary",
        loading: loading
      }, _react.default.createElement(_UploadOutlined2.default, null), title));
    }
  }]);
  return UploadFile;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(UploadFile, "displayName", 'UploadFile');
(0, _defineProperty2.default)(UploadFile, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.string,
  generateFileName: _propTypes.default.func,
  title: _propTypes.default.string,
  ssoToken: _propTypes.default.string,
  platform: _propTypes.default.oneOf(['aliyun', 'upyun'])
});
(0, _defineProperty2.default)(UploadFile, "defaultProps", {
  value: undefined,
  generateFileName: null,
  title: '上传',
  ssoToken: '',
  platform: 'aliyun'
});

var mapStateToProps = function mapStateToProps(state) {
  var _state$user, _state$user2;

  return {
    ssoToken: ((_state$user = state.user) === null || _state$user === void 0 ? void 0 : _state$user.get(_constants.TOKEN_KEY)) || ((_state$user2 = state.user) === null || _state$user2 === void 0 ? void 0 : _state$user2.get('sso_token'))
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(UploadFile);

exports.default = _default;