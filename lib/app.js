"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xms;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _dva = _interopRequireDefault(require("dva"));

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var _processRoutes = _interopRequireDefault(require("./utils/processRoutes"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

var _router = _interopRequireDefault(require("./router"));

function xms() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var app = (0, _dva.default)({
    history: (0, _createBrowserHistory.default)(),
    onError: function onError() {}
  });
  app.config = (0, _merge2.default)(_defaultConfig.default, config);
  var routes = config.routes;
  app.routes = (0, _processRoutes.default)({
    app: app,
    routes: routes
  });
  app.router(_router.default);
  return app;
}