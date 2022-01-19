"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUserModel;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _immutable = _interopRequireDefault(require("immutable"));

var _queryString = require("query-string");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _env = require("@qt/env");

var _webCommon = require("@qt/web-common");

var _request = _interopRequireDefault(require("../services/request"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ENTRY_HOST = "//entry".concat(_env.isProduction ? '' : '.staging', ".qingtingfm.com");

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
        var call, put, queries, path, user, permissions, loginUrl, _loginUrl;

        return _regenerator.default.wrap(function auth$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                call = _ref7.call, put = _ref7.put;
                queries = (0, _queryString.parse)(window.location.search);
                path = window.location.pathname;
                _context4.prev = 3;

                if (!(!_login || path !== '/login')) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 7;
                return call(service.auth);

              case 7:
                user = _context4.sent;
                permissions = (user === null || user === void 0 ? void 0 : user.permission) || (user === null || user === void 0 ? void 0 : user.permissions);

                if ((0, _isArray2.default)(permissions)) {
                  permissions = (0, _reduce2.default)(permissions, function (pMap, p) {
                    return (0, _set2.default)(pMap, p, true);
                  }, {});
                }

                _context4.next = 12;
                return put({
                  type: 'save',
                  payload: {
                    user: _objectSpread(_objectSpread({}, user || {}), {}, {
                      permissions: permissions
                    })
                  }
                });

              case 12:
                _context4.next = 31;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](3);

                if (!_login) {
                  _context4.next = 25;
                  break;
                }

                if (!(path !== '/login' && (!queries || queries.auth !== '1'))) {
                  _context4.next = 22;
                  break;
                }

                loginUrl = (0, _webCommon.generateUri)("".concat(window.location.origin, "/login"), {
                  return_url: (0, _webCommon.generateUri)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(loginUrl);
                _context4.next = 23;
                break;

              case 22:
                throw _context4.t0;

              case 23:
                _context4.next = 31;
                break;

              case 25:
                if (!(!queries || queries.auth !== '1')) {
                  _context4.next = 30;
                  break;
                }

                _loginUrl = (0, _webCommon.generateUri)("".concat(ENTRY_HOST, "/v1/sso/login.html"), {
                  return_url: (0, _webCommon.generateUri)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(_loginUrl);
                _context4.next = 31;
                break;

              case 30:
                throw _context4.t0;

              case 31:
              case "end":
                return _context4.stop();
            }
          }
        }, auth, null, [[3, 14]]);
      }),
      logout: _regenerator.default.mark(function logout(_, _ref8) {
        var call;
        return _regenerator.default.wrap(function logout$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                call = _ref8.call;

                if (!_logout) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 4;
                return call(service.logout);

              case 4:
                _context5.next = 7;
                break;

              case 6:
                if (window.location.host.indexOf('qingtingfm.com') !== -1) {
                  _jsCookie.default.remove(_constants.TOKEN_KEY, {
                    domain: '.qingtingfm.com'
                  });

                  _jsCookie.default.remove('sso_token', {
                    domain: '.qingtingfm.com'
                  });
                } else if (window.location.host.indexOf('qingting.fm') !== -1) {
                  _jsCookie.default.remove(_constants.TOKEN_KEY, {
                    domain: '.qingting.fm'
                  });

                  _jsCookie.default.remove('sso_token', {
                    domain: '.qingting.fm'
                  });
                } else if (window.location.host.indexOf('qtfm.cn') !== -1) {
                  _jsCookie.default.remove(_constants.TOKEN_KEY, {
                    domain: '.qtfm.cn'
                  });

                  _jsCookie.default.remove('sso_token', {
                    domain: '.qtfm.cn'
                  });
                }

              case 7:
                window.location.replace(window.location.origin);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, logout);
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
                  _context6.next = 5;
                  break;
                }

                _context6.next = 5;
                return call(service.login, {
                  account: account,
                  password: password
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, login);
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