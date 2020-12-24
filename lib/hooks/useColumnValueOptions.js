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

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = require("react");

var _webCommon = require("@qt/web-common");

var _useParentFilterValue = _interopRequireDefault(require("./useParentFilterValue"));

var _useParentFormValue = _interopRequireDefault(require("./useParentFormValue"));

var _Column = _interopRequireDefault(require("../schema/Column"));

var _useForm = _interopRequireDefault(require("./useForm"));

function useColumnValueOptions(column, generateFunc, forForm, initialValueOptions, isEdit, onLoadOptions) {
  var form = (0, _useForm.default)();
  var parentFilterValue = (0, _useParentFilterValue.default)(column);
  var parentFormValue = (0, _useParentFormValue.default)(column);
  var parentValue = forForm ? parentFormValue : parentFilterValue;
  var filters = (0, _react.useMemo)(function () {
    return column.getFilters(parentValue, forForm ? _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM : _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER);
  }, [column, forForm, parentValue]);

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    setOptions(generateFunc(initialValueOptions));
  }, [generateFunc, initialValueOptions]);
  (0, _react.useEffect)(function () {
    if (!options) {
      if (filters) {
        setOptions(generateFunc(filters));
      } else if (column.getValueOptionsRequest()) {
        var request = (0, _webCommon.makeCancelablePromise)(column.fetchValueOptions(parentValue));
        request.then(function () {
          var os = generateFunc(column.getFilters(parentValue, forForm ? _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM : _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER));
          setOptions(os);
          onLoadOptions === null || onLoadOptions === void 0 ? void 0 : onLoadOptions(os);
        }, function () {});
        return function () {
          return request.cancel();
        };
      }
    }

    return function () {};
  }, [column, options, onLoadOptions, parentValue, filters, generateFunc, forForm]);
  var onSearch = (0, _useEventCallback2.default)((0, _debounce2.default)(function () {
    var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(v) {
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
              return searchRequest({
                value: v,
                parentValue: parentValue,
                isEdit: isEdit,
                form: form
              });

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
  }(), 400));
  return [options, onSearch];
}