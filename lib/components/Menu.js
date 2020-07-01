"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reselect = require("reselect");

var _history = _interopRequireDefault(require("../utils/history"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubMenu = _menu.default.SubMenu;
var validMenues = (0, _filter2.default)(function (_ref) {
  var title = _ref.title,
      inline = _ref.inline;
  return !!title && !inline;
});

function findNextKey(_ref2) {
  var pathname = _ref2.pathname,
      routes = _ref2.routes,
      selectedKeys = _ref2.selectedKeys,
      openKeys = _ref2.openKeys;
  (0, _forEach2.default)(routes, function (route) {
    if ((0, _reactRouterDom.matchPath)(pathname, {
      path: route.path
    })) {
      selectedKeys.push(route.path);
      var subMenues = validMenues(route.routes);

      if (subMenues.length > 0) {
        openKeys.push(route.path);
        findNextKey({
          pathname: pathname,
          routes: subMenues,
          selectedKeys: selectedKeys,
          openKeys: openKeys
        });
      }
    }
  });
}

var selector = (0, _reselect.createSelector)([function (props) {
  return props.location.pathname;
}, function (props) {
  return props.routes;
}], function (pathname, routes) {
  var selectedKeys = [];
  var openKeys = [];
  findNextKey({
    pathname: pathname,
    routes: routes,
    selectedKeys: selectedKeys,
    openKeys: openKeys
  });
  return {
    selectedKeys: selectedKeys,
    openKeys: openKeys
  };
});

function renderMenus(routes) {
  return validMenues(routes).map(function (_ref3) {
    var path = _ref3.path,
        title = _ref3.title,
        icon = _ref3.icon,
        childRoutes = _ref3.routes;
    var subRoutes = validMenues(childRoutes);

    if (subRoutes.length > 0) {
      return _react.default.createElement(SubMenu, {
        key: path,
        title: title
      }, renderMenus(subRoutes));
    }

    return _react.default.createElement(_menu.default.Item, {
      key: path,
      icon: icon
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: path
    }, title));
  });
}

var NavMenu = function (_React$PureComponent) {
  (0, _inherits2.default)(NavMenu, _React$PureComponent);

  var _super = _createSuper(NavMenu);

  function NavMenu() {
    (0, _classCallCheck2.default)(this, NavMenu);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(NavMenu, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _location$state;

      var location = this.props.location;

      if ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.unmatch) {
        _history.default.replace(location.pathname);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _selector = selector(this.props),
          selectedKeys = _selector.selectedKeys,
          openKeys = _selector.openKeys;

      var _this$props = this.props,
          routes = _this$props.routes,
          state = _this$props.location.state;
      if (state === null || state === void 0 ? void 0 : state.unmatch) return null;
      return _react.default.createElement(_menu.default, {
        className: "xms-menu",
        theme: "dark",
        mode: "inline",
        selectedKeys: selectedKeys,
        defaultOpenKeys: openKeys
      }, renderMenus(routes));
    }
  }]);
  return NavMenu;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(NavMenu, "propTypes", {
  location: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouterDom.withRouter)(NavMenu);

exports.default = _default;