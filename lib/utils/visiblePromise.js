"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = visiblePromise;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _showError = _interopRequireDefault(require("./showError"));

function visiblePromise(_x) {
  return _visiblePromise.apply(this, arguments);
}

function _visiblePromise() {
  _visiblePromise = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref) {
    var promise, loadingMessage, successMessage, _ref$throwError, throwError, onComplete, hide, result;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promise = _ref.promise, loadingMessage = _ref.loadingMessage, successMessage = _ref.successMessage, _ref$throwError = _ref.throwError, throwError = _ref$throwError === void 0 ? false : _ref$throwError, onComplete = _ref.onComplete;

            if (loadingMessage) {
              hide = _message2.default.loading(loadingMessage, 0);
            }

            _context.prev = 2;
            _context.next = 5;
            return promise;

          case 5:
            result = _context.sent;

            if (hide) {
              hide();
            }

            if ((0, _isFunction2.default)(onComplete)) {
              onComplete({
                result: result
              });
            }

            if (successMessage) {
              _message2.default.success(successMessage);
            }

            _context.next = 17;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);

            if (hide) {
              hide();
            }

            (0, _showError.default)(_context.t0.message);

            if (!throwError) {
              _context.next = 17;
              break;
            }

            throw _context.t0;

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));
  return _visiblePromise.apply(this, arguments);
}