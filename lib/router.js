"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/locale-provider/style");

var _localeProvider = _interopRequireDefault(require("antd/lib/locale-provider"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/affix/style");

var _affix = _interopRequireDefault(require("antd/lib/affix"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _dva = require("dva");

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _zh_CN = _interopRequireDefault(require("antd/lib/locale-provider/zh_CN"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _User = _interopRequireDefault(require("./components/User"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _Breadcrumb = _interopRequireDefault(require("./components/Breadcrumb"));

require("moment/locale/zh-cn");

require("./router.less");

var Content = _layout.default.Content;

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
      newRoute = (0, _objectSpread2.default)({}, newRoute, {
        routes: getValidRoutes(newRoute.routes, user)
      });
    }

    return newRoute;
  }), function (route) {
    return !!route;
  });
}

function RouterConfig(_ref) {
  var history = _ref.history,
      app = _ref.app,
      user = _ref.user;
  var unCheckRoutes = app.routes,
      name = app.config.name;
  var routes = getValidRoutes(unCheckRoutes, user);

  function renderRoute(_ref2) {
    var path = _ref2.path,
        inline = _ref2.inline,
        subRoutes = _ref2.routes,
        Component = _ref2.component;
    var children = [];

    if (Component && !inline) {
      var inlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (r) {
        return r.inline;
      }) : [];
      children.push(_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        key: path,
        path: path,
        render: function render() {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Breadcrumb.default, {
            routes: routes
          }), _react.default.createElement(Component, {
            routes: inlineRoutes
          }));
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

  var homeRoute = (0, _find2.default)(routes, function (_ref3) {
    var path = _ref3.path;
    return path === '/';
  });
  var firstAvaliableNonHomeRoutePath;

  function findFirstAvaliableNonHomeRoute(_ref4) {
    var path = _ref4.path,
        subRoutes = _ref4.routes,
        component = _ref4.component;

    if (path !== '/' && !!component) {
      firstAvaliableNonHomeRoutePath = path;
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

    return !firstAvaliableNonHomeRoutePath;
  }

  (0, _forEach2.default)(routes, function (r) {
    return findFirstAvaliableNonHomeRoute(r);
  });
  return _react.default.createElement(_localeProvider.default, {
    locale: _zh_CN.default
  }, _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: "xms-layout"
  }, _react.default.createElement(_Header.default, {
    name: name
  }, _react.default.createElement(_User.default, null)), _react.default.createElement(_layout.default, {
    className: "xms-main-layout"
  }, _react.default.createElement(_row.default, {
    type: "flex"
  }, _react.default.createElement(_affix.default, null, _react.default.createElement(_Menu.default, {
    routes: routes
  })), _react.default.createElement(Content, {
    className: "xms-content"
  }, _react.default.createElement(_reactRouterDom.Switch, null, (0, _map2.default)(routes, function (route) {
    return renderRoute(route);
  }), !homeRoute && firstAvaliableNonHomeRoutePath ? _react.default.createElement(_reactRouterDom.Redirect, {
    from: "/",
    to: firstAvaliableNonHomeRoutePath
  }) : null)))))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var ConnectedRouter = (0, _dva.connect)(mapStateToProps)(RouterConfig);

var _default = function _default(_ref6) {
  var history = _ref6.history,
      app = _ref6.app;
  return _react.default.createElement(ConnectedRouter, {
    history: history,
    app: app
  });
};

exports.default = _default;