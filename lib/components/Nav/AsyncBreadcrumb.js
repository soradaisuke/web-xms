"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _reactAsync = require("react-async");

var useRouteMatch = _dva.router.useRouteMatch;

function AsyncBreadcrumb(_ref) {
  var getBreadcrumb = _ref.getBreadcrumb,
      dependencies = _ref.dependencies,
      defaultTitle = _ref.defaultTitle,
      path = _ref.path;

  var _useRouteMatch = useRouteMatch(path),
      matchParams = _useRouteMatch.params;

  var _useState = (0, _react.useState)((0, _pick2.default)(matchParams, dependencies)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      params = _useState2[0],
      setParams = _useState2[1];

  (0, _react.useEffect)(function () {
    setParams(function (prevParams) {
      return (0, _isEqual2.default)(prevParams, (0, _pick2.default)(matchParams, dependencies)) ? prevParams : (0, _pick2.default)(matchParams, dependencies);
    });
  }, [dependencies, matchParams]);
  var getTitle = (0, _useEventCallback2.default)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
    var _title;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getBreadcrumb(params);

          case 3:
            _title = _context.sent;
            return _context.abrupt("return", _title);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", defaultTitle);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  })));

  var _useAsync = (0, _reactAsync.useAsync)({
    promiseFn: getTitle,
    watch: params
  }),
      title = _useAsync.data;

  return _react.default.createElement("span", null, title !== null && title !== void 0 ? title : defaultTitle);
}

AsyncBreadcrumb.propTypes = {
  path: _propTypes.default.string.isRequired,
  getBreadcrumb: _propTypes.default.func.isRequired,
  dependencies: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  defaultTitle: _propTypes.default.string
};
AsyncBreadcrumb.defaultProps = {
  defaultTitle: ''
};

var _default = _react.default.memo(AsyncBreadcrumb);

exports.default = _default;