"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _textToPath = _interopRequireDefault(require("../utils/textToPath"));

var _usePageData = _interopRequireDefault(require("../hooks/usePageData"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Link = _dva.router.Link;

function RecordLink(_ref) {
  var _pageData$filter;

  var link = _ref.link,
      record = _ref.record,
      buttonProps = _ref.buttonProps,
      children = _ref.children;
  var pageData = (0, _usePageData.default)();
  var filter = (_pageData$filter = pageData === null || pageData === void 0 ? void 0 : pageData.filter) !== null && _pageData$filter !== void 0 ? _pageData$filter : null;
  var url = (0, _react.useMemo)(function () {
    var linkInternal = (0, _isFunction2.default)(link) ? link({
      record: record,
      filter: filter
    }) : link;

    if (!(0, _startsWith2.default)(linkInternal, 'http')) {
      return (0, _textToPath.default)(linkInternal);
    }

    return linkInternal;
  }, [link, record, filter]);
  var style = (0, _react.useMemo)(function () {
    return _objectSpread({
      userSelect: 'all'
    }, buttonProps.style || {});
  }, [buttonProps]);

  if ((0, _startsWith2.default)(url, 'http')) {
    return _react.default.createElement(_button.default, (0, _extends2.default)({
      href: url,
      target: "_blank",
      type: "link"
    }, buttonProps, {
      style: style
    }), buttonProps.children || children);
  }

  return _react.default.createElement(Link, {
    to: !(0, _startsWith2.default)(url, '/') ? "".concat(window.location.pathname, "/").concat(url) : url
  }, _react.default.createElement(_button.default, (0, _extends2.default)({
    type: "link"
  }, buttonProps, {
    style: style
  }), buttonProps.children || children));
}

RecordLink.propTypes = {
  link: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  record: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  buttonProps: _propTypes.default.object,
  children: _propTypes.default.node
};
RecordLink.defaultProps = {
  buttonProps: {},
  children: null,
  record: null
};

var _default = _react.default.memo(RecordLink);

exports.default = _default;