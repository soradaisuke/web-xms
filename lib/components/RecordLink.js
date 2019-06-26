"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _router = require("dva/router");

var _textToPath = _interopRequireDefault(require("../utils/textToPath"));

var RecordLink = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordLink, _React$PureComponent);

  function RecordLink() {
    (0, _classCallCheck2.default)(this, RecordLink);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RecordLink).apply(this, arguments));
  }

  (0, _createClass2.default)(RecordLink, [{
    key: "getUrl",
    value: function getUrl() {
      var _this$props = this.props,
          link = _this$props.link,
          record = _this$props.record;

      if ((0, _isFunction2.default)(link)) {
        return (0, _textToPath.default)(link(record));
      }

      return (0, _textToPath.default)(link);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var url = this.getUrl();

      if ((0, _startsWith2.default)(url, 'http')) {
        return _react.default.createElement("a", {
          href: this.getUrl(),
          rel: "noopener noreferrer",
          target: "_blank"
        }, children);
      }

      if (!(0, _startsWith2.default)(url, '/')) {
        url = "".concat(window.location.pathname, "/").concat(url);
      }

      return _react.default.createElement(_router.Link, {
        to: url
      }, children);
    }
  }]);
  return RecordLink;
}(_react.default.PureComponent);

exports.default = RecordLink;
(0, _defineProperty2.default)(RecordLink, "displayName", 'RecordLink');
(0, _defineProperty2.default)(RecordLink, "propTypes", {
  record: _propTypes.default.object.isRequired,
  link: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  children: _propTypes.default.node
});
(0, _defineProperty2.default)(RecordLink, "defaultProps", {
  children: null
});