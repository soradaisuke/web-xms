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

function generateService(_auth) {
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
    }()
  };
}

function generateUserModel(auth) {
  var service = generateService(auth);
  return {
    namespace: 'user',
    state: null,
    reducers: {
      save: function save(state, _ref) {
        var user = _ref.payload.user;
        return _immutable.default.fromJS(user);
      }
    },
    effects: {
      auth: _regenerator.default.mark(function auth(_, _ref2) {
        var call, put, user, queries, loginUrl;
        return _regenerator.default.wrap(function auth$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                call = _ref2.call, put = _ref2.put;
                _context2.prev = 1;
                _context2.next = 4;
                return call(service.auth);

              case 4:
                user = _context2.sent;
                _context2.next = 7;
                return put({
                  type: 'save',
                  payload: {
                    user: user
                  }
                });

              case 7:
                _context2.next = 18;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                queries = (0, _queryString.parse)(window.location.search);

                if (!(!queries || queries.auth !== '1')) {
                  _context2.next = 17;
                  break;
                }

                loginUrl = (0, _generateUri2.default)("".concat(ENTRY_HOST, "/v1/sso/login.html"), {
                  return_url: (0, _generateUri2.default)(window.location.href, {
                    auth: 1
                  })
                });
                window.location.replace(loginUrl);
                _context2.next = 18;
                break;

              case 17:
                throw _context2.t0;

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, auth, null, [[1, 9]]);
      })
    },
    subscriptions: {
      setup: function setup(_ref3) {
        var dispatch = _ref3.dispatch;
        dispatch({
          type: 'auth'
        });
      }
    }
  };
}