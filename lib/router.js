"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _react = _interopRequireDefault(require("react"));

var _router = require("dva/router");

var _dynamic = _interopRequireDefault(require("dva/dynamic"));

var _NavMenu = _interopRequireDefault(require("./components/NavMenu"));

var _NavBreadcrumb = _interopRequireDefault(require("./components/NavBreadcrumb"));

var _router2 = _interopRequireDefault(require("./router.less"));

var Header = _layout.default.Header,
    Content = _layout.default.Content,
    Footer = _layout.default.Footer;
var ConnectedRouter = _router.routerRedux.ConnectedRouter;

_dynamic.default.setDefaultLoadingComponent(function () {
  return _react.default.createElement("div", {
    className: _router2.default.loading
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
});

function RouterConfig(_ref) {
  var history = _ref.history,
      app = _ref.app;

  function renderRoute(_ref2) {
    var path = _ref2.path,
        _component = _ref2.component,
        _models = _ref2.models,
        routes = _ref2.routes;
    var children = [];

    if (_component) {
      var c = _component;

      if (_component instanceof _promise.default) {
        c = (0, _dynamic.default)({
          app: app,
          models: function models() {
            return _models || [];
          },
          component: function component() {
            return _component;
          }
        });
      }

      children.push(_react.default.createElement(_router.Route, {
        exact: true,
        key: path,
        path: path,
        component: c
      }));
    }

    if (routes && routes.length > 0) {
      return children.concat(routes.map(function (route) {
        return renderRoute({
          path: "".concat(path).concat(route.path),
          component: route.component,
          models: routes.models,
          routes: route.routes
        });
      }));
    }

    return children;
  }

  return _react.default.createElement(ConnectedRouter, {
    history: history
  }, _react.default.createElement(_layout.default, {
    className: _router2.default.layout
  }, _react.default.createElement(Header, null, _react.default.createElement(_router.Route, {
    render: function render(_ref3) {
      var location = _ref3.location;
      return _react.default.createElement(_NavMenu.default, {
        pathname: location.pathname,
        routes: app.routes
      });
    }
  })), _react.default.createElement(Content, {
    className: _router2.default.content
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
    className: _router2.default.footer
  }, "Footer")));
}

var _default = RouterConfig;
exports.default = _default;