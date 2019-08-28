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

var _dvaLoading = _interopRequireDefault(require("dva-loading"));

var _history = _interopRequireDefault(require("./utils/history"));

var _request = _interopRequireDefault(require("./services/request"));

var _processRoutes = _interopRequireDefault(require("./utils/processRoutes"));

var _generateUserModel = _interopRequireDefault(require("./utils/generateUserModel"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

var _router = _interopRequireDefault(require("./router"));

var _audio = _interopRequireDefault(require("./models/audio"));

var _login = _interopRequireDefault(require("./routes/login"));

function xms() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var app = (0, _dva.default)({
    history: _history.default,
    onError: function onError(err) {
      console.error(err.message);

      _message2.default.error(err.message);
    }
  });
  app.use((0, _dvaLoading.default)());
  app.config = (0, _merge2.default)(_defaultConfig.default, config);
  var _config$routes = config.routes,
      routes = _config$routes === void 0 ? [] : _config$routes,
      _config$api = config.api,
      api = _config$api === void 0 ? {} : _config$api;
  var _api$host = api.host,
      host = _api$host === void 0 ? window.location.host : _api$host,
      auth = api.auth,
      login = api.login;

  if (host) {
    _request.default.setHost(host);
  }

  if (login) {
    routes.push(_login.default);
  }

  try {
    if (auth) {
      if (window.location.host.indexOf('qingtingfm.com') === -1) {
        throw new Error('域名必须是*.qingtingfm.com');
      }

      app.model((0, _generateUserModel.default)(auth, login));
    }

    app.model(_audio.default);
    app.routes = (0, _processRoutes.default)({
      app: app,
      routes: routes
    });
    app.router(_router.default);
  } catch (err) {
    console.error(err);

    _message2.default.error(err.message);
  }

  var appStart = app.start;

  app.start = function start() {
    appStart('#root');
  };

  return app;
}