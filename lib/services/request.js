"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _queryString = require("query-string");

var _fetch = _interopRequireDefault(require("dva/fetch"));

var _generateUri = _interopRequireDefault(require("../utils/generateUri"));

var host = window.location.host;

function setHost(h) {
  host = h;
}

function generateRequest(_x) {
  return _generateRequest.apply(this, arguments);
}

function _generateRequest() {
  _generateRequest = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path) {
    var options,
        newOptions,
        uri,
        response,
        error,
        _error,
        _error2,
        _error3,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            newOptions = (0, _objectSpread2.default)({}, options);
            newOptions.headers = newOptions.headers || {};

            if (options.method && (0, _includes2.default)(['POST', 'PUT', 'PATCH'], options.method) !== -1 && (0, _isPlainObject2.default)(newOptions.body)) {
              newOptions.headers['Content-Type'] = 'application/json;charset=utf-8';
              newOptions.body = JSON.stringify(newOptions.body);
            }

            newOptions.headers.Accept = 'application/json, text/plain, */*';
            newOptions.credentials = 'include';
            uri = (0, _generateUri.default)("//".concat(host).concat(path), options.params ? options.params : {});
            _context.prev = 7;
            _context.next = 10;
            return (0, _fetch.default)(uri.href, newOptions);

          case 10:
            response = _context.sent;

            if (!(response.status < 200 || response.status >= 300)) {
              _context.next = 24;
              break;
            }

            error = new Error(response.statusText);
            error.data = {
              message: response.statusText,
              status: response.status
            };
            _context.prev = 14;
            _context.next = 17;
            return response.json();

          case 17:
            response = _context.sent;
            error.data.code = response.code || response.errorno || response.errcode;
            _context.next = 23;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](14);

          case 23:
            throw error;

          case 24:
            _context.next = 26;
            return response.json();

          case 26:
            response = _context.sent;

            if (!(response.code !== undefined)) {
              _context.next = 33;
              break;
            }

            if (!(response.code === 200)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", response.data || response.ret);

          case 30:
            _error = new Error(response.msg);
            _error.data = {
              message: response.msg,
              code: response.code
            };
            throw _error;

          case 33:
            if (!(response.errorno !== undefined)) {
              _context.next = 39;
              break;
            }

            if (!(response.errorno === 0)) {
              _context.next = 36;
              break;
            }

            return _context.abrupt("return", response.data || response.ret);

          case 36:
            _error2 = new Error(response.errormsg);
            _error2.data = {
              message: response.errormsg,
              code: response.errorno
            };
            throw _error2;

          case 39:
            if (!(response.errcode !== undefined)) {
              _context.next = 45;
              break;
            }

            if (!(response.errcode === 0)) {
              _context.next = 42;
              break;
            }

            return _context.abrupt("return", response.data);

          case 42:
            _error3 = new Error(response.errmsg);
            _error3.data = {
              message: response.errmsg,
              code: response.errcode
            };
            throw _error3;

          case 45:
            return _context.abrupt("return", response.data || response);

          case 48:
            _context.prev = 48;
            _context.t1 = _context["catch"](7);
            _context.t1.data = (0, _objectSpread2.default)({}, _context.t1.data || {}, {
              host: uri.host,
              pathname: uri.pathname,
              queryString: (0, _queryString.stringify)(uri.query),
              method: (newOptions.method || 'GET').toLowerCase(),
              reason: 'api'
            });
            throw _context.t1;

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 48], [14, 21]]);
  }));
  return _generateRequest.apply(this, arguments);
}

function get(_x2) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(url) {
    var options,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            return _context2.abrupt("return", generateRequest(url, (0, _objectSpread2.default)({}, options, {
              method: 'GET'
            })));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _get.apply(this, arguments);
}

function post(_x3) {
  return _post.apply(this, arguments);
}

function _post() {
  _post = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(url) {
    var options,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            return _context3.abrupt("return", generateRequest(url, (0, _objectSpread2.default)({}, options, {
              method: 'POST'
            })));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _post.apply(this, arguments);
}

function put(_x4) {
  return _put.apply(this, arguments);
}

function _put() {
  _put = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(url) {
    var options,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            return _context4.abrupt("return", generateRequest(url, (0, _objectSpread2.default)({}, options, {
              method: 'PUT'
            })));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _put.apply(this, arguments);
}

function remove(_x5) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(url) {
    var options,
        _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            return _context5.abrupt("return", generateRequest(url, (0, _objectSpread2.default)({}, options, {
              method: 'DELETE'
            })));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _remove.apply(this, arguments);
}

var _default = {
  setHost: setHost,
  get: get,
  post: post,
  put: put,
  remove: remove
};
exports.default = _default;