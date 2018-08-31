"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUserModel;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _immutable = _interopRequireDefault(require("immutable"));

var _request = _interopRequireDefault(require("../services/request"));

var _generateUri = _interopRequireDefault(require("./generateUri"));

function generateService(_login) {
  if (!_login) {
    throw new Error('generateUserModel generateService: login path is required');
  }

  return {
    login: function () {
      var _login2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _request.default.get(_login));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function login() {
        return _login2.apply(this, arguments);
      };
    }()
  };
}

function generateUserModel(login) {
  var service = generateService(login);
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
      login: _regenerator.default.mark(function login(_, _ref2) {
        var call, put, user, loginUrl;
        return _regenerator.default.wrap(function login$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                call = _ref2.call, put = _ref2.put;
                _context2.prev = 1;
                _context2.next = 4;
                return call(service.login);

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
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                loginUrl = (0, _generateUri.default)('//entry.qingtingfm.com/v1/sso/login.html', {
                  return_url: window.location.href
                });
                window.location.replace(loginUrl);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, login, this, [[1, 9]]);
      })
    },
    subscriptions: {
      setup: function setup(_ref3) {
        var dispatch = _ref3.dispatch;
        dispatch({
          type: 'login'
        });
      }
    }
  };
}