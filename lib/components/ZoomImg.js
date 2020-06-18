"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glamor = require("glamor");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactMediumImageZoom = _interopRequireDefault(require("react-medium-image-zoom"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

require("react-medium-image-zoom/dist/styles.css");

require("./ZoomImg.less");

function ZoomImg(_ref) {
  var src = _ref.src,
      thumbnailWidth = _ref.thumbnailWidth,
      imgClassName = _ref.imgClassName;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      rotate = _useState2[0],
      setRotate = _useState2[1];

  var _useState3 = (0, _react.useState)(1),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      scaleX = _useState4[0],
      setScaleX = _useState4[1];

  var _useState5 = (0, _react.useState)(1),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      scaleY = _useState6[0],
      setScaleY = _useState6[1];

  var rotateClockwiseCallback = (0, _react.useCallback)(function () {
    setRotate(rotate + 90);
  }, [rotate, setRotate]);
  var rotateCounterClockwiseCallback = (0, _react.useCallback)(function () {
    setRotate(rotate - 90);
  }, [rotate, setRotate]);
  var scallXCallback = (0, _react.useCallback)(function () {
    setScaleX(-scaleX);
  }, [scaleX, setScaleX]);
  var scallYCallback = (0, _react.useCallback)(function () {
    setScaleY(-scaleY);
  }, [scaleY, setScaleY]);
  var activator = (0, _react.useMemo)(function () {
    var imgProps = {};

    if (thumbnailWidth) {
      imgProps.width = thumbnailWidth;
    }

    return _react.default.createElement("img", (0, _extends2.default)({
      alt: "",
      className: (0, _classnames.default)(imgClassName, 'zoom-img-activator'),
      src: src
    }, imgProps));
  }, [src]);
  var zoomImgClassName = (0, _react.useMemo)(function () {
    return (0, _glamor.css)({
      transform: "rotate(".concat(rotate, "deg) scale(").concat(scaleX, ", ").concat(scaleY, ")"),
      backgroundImage: "url(".concat(src, ")")
    }).toString();
  }, [rotate, scaleX, scaleY, src]);
  return _react.default.createElement(_ActivatorModal.default, {
    activator: activator,
    width: window.innerHeight - 200
  }, _react.default.createElement(_row.default, null, _react.default.createElement(_button.default, {
    className: "action",
    type: "primary",
    shape: "circle",
    icon: "column-width",
    onClick: scallXCallback
  }), _react.default.createElement(_button.default, {
    className: "action",
    type: "primary",
    shape: "circle",
    icon: "column-height",
    onClick: scallYCallback
  }), _react.default.createElement(_button.default, {
    className: "action",
    type: "primary",
    shape: "circle",
    icon: "undo",
    onClick: rotateCounterClockwiseCallback
  }), _react.default.createElement(_button.default, {
    className: "action",
    type: "primary",
    shape: "circle",
    icon: "redo",
    onClick: rotateClockwiseCallback
  })), _react.default.createElement(_reactMediumImageZoom.default, null, _react.default.createElement("div", {
    className: (0, _classnames.default)('zoom-img', zoomImgClassName)
  })));
}

ZoomImg.propTypes = {
  src: _propTypes.default.string.isRequired,
  imgClassName: _propTypes.default.string,
  thumbnailWidth: _propTypes.default.number
};
ZoomImg.defaultProps = {
  imgClassName: '',
  thumbnailWidth: null
};

var _default = _react.default.memo(ZoomImg);

exports.default = _default;