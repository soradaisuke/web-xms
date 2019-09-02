"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUserModel;

var _generateUri2 = _interopRequireDefault(require("@qt/web-core/lib/generateUri"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isProduction2 = _interopRequireDefault(require("@qt/web-core/lib/isProduction"));

var _immutable = _interopRequireDefault(require("immutable"));

var _queryString = require("query-string");

var _request = _interopRequireDefault(require("../services/request"));

var ENTRY_HOST = "//entry".concat(_isProduction2.default ? '' : '.staging', ".qingtingfm.com");

function generateService(_auth, login) {
  if (!_auth) {
    throw new Error('auth of api is required');
  }

  return {
    auth: function () {
      var _auth2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _request.default.get(_auth));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function auth() {
        return _auth2.apply(this, arguments);
      }

      return auth;
    }(),
    login: login ? function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref) {
        var account, password, body;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                account = _ref.account, password = _ref.password;
                body = new FormData();
                body.append('email', account);
                body.append('password', password);
                return _context2.abrupt("return", _request.default.post(login, {
                  body: new URLSearchParams(body),
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }() : null
  };
}

function generateUserModel(auth, _login) {
  var service = generateService(auth, _login);
  return {
    namespace: 'user',
    state: null,
    reducers: {
      save: function save(state, _ref3) {
        var user = _ref3.payload.user;
        return _immutable.default.fromJS(user);
      }
    },
    effects: {
      auth: _regenerator.default.mark(function auth(_, _ref4) {
        var call, put, queries, path, user, loginUrl, _loginUrl;

        return _regenerator.default.wrap(function auth$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                call = _ref4.call, put = _ref4.put;
                queries = (0, _queryString.parse)(window.location.search);
                path = window.location.pathname;
                _context3.prev = 3;

                if (!(!_login || path !== '/login')) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 7;
                return call(service.auth);

              case 7:
                user = _context3.sent;
                _context3.next = 10;
                return put({
                  type: 'save',
                  payload: {
                    user: user
                  }
                });

              case 10:
                _context3.next = 29;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](3);

                if (!_login) {
                  _context3.next = 23;
                  break;
                }

                if (!(path !== '/login' && (!queries || queries.auth !== '1'))) {
                  _context3.next = 20;
                  break;
                }

                loginUrl = (0, _generateUri2.default)("".concat(window.location.origin, "/login"), {
                  return_url: (0, _generateUri2.default)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(loginUrl);
                _context3.next = 21;
                break;

              case 20:
                throw _context3.t0;

              case 21:
                _context3.next = 29;
                break;

              case 23:
                if (!(!queries || queries.auth !== '1')) {
                  _context3.next = 28;
                  break;
                }

                _loginUrl = (0, _generateUri2.default)("".concat(ENTRY_HOST, "/v1/sso/login.html"), {
                  return_url: (0, _generateUri2.default)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(_loginUrl);
                _context3.next = 29;
                break;

              case 28:
                throw _context3.t0;

              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, auth, null, [[3, 12]]);
      }),
      login: _regenerator.default.mark(function login(_ref5, _ref6) {
        var _ref5$payload, account, password, call;

        return _regenerator.default.wrap(function login$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref5$payload = _ref5.payload, account = _ref5$payload.account, password = _ref5$payload.password;
                call = _ref6.call;

                if (!_login) {
                  _context4.next = 11;
                  break;
                }

                _context4.prev = 3;
                _context4.next = 6;
                return call(service.login, {
                  account: account,
                  password: password
                });

              case 6:
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](3);
                throw _context4.t0;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, login, null, [[3, 8]]);
      })
    },
    subscriptions: {
      setup: function setup(_ref7) {
        var dispatch = _ref7.dispatch;
        dispatch({
          type: 'auth'
        });
      }
    }
  };
}