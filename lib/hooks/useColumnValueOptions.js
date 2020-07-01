"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useColumnValueOptions;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _webCommon = require("@qt/web-common");

var _useParentFilterValue = _interopRequireDefault(require("./useParentFilterValue"));

function useColumnValueOptions(column, generateFunc, forForm) {
  var parentFilterValue = (0, _useParentFilterValue.default)(column);
  var filters = (0, _react.useMemo)(function () {
    return column.getFilters(parentFilterValue, forForm ? 'disableInForm' : 'disableInFilter');
  }, [column, forForm, parentFilterValue]);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    setOptions(filters ? generateFunc(filters) : null);
  }, [filters, generateFunc]);
  (0, _react.useEffect)(function () {
    if ((!options || !filters) && column.getValueOptionsRequest()) {
      var request = (0, _webCommon.makeCancelablePromise)(column.fetchValueOptions(parentFilterValue));
      request.then(function () {
        return setOptions(generateFunc(column.getFilters(parentFilterValue, forForm ? 'disableInForm' : 'disableInFilter')));
      }, function () {});
      return function () {
        return request.cancel();
      };
    }

    return function () {};
  }, [column, options, parentFilterValue, filters, generateFunc, forForm]);
  var onSearch = (0, _useEventCallback2.default)(function () {
    var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(value) {
      var searchRequest, data;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              searchRequest = column.getValueOptionsSearchRequest();

              if (!searchRequest) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return searchRequest(value);

            case 4:
              data = _context.sent;
              setOptions(generateFunc(data));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return [options, onSearch];
}