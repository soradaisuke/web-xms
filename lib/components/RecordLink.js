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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

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
          url = _this$props.link.url,
          record = _this$props.record;

      if ((0, _isFunction2.default)(url)) {
        return url(record);
      }

      return url;
    }
  }, {
    key: "getLink",
    value: function getLink() {
      var _this$props2 = this.props,
          link = _this$props2.link,
          record = _this$props2.record;

      if (link === true) {
        return "".concat(window.location.pathname, "/").concat(record.id);
      }

      switch (link.type) {
        case 'absolute':
          return this.getUrl();

        case 'relative':
        default:
          return "".concat(window.location.pathname, "/").concat(this.getUrl());
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          link = _this$props3.link;

      if (link.type === 'external') {
        return _react.default.createElement("a", {
          href: this.getUrl(),
          rel: "noopener noreferrer",
          target: "_blank"
        }, children);
      }

      return _react.default.createElement(_reactRouterDom.Link, {
        to: this.getLink()
      }, children);
    }
  }]);
  return RecordLink;
}(_react.default.PureComponent);

exports.default = RecordLink;
(0, _defineProperty2.default)(RecordLink, "displayName", 'RecordLink');
(0, _defineProperty2.default)(RecordLink, "propTypes", {
  children: _propTypes.default.node.isRequired,
  record: _propTypes.default.object.isRequired,
  link: _propTypes.default.shape({
    url: _propTypes.default.string,
    type: _propTypes.default.oneOf(['relative', 'absolute', 'external'])
  }).isRequired
});