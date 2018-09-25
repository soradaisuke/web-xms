"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLazyload = _interopRequireDefault(require("react-lazyload"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatImageUrl = _interopRequireDefault(require("../utils/formatImageUrl"));

require("./Img.less");

var Img = function (_React$PureComponent) {
  (0, _inherits2.default)(Img, _React$PureComponent);

  function Img() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Img);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Img)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      loaded: false,
      src: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onLoaded", function () {
      _this.setState({
        loaded: true
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Img, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          src = _this$state.src,
          loaded = _this$state.loaded;
      var _this$props = this.props,
          children = _this$props.children,
          useImg = _this$props.useImg,
          lazyLoad = _this$props.lazyLoad,
          className = _this$props.className;

      if (useImg) {
        return _react.default.createElement("img", {
          src: src,
          className: (0, _classnames.default)('record-image', className),
          alt: ""
        });
      }

      var imgNode;
      var style = {};

      if (loaded || !lazyLoad) {
        style.backgroundImage = "url(\"".concat(src, "\")");
      } else if (lazyLoad) {
        imgNode = _react.default.createElement(_reactLazyload.default, {
          once: true,
          overflow: true,
          offset: 100,
          height: 1
        }, _react.default.createElement("img", {
          src: src,
          className: "record-image",
          alt: "",
          style: {
            display: 'none'
          },
          onLoad: this.onLoaded
        }));
      }

      return _react.default.createElement("div", {
        key: src,
        style: style,
        className: className
      }, imgNode, children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var src = (0, _formatImageUrl.default)(nextProps.format, nextProps.src);
      return src !== prevState.src ? {
        src: src,
        loaded: false
      } : null;
    }
  }]);
  return Img;
}(_react.default.PureComponent);

exports.default = Img;
(0, _defineProperty2.default)(Img, "displayName", 'Img');
(0, _defineProperty2.default)(Img, "propTypes", {
  src: _propTypes.default.string.isRequired,
  children: _propTypes.default.node,
  format: _propTypes.default.string,
  lazyLoad: _propTypes.default.bool,
  useImg: _propTypes.default.bool,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(Img, "defaultProps", {
  children: null,
  format: '',
  lazyLoad: true,
  useImg: false,
  className: ''
});