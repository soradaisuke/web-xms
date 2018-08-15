"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/breadcrumb/style");

var _breadcrumb = _interopRequireDefault(require("antd/lib/breadcrumb"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

require("./Breadcrumb.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inherits(NavBreadcrumb, _React$PureComponent);

  function NavBreadcrumb() {
    _classCallCheck(this, NavBreadcrumb);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavBreadcrumb).apply(this, arguments));
  }

  _createClass(NavBreadcrumb, [{
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

_defineProperty(NavBreadcrumb, "propTypes", {
  location: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouter.withRouter)(NavBreadcrumb);

exports.default = _default;