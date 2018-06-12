"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/breadcrumb/style");

var _breadcrumb = _interopRequireDefault(require("antd/lib/breadcrumb"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _NavBreadcrumb = _interopRequireDefault(require("./NavBreadcrumb.less"));

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
      var routes = this.props.routes;
      (0, _forEach2.default)(routes, function (route) {
        if (route.path === '/') {
          items.push(_react.default.createElement(_breadcrumb.default.Item, {
            key: route.path
          }, _react.default.createElement(_reactRouterDom.Link, {
            to: route.path
          }, route.title)));
          return false;
        }

        return true;
      });
      var pathname = this.props.pathname;
      var paths = (0, _filter2.default)((0, _split2.default)(pathname, '/'), function (p) {
        return p;
      });
      var url = '';
      (0, _forEach2.default)(paths, function (path) {
        var matched = false;
        (0, _forEach2.default)(routes, function (route) {
          if (route.path === "/".concat(path) || path && (0, _includes2.default)(route.path, ':')) {
            routes = route.routes;
            matched = true;
            url = "".concat(url, "/").concat(path);

            if (route.component) {
              items.push(_react.default.createElement(_breadcrumb.default.Item, {
                key: url
              }, _react.default.createElement(_reactRouterDom.Link, {
                to: url
              }, (0, _includes2.default)(route.path, ':') ? "".concat(route.title).concat(path) : route.title)));
            }

            return false;
          }

          return true;
        });
        return matched;
      });
      return items;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_breadcrumb.default, {
        className: _NavBreadcrumb.default.navBreadcrumb
      }, this.renderBreadcrumbItems());
    }
  }]);
  return NavBreadcrumb;
}(_react.default.PureComponent);

exports.default = NavBreadcrumb;
(0, _defineProperty2.default)(NavBreadcrumb, "propTypes", {
  pathname: _propTypes.default.string.isRequired,
  routes: _propTypes.default.array.isRequired
});