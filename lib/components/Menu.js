"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _reselect = require("reselect");

require("./Menu.less");

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
  _inherits(NavMenu, _React$PureComponent);

  function NavMenu() {
    _classCallCheck(this, NavMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavMenu).apply(this, arguments));
  }

  _createClass(NavMenu, [{
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

_defineProperty(NavMenu, "propTypes", {
  location: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouter.withRouter)(NavMenu);

exports.default = _default;