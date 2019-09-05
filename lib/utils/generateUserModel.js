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

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _request = _interopRequireDefault(require("../services/request"));

var ENTRY_HOST = "//entry".concat(_isProduction2.default ? '' : '.staging', ".qingtingfm.com");

function generateService(_ref) {
  var _auth = _ref.auth,
      login = _ref.login,
      logout = _ref.logout;

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
    logout: logout ? (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _request.default.get(logout));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })) : null,
    login: login ? function () {
      var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref3) {
        var account, password, body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                account = _ref3.account, password = _ref3.password;
                body = new FormData();
                body.append('email', account);
                body.append('password', password);
                return _context3.abrupt("return", _request.default.post(login, {
                  body: new URLSearchParams(body),
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }() : null
  };
}

function generateUserModel(_ref5) {
  var auth = _ref5.auth,
      _login = _ref5.login,
      _logout = _ref5.logout;
  var service = generateService({
    auth: auth,
    login: _login,
    logout: _logout
  });
  return {
    namespace: 'user',
    state: null,
    reducers: {
      save: function save(state, _ref6) {
        var user = _ref6.payload.user;
        return _immutable.default.fromJS(user);
      }
    },
    effects: {
      auth: _regenerator.default.mark(function auth(_, _ref7) {
        var call, put, queries, path, user, loginUrl, _loginUrl;

        return _regenerator.default.wrap(function auth$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                call = _ref7.call, put = _ref7.put;
                queries = (0, _queryString.parse)(window.location.search);
                path = window.location.pathname;
                _context4.prev = 3;

                if (!(!_login || path !== '/login')) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 7;
                return call(service.auth);

              case 7:
                user = _context4.sent;
                _context4.next = 10;
                return put({
                  type: 'save',
                  payload: {
                    user: user
                  }
                });

              case 10:
                _context4.next = 29;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](3);

                if (!_login) {
                  _context4.next = 23;
                  break;
                }

                if (!(path !== '/login' && (!queries || queries.auth !== '1'))) {
                  _context4.next = 20;
                  break;
                }

                loginUrl = (0, _generateUri2.default)("".concat(window.location.origin, "/login"), {
                  return_url: (0, _generateUri2.default)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(loginUrl);
                _context4.next = 21;
                break;

              case 20:
                throw _context4.t0;

              case 21:
                _context4.next = 29;
                break;

              case 23:
                if (!(!queries || queries.auth !== '1')) {
                  _context4.next = 28;
                  break;
                }

                _loginUrl = (0, _generateUri2.default)("".concat(ENTRY_HOST, "/v1/sso/login.html"), {
                  return_url: (0, _generateUri2.default)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(_loginUrl);
                _context4.next = 29;
                break;

              case 28:
                throw _context4.t0;

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, auth, null, [[3, 12]]);
      }),
      logout: _regenerator.default.mark(function logout(_, _ref8) {
        var call;
        return _regenerator.default.wrap(function logout$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                call = _ref8.call;
                _context5.prev = 1;

                if (!_logout) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return call(service.logout);

              case 5:
                _context5.next = 8;
                break;

              case 7:
                if (window.location.host.indexOf('qingtingfm.com') !== -1) {
                  _jsCookie.default.remove('sso_token', {
                    domain: '.qingtingfm.com'
                  });
                } else {
                  _jsCookie.default.remove('sso_token', {
                    domain: '.qingting.fm'
                  });
                }

              case 8:
                window.location.reload();
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, logout, null, [[1, 11]]);
      }),
      login: _regenerator.default.mark(function login(_ref9, _ref10) {
        var _ref9$payload, account, password, call;

        return _regenerator.default.wrap(function login$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref9$payload = _ref9.payload, account = _ref9$payload.account, password = _ref9$payload.password;
                call = _ref10.call;

                if (!_login) {
                  _context6.next = 11;
                  break;
                }

                _context6.prev = 3;
                _context6.next = 6;
                return call(service.login, {
                  account: account,
                  password: password
                });

              case 6:
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](3);
                throw _context6.t0;

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, login, null, [[3, 8]]);
      })
    },
    subscriptions: {
      setup: function setup(_ref11) {
        var dispatch = _ref11.dispatch;
        dispatch({
          type: 'auth'
        });
      }
    }
  };
}