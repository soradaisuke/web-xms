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

var _NavMenu = _interopRequireDefault(require("./components/NavMenu"));

var _NavBreadcrumb = _interopRequireDefault(require("./components/NavBreadcrumb"));

require("./router.less");

var Header = _layout.default.Header,
    Content = _layout.default.Content,
    Footer = _layout.default.Footer;
var ConnectedRouter = _router.routerRedux.ConnectedRouter;

_dynamic.default.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: "xms-layout-content-loading"
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
  }, _react.default.createElement(Header, {
    className: "xms-layout-header"
  }, _react.default.createElement(_router.Route, {
    render: function render(_ref3) {
      var location = _ref3.location;
      return _react.default.createElement(_NavMenu.default, {
        pathname: location.pathname,
        routes: app.routes
      });
    }
  })), _react.default.createElement(Content, {
    className: "xms-layout-content"
  }, _react.default.createElement(_router.Route, {
    render: function render(_ref4) {
      var location = _ref4.location;
      return _react.default.createElement(_NavBreadcrumb.default, {
        pathname: location.pathname,
        routes: app.routes
      });
    }
  }), _react.default.createElement(_router.Switch, null, app.routes.map(function (route) {
    return renderRoute(route);
  }))), _react.default.createElement(Footer, {
    className: "xms-layout-footer"
  }, "Footer")));
}

var _default = RouterConfig;
exports.default = _default;