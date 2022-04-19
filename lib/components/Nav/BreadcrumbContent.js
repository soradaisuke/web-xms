"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _take2 = _interopRequireDefault(require("lodash/take"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _pathToText = _interopRequireDefault(require("../../utils/pathToText"));

var _AsyncBreadcrumb = _interopRequireDefault(require("./AsyncBreadcrumb"));

var NavLink = _dva.router.NavLink,
    useLocation = _dva.router.useLocation,
    useRouteMatch = _dva.router.useRouteMatch;

function BreadcrumbContent(_ref) {
  var namespace = _ref.namespace,
      hasLink = _ref.hasLink,
      path = _ref.path,
      breadcrumb = _ref.breadcrumb,
      title = _ref.title;

  var _useLocation = useLocation(),
      pathname = _useLocation.pathname;

  var _useRouteMatch = useRouteMatch(path),
      matchParams = _useRouteMatch.params;

  var data = (0, _dva.useSelector)(function (state) {
    return state[namespace];
  });
  var pageData = (0, _react.useMemo)(function () {
    var _data$toJS;

    return (_data$toJS = data === null || data === void 0 ? void 0 : data.toJS()) !== null && _data$toJS !== void 0 ? _data$toJS : {};
  }, [data]);
  var breadcrumbTitle = (0, _react.useMemo)(function () {
    var bTitle;

    if ((0, _isFunction2.default)(breadcrumb)) {
      bTitle = breadcrumb({
        matchParams: matchParams,
        pageData: pageData
      });
    } else if ((0, _isString2.default)(breadcrumb)) {
      bTitle = breadcrumb;
    } else if ((0, _isObject2.default)(breadcrumb) && (0, _has2.default)(breadcrumb, 'getBreadcrumb')) {
      var defaultTitle = breadcrumb.defaultTitle,
          res = (0, _objectWithoutProperties2.default)(breadcrumb, ["defaultTitle"]);
      return _react.default.createElement(_AsyncBreadcrumb.default, (0, _extends2.default)({}, res, {
        path: path,
        defaultTitle: defaultTitle !== null && defaultTitle !== void 0 ? defaultTitle : title
      }));
    }

    return (0, _pathToText.default)(bTitle) || title;
  }, [breadcrumb, title, matchParams, pageData, path]);
  var to = (0, _react.useMemo)(function () {
    return (0, _join2.default)((0, _take2.default)((0, _split2.default)(pathname, '/'), (0, _split2.default)(path, '/').length), '/');
  }, [pathname, path]);
  return hasLink ? _react.default.createElement(NavLink, {
    exact: true,
    to: to
  }, breadcrumbTitle) : breadcrumbTitle;
}

BreadcrumbContent.propTypes = {
  hasLink: _propTypes.default.bool.isRequired,
  path: _propTypes.default.string.isRequired,
  breadcrumb: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.shape({
    getBreadcrumb: _propTypes.default.func.isRequired,
    dependencies: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    defaultTitle: _propTypes.default.string
  })]),
  namespace: _propTypes.default.string,
  title: _propTypes.default.string
};
BreadcrumbContent.defaultProps = {
  title: '',
  breadcrumb: null,
  namespace: null
};

var _default = _react.default.memo(BreadcrumbContent);

exports.default = _default;