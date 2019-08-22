"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/slider/style");

var _slider = _interopRequireDefault(require("antd/lib/slider"));

var _generateUpYunImageUrl2 = _interopRequireDefault(require("@qt/web-core/lib/generateUpYunImageUrl"));

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _Img2 = _interopRequireDefault(require("@qt/react-core/lib/Img"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ActivatorModal = _interopRequireDefault(require("../ActivatorModal"));

var _ZoomImg = _interopRequireDefault(require("./ZoomImg.less"));

var ZoomImg = function (_React$PureComponent) {
  (0, _inherits2.default)(ZoomImg, _React$PureComponent);

  function ZoomImg() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ZoomImg);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ZoomImg)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      zoomValue: 1,
      isLeftRightFlip: false,
      isTopDownFlip: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "changeZoomValue", function (zoomValue) {
      _this.setState({
        zoomValue: zoomValue
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeLeftRightFlip", function (isLeftRightFlip) {
      _this.setState({
        isLeftRightFlip: isLeftRightFlip,
        isTopDownFlip: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeTopDownFlip", function (isTopDownFlip) {
      _this.setState({
        isTopDownFlip: isTopDownFlip,
        isLeftRightFlip: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ZoomImg, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          src = _this$props.src,
          showLeftRightFlip = _this$props.showLeftRightFlip,
          showTopDownFlip = _this$props.showTopDownFlip,
          modalWidth = _this$props.modalWidth,
          imgClassName = _this$props.imgClassName;
      var _this$state = this.state,
          zoomValue = _this$state.zoomValue,
          isLeftRightFlip = _this$state.isLeftRightFlip,
          isTopDownFlip = _this$state.isTopDownFlip;

      var children = _react.default.createElement(_Img2.default, {
        src: src,
        className: (0, _classnames.default)(imgClassName, _ZoomImg.default.img)
      });

      var flip = '';

      if (isLeftRightFlip) {
        flip = '/flip/left,right';
      } else if (isTopDownFlip) {
        flip = '/flip/top,down';
      }

      return _react.default.createElement(_ActivatorModal.default, {
        activator: children,
        width: modalWidth || window.innerWidth - 300
      }, _react.default.createElement(_col.default, null, showLeftRightFlip && _react.default.createElement(_switch.default, {
        checkedChildren: "\u5DE6\u53F3\u7FFB\u8F6C",
        unCheckedChildren: "\u5DE6\u53F3\u4E0D\u7FFB\u8F6C",
        className: _ZoomImg.default.switch,
        checked: isLeftRightFlip,
        onChange: this.onChangeLeftRightFlip
      }), showTopDownFlip && _react.default.createElement(_switch.default, {
        checkedChildren: "\u4E0A\u4E0B\u7FFB\u8F6C",
        unCheckedChildren: "\u4E0A\u4E0B\u4E0D\u7FFB\u8F6C",
        className: _ZoomImg.default.switch,
        checked: isTopDownFlip,
        onChange: this.onChangeTopDownFlip
      }), _react.default.createElement("div", {
        className: _ZoomImg.default.zoomImgWrapper,
        style: {
          height: "".concat(window.innerHeight - 300, "px")
        }
      }, _react.default.createElement("div", {
        className: _ZoomImg.default.zoomImg,
        style: {
          width: "".concat(100 * zoomValue, "%"),
          height: "".concat(100 * zoomValue, "%"),
          backgroundImage: "url(".concat((0, _generateUpYunImageUrl2.default)(src, flip), ")")
        }
      })), _react.default.createElement(_slider.default, {
        min: 1,
        max: 5,
        step: 0.1,
        onChange: this.changeZoomValue,
        value: zoomValue
      })));
    }
  }]);
  return ZoomImg;
}(_react.default.PureComponent);

exports.default = ZoomImg;
(0, _defineProperty2.default)(ZoomImg, "displayName", 'ZoomImg');
(0, _defineProperty2.default)(ZoomImg, "propTypes", {
  src: _propTypes.default.string,
  imgClassName: _propTypes.default.string,
  modalWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  showLeftRightFlip: _propTypes.default.bool,
  showTopDownFlip: _propTypes.default.bool
});
(0, _defineProperty2.default)(ZoomImg, "defaultProps", {
  src: '',
  imgClassName: '',
  modalWidth: '',
  showLeftRightFlip: false,
  showTopDownFlip: false
});