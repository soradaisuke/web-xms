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

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _Img2 = _interopRequireDefault(require("@qt/react/lib/Img"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

require("./ZoomImg.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ZoomImg = function (_React$PureComponent) {
  (0, _inherits2.default)(ZoomImg, _React$PureComponent);

  var _super = _createSuper(ZoomImg);

  function ZoomImg() {
    var _this;

    (0, _classCallCheck2.default)(this, ZoomImg);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      zoomValue: 1,
      isLeftRightFlip: false,
      isTopDownFlip: false,
      rotate: 0
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickRotateLeft", function () {
      var rotate = _this.state.rotate;
      var newRotate = (rotate - 90) % 360;

      if (newRotate < 0) {
        newRotate += 360;
      }

      _this.setState({
        rotate: newRotate
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickRotateRight", function () {
      var rotate = _this.state.rotate;

      _this.setState({
        rotate: (rotate + 90) % 360
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
          showRotate = _this$props.showRotate,
          modalWidth = _this$props.modalWidth,
          imgClassName = _this$props.imgClassName;
      var _this$state = this.state,
          zoomValue = _this$state.zoomValue,
          isLeftRightFlip = _this$state.isLeftRightFlip,
          isTopDownFlip = _this$state.isTopDownFlip,
          rotate = _this$state.rotate;

      var children = _react.default.createElement(_Img2.default, {
        src: src,
        className: (0, _classnames.default)(imgClassName, 'zoom-img-activator')
      });

      var format = rotate > 0 ? "/rotate/".concat(rotate) : '';

      if (isLeftRightFlip) {
        format = "".concat(format, "/flip/left,right");
      } else if (isTopDownFlip) {
        format = "".concat(format, "/flip/top,down");
      }

      return _react.default.createElement(_ActivatorModal.default, {
        activator: children,
        width: modalWidth || window.innerWidth - 300
      }, _react.default.createElement(_col.default, null, showLeftRightFlip && _react.default.createElement(_switch.default, {
        checkedChildren: "\u5DE6\u53F3\u7FFB\u8F6C",
        unCheckedChildren: "\u5DE6\u53F3\u4E0D\u7FFB\u8F6C",
        className: "action",
        checked: isLeftRightFlip,
        onChange: this.onChangeLeftRightFlip
      }), showTopDownFlip && _react.default.createElement(_switch.default, {
        checkedChildren: "\u4E0A\u4E0B\u7FFB\u8F6C",
        unCheckedChildren: "\u4E0A\u4E0B\u4E0D\u7FFB\u8F6C",
        className: "action",
        checked: isTopDownFlip,
        onChange: this.onChangeTopDownFlip
      }), showRotate && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
        className: "action",
        type: "primary",
        shape: "circle",
        icon: _react.default.createElement(_icons.UndoOutlined, null),
        onClick: this.onClickRotateLeft
      }), _react.default.createElement(_button.default, {
        className: "action",
        type: "primary",
        shape: "circle",
        icon: _react.default.createElement(_icons.RedoOutlined, null),
        onClick: this.onClickRotateRight
      })), _react.default.createElement("div", {
        className: "zoom-img-wrapper",
        style: {
          height: "".concat(window.innerHeight - 300, "px")
        }
      }, _react.default.createElement("div", {
        className: "zoom-img",
        style: {
          width: "".concat(100 * zoomValue, "%"),
          height: "".concat(100 * zoomValue, "%"),
          backgroundImage: "url(".concat((0, _generateUpYunImageUrl2.default)(src, format), ")")
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
  showTopDownFlip: _propTypes.default.bool,
  showRotate: _propTypes.default.bool
});
(0, _defineProperty2.default)(ZoomImg, "defaultProps", {
  src: '',
  imgClassName: '',
  modalWidth: '',
  showLeftRightFlip: false,
  showTopDownFlip: false,
  showRotate: false
});