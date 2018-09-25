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

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _reselect = require("reselect");

var SubMenu = _menu.default.SubMenu;
var validMenues = (0, _filter2.default)(function (_ref) {
  var title = _ref.title;
  return !!title;
});
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
      var subMenues = validMenues(route.routes);

      if (subMenues.length > 0) {
        openKeys.push(route.path);
        (0, _forEach2.default)(subMenues, function (childRoute) {
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

      var routes = this.props.routes;
      return _react.default.createElement(_menu.default, {
        theme: "dark",
        mode: "inline",
        selectedKeys: selectedKeys,
        defaultOpenKeys: openKeys
      }, validMenues(routes).map(function (_ref2) {
        var path = _ref2.path,
            title = _ref2.title,
            childRoutes = _ref2.routes;
        var subMenus = validMenues(childRoutes).map(function (_ref3) {
          var subPath = _ref3.path,
              childTitle = _ref3.title;
          return _react.default.createElement(_menu.default.Item, {
            key: subPath
          }, _react.default.createElement(_reactRouterDom.Link, {
            to: subPath
          }, childTitle));
        });

        if (subMenus.length > 0) {
          return _react.default.createElement(SubMenu, {
            key: path,
            title: title
          }, subMenus);
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