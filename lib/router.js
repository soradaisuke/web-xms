"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/locale-provider/style");

var _localeProvider = _interopRequireDefault(require("antd/lib/locale-provider"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _react = _interopRequireDefault(require("react"));

var _router = require("dva/router");

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _zh_CN = _interopRequireDefault(require("antd/lib/locale-provider/zh_CN"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _User = _interopRequireDefault(require("./components/User"));

var _Breadcrumb = _interopRequireDefault(require("./components/Breadcrumb"));

require("moment/locale/zh-cn");

require("./router.less");

var Header = _layout.default.Header,
    Content = _layout.default.Content,
    Footer = _layout.default.Footer,
    Sider = _layout.default.Sider;

_dynamic.default.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: "dynamic-loading"
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
});

function RouterConfig(_ref) {
  var history = _ref.history,
      app = _ref.app;
  var routes = app.routes,
      name = app.config.name;

  function renderRoute(_ref2) {
    var path = _ref2.path,
        subRoutes = _ref2.routes,
        Component = _ref2.component;
    var children = [];

    if (Component) {
      var inlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (_ref3) {
        var inline = _ref3.inline;
        return inline;
      }) : [];
      children.push(_react.default.createElement(_router.Route, {
        exact: true,
        key: path,
        path: path,
        render: function render() {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Breadcrumb.default, {
            routes: routes
          }), _react.default.createElement(Content, null, _react.default.createElement(Component, {
            routes: inlineRoutes
          })));
        }
      }));
    }

    var nonInlineRoutes = subRoutes ? (0, _filter2.default)(subRoutes, function (_ref4) {
      var inline = _ref4.inline;
      return !inline;
    }) : [];

    if (nonInlineRoutes && nonInlineRoutes.length > 0) {
      return children.concat(nonInlineRoutes.map(function (route) {
        return renderRoute(route);
      }));
    }

    return children;
  }

  var homeRoute = (0, _find2.default)(routes, function (_ref5) {
    var path = _ref5.path;
    return path === '/';
  });
  var firstAvaliableNonHomeRoute = (0, _find2.default)(routes, function (_ref6) {
    var path = _ref6.path,
        component = _ref6.component;
    return path !== '/' && !!component;
  });
  return _react.default.createElement(_localeProvider.default, {
    locale: _zh_CN.default
  }, _react.default.createElement(_router.Router, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: "xms-layout"
  }, _react.default.createElement(Header, null, name, _react.default.createElement(_User.default, null)), _react.default.createElement(_layout.default, null, _react.default.createElement(Sider, {
    width: "9.6rem"
  }, _react.default.createElement(_Menu.default, {
    routes: routes
  })), _react.default.createElement(_layout.default, {
    className: "content-layout"
  }, _react.default.createElement(_router.Switch, null, (0, _map2.default)(routes, function (route) {
    return renderRoute(route);
  }), !homeRoute && firstAvaliableNonHomeRoute ? _react.default.createElement(_router.Redirect, {
    from: "/",
    to: firstAvaliableNonHomeRoute.path
  }) : null), _react.default.createElement(Footer, null, "\xA92011-2019 qingting.fm All Rights Reserved."))))));
}

var _default = RouterConfig;
exports.default = _default;