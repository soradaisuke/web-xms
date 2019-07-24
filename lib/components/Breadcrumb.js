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

require("antd/lib/breadcrumb/style");

var _breadcrumb = _interopRequireDefault(require("antd/lib/breadcrumb"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _take2 = _interopRequireDefault(require("lodash/take"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _pathToText = _interopRequireDefault(require("../utils/pathToText"));

function addBreadcrumbItem(_ref) {
  var pathname = _ref.pathname,
      routes = _ref.routes,
      items = _ref.items,
      params = _ref.params;
  (0, _forEach2.default)(routes, function (_ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        title = _ref2.title,
        inline = _ref2.inline,
        breadcrumb = _ref2.breadcrumb,
        childRoutes = _ref2.routes;

    if ((0, _reactRouterDom.matchPath)(pathname, {
      path: path
    })) {
      if (component && !inline) {
        var breadcrumbTitle;

        if ((0, _isFunction2.default)(breadcrumb)) {
          breadcrumbTitle = breadcrumb(params);
        } else if ((0, _isString2.default)(breadcrumb)) {
          breadcrumbTitle = breadcrumb;
        }

        items.push(_react.default.createElement(_breadcrumb.default.Item, {
          key: path
        }, _react.default.createElement(_reactRouterDom.NavLink, {
          exact: true,
          to: (0, _join2.default)((0, _take2.default)((0, _split2.default)(pathname, '/'), (0, _split2.default)(path, '/').length), '/')
        }, (0, _pathToText.default)(breadcrumbTitle) || title)));
      }

      if (childRoutes && childRoutes.length > 0) {
        addBreadcrumbItem({
          pathname: pathname,
          routes: childRoutes,
          items: items,
          params: params
        });
      }
    }
  });
}

var NavBreadcrumb = function (_React$PureComponent) {
  (0, _inherits2.default)(NavBreadcrumb, _React$PureComponent);

  function NavBreadcrumb() {
    (0, _classCallCheck2.default)(this, NavBreadcrumb);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NavBreadcrumb).apply(this, arguments));
  }

  (0, _createClass2.default)(NavBreadcrumb, [{
    key: "renderBreadcrumbItems",
    value: function renderBreadcrumbItems() {
      var items = [];
      var _this$props = this.props,
          routes = _this$props.routes,
          params = _this$props.match.params,
          pathname = _this$props.location.pathname;
      addBreadcrumbItem({
        pathname: pathname,
        routes: routes,
        items: items,
        params: params
      });
      return items;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_breadcrumb.default, null, this.renderBreadcrumbItems());
    }
  }]);
  return NavBreadcrumb;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(NavBreadcrumb, "propTypes", {
  location: _propTypes.default.object.isRequired,
  match: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouterDom.withRouter)(NavBreadcrumb);

exports.default = _default;