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

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _zh_CN = _interopRequireDefault(require("antd/lib/locale-provider/zh_CN"));

var _useUser = _interopRequireDefault(require("./hooks/useUser"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _User = _interopRequireDefault(require("./components/User"));

var _Breadcrumb = _interopRequireDefault(require("./components/Breadcrumb"));

var _Watermark = _interopRequireDefault(require("./components/Watermark"));

require("moment/locale/zh-cn");

require("./router.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Content = _layout.default.Content,
    Sider = _layout.default.Sider,
    Header = _layout.default.Header;

_dynamic.default.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: "dynamic-loading"
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
});

function getValidRoutes(routes, user) {
  return (0, _filter2.default)((0, _map2.default)(routes, function (route) {
    var newRoute = route;

    if (route.enable) {
      if (user && route.enable(user)) {
        newRoute = route;
      } else {
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
    children.push(_react.default.createElement(_reactRouterDom.Route, {
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
  var firstAvaliableNonHomeRoutePath = (0, _react.useMemo)(function () {
    var nonHomeRoutePath;

    function findFirstAvaliableNonHomeRoute(_ref4) {
      var path = _ref4.path,
          subRoutes = _ref4.routes,
          component = _ref4.component;

      if (path !== '/' && !!component) {
        nonHomeRoutePath = path;
      } else {
        var nonInlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (_ref5) {
          var inline = _ref5.inline;
          return !inline;
        }) : [];

        if (nonInlineRoutes && nonInlineRoutes.length > 0) {
          (0, _forEach2.default)(nonInlineRoutes, function (r) {
            return findFirstAvaliableNonHomeRoute(r);
          });
        }
      }

      return !nonHomeRoutePath;
    }

    (0, _forEach2.default)(routes, function (r) {
      return findFirstAvaliableNonHomeRoute(r);
    });
    return nonHomeRoutePath;
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
  }, _react.default.createElement(_Watermark.default, null), _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: "xms-layout"
  }, _react.default.createElement(Sider, {
    collapsible: true,
    collapsed: collapsed,
    onCollapse: onCollapse
  }, _react.default.createElement("div", {
    className: "logo"
  }), (!auth || !!user) && _react.default.createElement(_Menu.default, {
    routes: routes
  })), _react.default.createElement(_layout.default, {
    className: "xms-site-layout"
  }, _react.default.createElement(Header, {
    className: "xms-site-layout-heder"
  }, name, _react.default.createElement(_User.default, null)), _react.default.createElement(Content, {
    className: "xms-content"
  }, _react.default.createElement(_Breadcrumb.default, {
    routes: routes
  }), _react.default.createElement(_reactRouterDom.Switch, null, (0, _map2.default)(routes, function (route) {
    return renderRoute(route);
  }), (!auth || !!user) && !homeRoute && firstAvaliableNonHomeRoutePath ? _react.default.createElement(_reactRouterDom.Redirect, {
    from: "/",
    to: {
      pathname: firstAvaliableNonHomeRoutePath,
      state: {
        unmatch: true
      }
    }
  }) : null))), _react.default.createElement(_backTop.default, null))));
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

var _default = function _default(_ref6) {
  var history = _ref6.history,
      app = _ref6.app;
  return _react.default.createElement(ConnectedRouter, {
    history: history,
    app: app
  });
};

exports.default = _default;