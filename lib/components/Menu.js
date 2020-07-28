"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var Link = _dva.router.Link,
    matchPath = _dva.router.matchPath;
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
    if (matchPath(pathname, {
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
        title: title,
        icon: icon
      }, renderMenus(subRoutes));
    }

    return _react.default.createElement(_menu.default.Item, {
      key: path,
      icon: icon
    }, _react.default.createElement(Link, {
      to: path
    }, title));
  });
}

function NavMenu(_ref4) {
  var routes = _ref4.routes;
  var location = (0, _dva.useLocation)();
  var history = (0, _dva.useHistory)();
  var pathname = location.pathname,
      state = location.state;
  (0, _react.useEffect)(function () {
    if (state === null || state === void 0 ? void 0 : state.unmatch) {
      history.replace(pathname);
    }
  }, [state, history, pathname]);

  var _useMemo = (0, _react.useMemo)(function () {
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
  }, [pathname, routes]),
      selectedKeys = _useMemo.selectedKeys,
      openKeys = _useMemo.openKeys;

  if (state === null || state === void 0 ? void 0 : state.unmatch) return null;
  return _react.default.createElement(_menu.default, {
    className: "xms-menu",
    theme: "dark",
    mode: "inline",
    selectedKeys: selectedKeys,
    defaultOpenKeys: openKeys
  }, renderMenus(routes));
}

NavMenu.propTypes = {
  routes: _propTypes.default.array.isRequired
};

var _default = _react.default.memo(NavMenu);

exports.default = _default;