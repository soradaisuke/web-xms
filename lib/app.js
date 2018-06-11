"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _dva = _interopRequireDefault(require("dva"));

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var _valiadateRoute = _interopRequireDefault(require("./utils/valiadateRoute"));

require("./app.less");

var app = (0, _dva.default)({
  history: (0, _createBrowserHistory.default)(),
  onError: function onError() {}
});

app.routes = function (routes) {
  (0, _forEach2.default)(routes, function (route) {
    return (0, _valiadateRoute.default)(route);
  });
  app.routes = routes;
};

var _default = app;
exports.default = _default;