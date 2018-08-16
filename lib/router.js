"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _react = _interopRequireDefault(require("react"));

var _router = require("dva/router");

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _Breadcrumb = _interopRequireDefault(require("./components/Breadcrumb"));

require("./router.less");

var Header = _layout.default.Header,
    Content = _layout.default.Content,
    Footer = _layout.default.Footer,
    Sider = _layout.default.Sider;
var ConnectedRouter = _router.routerRedux.ConnectedRouter;

_dynamic.default.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: "dynamic-loading"
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
});

function renderRoute(_ref) {
  var path = _ref.path,
      component = _ref.component,
      routes = _ref.routes;
  var children = [];

  if (component) {
    children.push(_react.default.createElement(_router.Route, {
      exact: true,
      key: path,
      path: path,
      component: component
    }));
  }

  if (routes && routes.length > 0) {
    return children.concat(routes.map(function (route) {
      return renderRoute(route);
    }));
  }

  return children;
}

function RouterConfig(_ref2) {
  var history = _ref2.history,
      app = _ref2.app;
  return _react.default.createElement(ConnectedRouter, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: "xms-layout"
  }, _react.default.createElement(Header, null, app.config.name), _react.default.createElement(_layout.default, null, _react.default.createElement(Sider, {
    width: "9.6rem"
  }, _react.default.createElement(_Menu.default, {
    routes: app.routes
  })), _react.default.createElement(_layout.default, {
    className: "content-layout"
  }, _react.default.createElement(_Breadcrumb.default, {
    routes: app.routes
  }), _react.default.createElement(Content, null, _react.default.createElement(_router.Switch, null, app.routes.map(function (route) {
    return renderRoute(route);
  }))), _react.default.createElement(Footer, null, "\xA92011-2018 qingting.fm All Rights Reserved.")))));
}

var _default = RouterConfig;
exports.default = _default;