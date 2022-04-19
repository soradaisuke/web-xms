"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Page = _interopRequireDefault(require("../../pages/Page"));

var _PaginationTableTransfer = _interopRequireDefault(require("./PaginationTableTransfer"));

var _getKeyByRowKey = _interopRequireDefault(require("../../utils/getKeyByRowKey"));

require("./DynamicPaginationTableTransfer.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var request = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(requsetFunc, params, callback) {
    var res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return requsetFunc(params);

          case 3:
            res = _context.sent;
            callback(res);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _message2.default.error(_context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function request(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function DynamicPaginationTableTransfer(_ref2) {
  var _leftTableProps$pagin;

  var fetch = _ref2.fetch,
      onCancel = _ref2.onCancel,
      onOk = _ref2.onOk,
      onChange = _ref2.onChange,
      footer = _ref2.footer,
      okText = _ref2.okText,
      cancelText = _ref2.cancelText,
      rowKey = _ref2.rowKey,
      leftTableProps = _ref2.leftTableProps,
      rightTableProps = _ref2.rightTableProps,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, ["fetch", "onCancel", "onOk", "onChange", "footer", "okText", "cancelText", "rowKey", "leftTableProps", "rightTableProps"]);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      leftTableDataSource = _useState2[0],
      setLeftTableDataSource = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      rightTableDataSource = _useState4[0],
      setRightTableDataSource = _useState4[1];

  var _useState5 = (0, _react.useState)({
    current: 1,
    pageSize: (leftTableProps === null || leftTableProps === void 0 ? void 0 : (_leftTableProps$pagin = leftTableProps.pagination) === null || _leftTableProps$pagin === void 0 ? void 0 : _leftTableProps$pagin.pageSize) || 10,
    total: 0
  }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      leftTablePagination = _useState6[0],
      setLeftTablePagination = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      leftLoading = _useState8[0],
      setLeftLoading = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      rightLoading = _useState10[0],
      setRightLoading = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      targetKeys = _useState12[0],
      setTargetKeys = _useState12[1];

  var getKey = (0, _react.useMemo)(function () {
    return (0, _getKeyByRowKey.default)(rowKey);
  }, [rowKey]);
  var getLeftDataSource = (0, _useEventCallback2.default)(function () {
    var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(page, pageSize) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setLeftLoading(true);
              _context2.next = 3;
              return request(fetch.left, {
                page: page,
                pagesize: pageSize
              }, function (res) {
                setLeftTableDataSource(res.items);
                setLeftTablePagination({
                  current: page,
                  pageSize: pageSize,
                  total: res.total
                });
              });

            case 3:
              setLeftLoading(false);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }(), [fetch.left]);
  var getRightDataSource = (0, _react.useCallback)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setRightLoading(true);
            _context3.next = 3;
            return request(fetch.right, {
              page: 1,
              pagesize: 99
            }, function (res) {
              setRightTableDataSource(res.items);
              var keys = (0, _map2.default)(res.items, getKey);
              setTargetKeys({
                initial: keys,
                recently: keys
              });
            });

          case 3:
            setRightLoading(false);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), [fetch.right, getKey]);
  var onLeftTableChange = (0, _useEventCallback2.default)(function () {
    var _leftTableProps$onCha;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    leftTableProps === null || leftTableProps === void 0 ? void 0 : (_leftTableProps$onCha = leftTableProps.onChange) === null || _leftTableProps$onCha === void 0 ? void 0 : _leftTableProps$onCha.call.apply(_leftTableProps$onCha, [leftTableProps].concat(args));
    var pagination = args[0];

    if (pagination.current !== leftTablePagination.current || pagination.pageSize !== leftTablePagination.pageSize) {
      getLeftDataSource(pagination.current, pagination.pageSize);
    }
  });
  var onTransferChange = (0, _useEventCallback2.default)(function (val, direction, moveKeys) {
    setTargetKeys(_objectSpread(_objectSpread({}, targetKeys), {}, {
      recently: val
    }));
    onChange === null || onChange === void 0 ? void 0 : onChange(val, direction, moveKeys);
  }, [targetKeys, onChange]);
  var onClickOk = (0, _useEventCallback2.default)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4() {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!onOk) {
              _context4.next = 5;
              break;
            }

            setRightLoading(true);
            _context4.next = 4;
            return request(onOk, targetKeys.recently, getRightDataSource);

          case 4:
            setRightLoading(false);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })), [onOk, getRightDataSource, targetKeys]);
  var renderFooter = (0, _react.useCallback)(function () {
    var footerNode;

    if (footer === null) {
      return;
    } else if ((0, _isString2.default)(footer) || (0, _react.isValidElement)(footer)) {
      footerNode = footer;
    } else {
      var disabled = (0, _isEqual2.default)(targetKeys.recently, targetKeys.initial);
      footerNode = _react.default.createElement("div", {
        className: "xms-dynamic-pagination-table-transfer-footer"
      }, _react.default.createElement(_button.default, {
        onClick: onCancel
      }, cancelText), _react.default.createElement(_button.default, {
        disabled: disabled,
        onClick: onClickOk,
        type: "primary"
      }, okText));
    }

    return footerNode;
  }, [footer, onCancel, onClickOk, okText, cancelText, targetKeys]);
  (0, _react.useEffect)(function () {
    getLeftDataSource(1, leftTablePagination.pageSize);
  }, [getLeftDataSource, leftTablePagination.pageSize]);
  (0, _react.useEffect)(function () {
    getRightDataSource();
  }, [getRightDataSource]);
  return _react.default.createElement(_Page.default, null, _react.default.createElement(_PaginationTableTransfer.default, (0, _extends2.default)({
    rowKey: rowKey
  }, restProps, {
    leftTableProps: _objectSpread(_objectSpread({}, leftTableProps !== null && leftTableProps !== void 0 ? leftTableProps : {}), {}, {
      onChange: onLeftTableChange,
      loading: leftLoading,
      pagination: _objectSpread(_objectSpread({}, (leftTableProps === null || leftTableProps === void 0 ? void 0 : leftTableProps.pagination) || {}), leftTablePagination)
    }),
    rightTableProps: _objectSpread(_objectSpread({}, rightTableProps !== null && rightTableProps !== void 0 ? rightTableProps : {}), {}, {
      loading: rightLoading
    }),
    dataSource: leftTableDataSource,
    targetDataSource: rightTableDataSource,
    onChange: onTransferChange
  })), renderFooter());
}

DynamicPaginationTableTransfer.propTypes = {
  fetch: _propTypes.default.shape({
    left: _propTypes.default.func,
    right: _propTypes.default.func
  }).isRequired,
  onChange: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onOk: _propTypes.default.func,
  footer: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.element)]),
  okText: _propTypes.default.string,
  cancelText: _propTypes.default.string,
  rowKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  leftTableProps: _propTypes.default.object,
  rightTableProps: _propTypes.default.object
};
DynamicPaginationTableTransfer.defaultProps = {
  rowKey: 'id',
  onCancel: function onCancel() {
    return window.history.back();
  },
  onOk: null,
  onChange: null,
  footer: undefined,
  okText: '确定',
  cancelText: '取消',
  leftTableProps: {},
  rightTableProps: {}
};

var _default = _react.default.memo(DynamicPaginationTableTransfer);

exports.default = _default;