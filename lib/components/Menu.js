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

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _reselect = require("reselect");

require("./Menu.less");

var SubMenu = _menu.default.SubMenu;
var selector = (0, _reselect.createSelector)([function (props) {
  return props.location.pathname;
}, function (props) {
  return props.routes;
}], function (pathname, routes) {
  var selectedKeys = [];
  var openKeys = [];
  (0, _forEach2.default)(routes, function (route) {
    if ((0, _reactRouter.matchPath)(pathname, {
      path: route.path
    })) {
      if (route.routes && route.routes.length > 0) {
        openKeys.push(route.path);
        (0, _forEach2.default)(route.routes, function (childRoute) {
          if ((0, _reactRouter.matchPath)(pathname, {
            path: childRoute.path
          })) {
            selectedKeys.push(childRoute.path);
          }
        });
      } else {
        selectedKeys.push(route.path);
      }
    }
  });
  return {
    selectedKeys: selectedKeys,
    openKeys: openKeys
  };
});

var NavMenu = function (_React$PureComponent) {
  (0, _inherits2.default)(NavMenu, _React$PureComponent);

  function NavMenu() {
    (0, _classCallCheck2.default)(this, NavMenu);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NavMenu).apply(this, arguments));
  }

  (0, _createClass2.default)(NavMenu, [{
    key: "render",
    value: function render() {
      var _selector = selector(this.props),
          selectedKeys = _selector.selectedKeys,
          openKeys = _selector.openKeys;

      return _react.default.createElement(_menu.default, {
        className: "xms-menu",
        theme: "dark",
        mode: "inline",
        selectedKeys: selectedKeys,
        defaultOpenKeys: openKeys
      }, this.props.routes.map(function (_ref) {
        var path = _ref.path,
            title = _ref.title,
            routes = _ref.routes;

        if (routes && routes.length > 0) {
          return _react.default.createElement(SubMenu, {
            key: path,
            title: title
          }, routes.map(function (_ref2) {
            var subPath = _ref2.path,
                subTitle = _ref2.title;
            return _react.default.createElement(_menu.default.Item, {
              key: subPath
            }, _react.default.createElement(_reactRouterDom.Link, {
              to: subPath
            }, subTitle));
          }));
        }

        return _react.default.createElement(_menu.default.Item, {
          key: path
        }, _react.default.createElement(_reactRouterDom.Link, {
          to: path
        }, title));
      }));
    }
  }]);
  return NavMenu;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(NavMenu, "propTypes", {
  location: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouter.withRouter)(NavMenu);

exports.default = _default;