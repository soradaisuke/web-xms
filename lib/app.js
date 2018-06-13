"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _dva = _interopRequireDefault(require("dva"));

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var _valiadateRoute = _interopRequireDefault(require("./utils/valiadateRoute"));

var _router = _interopRequireDefault(require("./router"));

require("./app.less");

var app = (0, _dva.default)({
  history: (0, _createBrowserHistory.default)(),
  onError: function onError() {}
});

app.routes = function (data) {
  var routes = (0, _isFunction2.default)(data) ? data(app) : data;
  (0, _forEach2.default)(routes, function (route) {
    return (0, _valiadateRoute.default)(route);
  });
  app.routes = routes;
};

(function () {
  console.log('[HMR] inited with babel-plugin-dva-hmr');

  var router = require('./router');

  app.router(router.default || router);
  app.use({
    onHmr: function onHmr(render) {
      if (module.hot) {
        var renderNormally = render;

        var renderException = function renderException(error) {
          var RedBox = require('redbox-react');

          ReactDOM.render(React.createElement(RedBox, {
            error: error
          }), document.querySelector('#root'));
        };

        var newRender = function newRender(router) {
          try {
            renderNormally(router);
          } catch (error) {
            console.error('error', error);
            renderException(error);
          }
        };

        module.hot.accept('./router', function () {
          var router = require('./router');

          newRender(router.default || router);
        });
      }
    }
  });
})();

var _default = app;
exports.default = _default;