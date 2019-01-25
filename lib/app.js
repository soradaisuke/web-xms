"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xms;

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _dva = _interopRequireDefault(require("dva"));

var _history = _interopRequireDefault(require("./utils/history"));

var _dvaLoading = _interopRequireDefault(require("dva-loading"));

var _request = _interopRequireDefault(require("./services/request"));

var _processRoutes = _interopRequireDefault(require("./utils/processRoutes"));

var _generateUserModel = _interopRequireDefault(require("./utils/generateUserModel"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

var _router = _interopRequireDefault(require("./router"));

function xms() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var app = (0, _dva.default)({
    history: _history.default,
    onError: function onError(err) {
      _message2.default.error(err.message);
    }
  });
  app.use((0, _dvaLoading.default)());
  app.config = (0, _merge2.default)(_defaultConfig.default, config);
  var routes = config.routes,
      _config$api = config.api;
  _config$api = _config$api === void 0 ? {} : _config$api;
  var host = _config$api.host,
      login = _config$api.login;

  if (host) {
    _request.default.setHost(host);
  }

  try {
    if (login) {
      if (window.location.host.indexOf('qingtingfm.com') === -1) {
        throw new Error('域名必须是*.qingtingfm.com');
      }

      app.model((0, _generateUserModel.default)(login));
    }

    app.routes = (0, _processRoutes.default)({
      app: app,
      routes: routes
    });
    app.router(_router.default);
  } catch (err) {
    _message2.default.error(err.message);
  }

  var appStart = app.start;

  app.start = function start() {
    appStart('#root');
  };

  return app;
}