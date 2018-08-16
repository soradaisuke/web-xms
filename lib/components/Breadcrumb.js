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

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

require("./Breadcrumb.less");

function addBreadcrumbItem(pathname, routes, items) {
  (0, _forEach2.default)(routes, function (_ref) {
    var path = _ref.path,
        component = _ref.component,
        title = _ref.title,
        childRoutes = _ref.routes;

    if ((0, _reactRouter.matchPath)(pathname, {
      path: path
    })) {
      if (component) {
        items.push(_react.default.createElement(_breadcrumb.default.Item, {
          key: path
        }, _react.default.createElement(_reactRouterDom.NavLink, {
          exact: true,
          to: path
        }, title)));
      }

      if (childRoutes && childRoutes.length > 0) {
        addBreadcrumbItem(pathname, childRoutes, items);
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
          location = _this$props.location;
      addBreadcrumbItem(location.pathname, routes, items);
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
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouter.withRouter)(NavBreadcrumb);

exports.default = _default;