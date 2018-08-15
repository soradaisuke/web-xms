"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xms;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _dva = _interopRequireDefault(require("dva"));

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var _valiadateRoute = _interopRequireDefault(require("./utils/valiadateRoute"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function xms(config) {
  var app = (0, _dva.default)({
    history: (0, _createBrowserHistory.default)(),
    onError: function onError() {}
  });
  app.config = (0, _merge2.default)(_defaultConfig.default, config);

  app.routes = function (data) {
    var routes = (0, _isFunction2.default)(data) ? data(app) : data;
    (0, _forEach2.default)(routes, function (route) {
      return (0, _valiadateRoute.default)(route);
    });
    app.routes = routes;
  };

  app.router(_router.default);
  return app;
}