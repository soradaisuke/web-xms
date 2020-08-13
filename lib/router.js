"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/config-provider/style");

var _configProvider = _interopRequireDefault(require("antd/lib/config-provider"));

require("antd/lib/back-top/style");

var _backTop = _interopRequireDefault(require("antd/lib/back-top"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dva = require("dva");

var _zh_CN = _interopRequireDefault(require("antd/lib/locale-provider/zh_CN"));

var _useUser = _interopRequireDefault(require("./hooks/useUser"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _User = _interopRequireDefault(require("./components/User"));

var _Breadcrumb = _interopRequireDefault(require("./components/Nav/Breadcrumb"));

var _Watermark = _interopRequireDefault(require("./components/Watermark"));

require("moment/locale/zh-cn");

require("./router.less");

var _WelcomePage = _interopRequireDefault(require("./pages/WelcomePage"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Route = _dva.router.Route,
    Switch = _dva.router.Switch,
    Router = _dva.router.Router;
var Content = _layout.default.Content,
    Sider = _layout.default.Sider,
    Header = _layout.default.Header;

_dva.dynamic.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: "dynamic-loading"
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
});

function getValidRoutes(routes, user) {
  return (0, _filter2.default)((0, _map2.default)(routes, function (route) {
    var newRoute = route;

    if (route.enable && !(user && route.enable(user))) {
      newRoute = null;
    }

    if (route.permissions) {
      var configPermissions = (0, _isString2.default)(route.permissions) ? [route.permissions] : route.permissions;
      var userPermissions = user === null || user === void 0 ? void 0 : user.get('permissions');

      if (!userPermissions || !userPermissions.size) {
        newRoute = null;
      } else if ((0, _isFunction2.default)(configPermissions) && !configPermissions(userPermissions)) {
        newRoute = null;
      } else if ((0, _isArray2.default)(configPermissions) && !(0, _find2.default)(configPermissions, function (p) {
        return userPermissions.get(p);
      })) {
        newRoute = null;
      }
    }

    if (newRoute && newRoute.routes) {
      newRoute = _objectSpread(_objectSpread({}, newRoute), {}, {
        routes: getValidRoutes(newRoute.routes, user)
      });
    }

    return newRoute;
  }), function (route) {
    return !!route;
  });
}

function renderRoute(_ref) {
  var path = _ref.path,
      inline = _ref.inline,
      title = _ref.title,
      breadcrumb = _ref.breadcrumb,
      subRoutes = _ref.routes,
      Component = _ref.component;
  var children = [];

  if ((title || breadcrumb || Component) && !inline) {
    var inlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (r) {
      return r.inline;
    }) : [];
    children.push(_react.default.createElement(Route, {
      exact: true,
      key: path,
      path: path,
      render: function render() {
        return !!Component && _react.default.createElement(Component, {
          routes: inlineRoutes
        });
      }
    }));
  }

  if (subRoutes && subRoutes.length > 0) {
    return children.concat(subRoutes.map(function (route) {
      return renderRoute(route);
    }));
  }

  return children;
}

function ConnectedRouter(_ref2) {
  var history = _ref2.history,
      app = _ref2.app;
  var user = (0, _useUser.default)();
  var unCheckRoutes = app.routes,
      _app$config = app.config,
      name = _app$config.name,
      _app$config$api = _app$config.api;
  _app$config$api = _app$config$api === void 0 ? {} : _app$config$api;
  var auth = _app$config$api.auth;
  var routes = (0, _react.useMemo)(function () {
    return getValidRoutes(unCheckRoutes, user);
  }, [unCheckRoutes, user]);
  var homeRoute = (0, _react.useMemo)(function () {
    return (0, _find2.default)(routes, function (_ref3) {
      var path = _ref3.path;
      return path === '/';
    });
  }, [routes]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var onCollapse = (0, _useEventCallback2.default)(function (c) {
    return setCollapsed(c);
  });
  return _react.default.createElement(_configProvider.default, {
    locale: _zh_CN.default
  }, _react.default.createElement(_Watermark.default, null), _react.default.createElement(Router, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: "xms-layout"
  }, _react.default.createElement(Sider, {
    className: "xms-sider",
    collapsible: true,
    collapsed: collapsed,
    onCollapse: onCollapse
  }, _react.default.createElement("div", {
    className: "logo"
  }), (!auth || !!user) && _react.default.createElement(_Menu.default, {
    routes: routes
  })), _react.default.createElement(_layout.default, {
    className: (0, _classnames.default)('xms-site-layout', collapsed ? 'collapsed' : '')
  }, _react.default.createElement(Header, {
    className: "xms-site-layout-heder"
  }, name, _react.default.createElement(_User.default, null)), _react.default.createElement(Content, {
    className: "xms-content"
  }, _react.default.createElement(_Breadcrumb.default, {
    routes: routes
  }), _react.default.createElement(Switch, null, !homeRoute && _react.default.createElement(Route, {
    exact: true,
    key: "/",
    path: "/"
  }, _react.default.createElement(_WelcomePage.default, {
    title: name
  })), (0, _map2.default)(routes, function (route) {
    return renderRoute(route);
  })))), _react.default.createElement(_backTop.default, null))));
}

ConnectedRouter.propTypes = {
  history: _propTypes.default.object.isRequired,
  app: _propTypes.default.shape({
    routes: _propTypes.default.array.isRequired,
    config: _propTypes.default.shape({
      name: _propTypes.default.string,
      api: _propTypes.default.shape({
        auth: _propTypes.default.string
      })
    }).isRequired
  }).isRequired
};

var _default = function _default(_ref4) {
  var history = _ref4.history,
      app = _ref4.app;
  return _react.default.createElement(ConnectedRouter, {
    history: history,
    app: app
  });
};

exports.default = _default;