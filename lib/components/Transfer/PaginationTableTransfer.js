"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/transfer/style");

var _transfer = _interopRequireDefault(require("antd/lib/transfer"));

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _difference2 = _interopRequireDefault(require("lodash/difference"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DraggableTable = _interopRequireDefault(require("../Table/DraggableTable"));

var _getKeyByRowKey = _interopRequireDefault(require("../../utils/getKeyByRowKey"));

require("./PaginationTableTransfer.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function PaginationTableTransfer(_ref) {
  var columns = _ref.columns,
      dataSource = _ref.dataSource,
      targetDataSource = _ref.targetDataSource,
      leftTableProps = _ref.leftTableProps,
      rightTableProps = _ref.rightTableProps,
      onChange = _ref.onChange,
      rowKey = _ref.rowKey,
      transferProps = (0, _objectWithoutProperties2.default)(_ref, ["columns", "dataSource", "targetDataSource", "leftTableProps", "rightTableProps", "onChange", "rowKey"]);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      totalDataSource = _useState2[0],
      setTotalDataSource = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      rightDataSource = _useState4[0],
      setRightDataSource = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      leftDataSource = _useState6[0],
      setLeftDataSource = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      targetKeys = _useState8[0],
      setTargeKeys = _useState8[1];

  var getKey = (0, _react.useMemo)(function () {
    return (0, _getKeyByRowKey.default)(rowKey);
  }, [rowKey]);
  (0, _react.useEffect)(function () {
    setRightDataSource(targetDataSource);
    setTargeKeys((0, _map2.default)(targetDataSource, getKey));
  }, [targetDataSource, getKey]);
  (0, _react.useEffect)(function () {
    var data = (0, _map2.default)(dataSource, function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        disabled: !!(0, _find2.default)(rightDataSource, function (v) {
          return getKey(item) === getKey(v);
        })
      });
    });
    setLeftDataSource(data);
  }, [dataSource, getKey, rightDataSource]);
  (0, _react.useEffect)(function () {
    setTotalDataSource(function (prev) {
      return (0, _uniqBy2.default)((0, _concat2.default)(prev, dataSource), getKey);
    });
  }, [dataSource, getKey]);
  (0, _react.useEffect)(function () {
    setTotalDataSource(function (prev) {
      return (0, _uniqBy2.default)((0, _concat2.default)(prev, targetDataSource), getKey);
    });
  }, [getKey, targetDataSource]);
  var onDraggableTableChange = (0, _useEventCallback2.default)(function (val) {
    setRightDataSource(val);
    onChange === null || onChange === void 0 ? void 0 : onChange((0, _map2.default)(val, getKey), 'sort');
  }, [onChange, getKey]);
  var onTransferChange = (0, _useEventCallback2.default)(function (tKeys, direction, moveKeys) {
    var newRightDataSource;

    if (direction === 'left') {
      newRightDataSource = (0, _filter2.default)(rightDataSource, function (v) {
        return (0, _includes2.default)(tKeys, getKey(v));
      });
    } else {
      newRightDataSource = (0, _concat2.default)(rightDataSource, (0, _filter2.default)(totalDataSource, function (v) {
        return (0, _includes2.default)(moveKeys, getKey(v));
      }));
    }

    setRightDataSource(newRightDataSource);
    var newTargetKeys = (0, _map2.default)(newRightDataSource, getKey);
    setTargeKeys(newTargetKeys);
    onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, direction, moveKeys);
  });

  function renderTable(_ref2) {
    var direction = _ref2.direction,
        onItemSelectAll = _ref2.onItemSelectAll,
        onItemSelect = _ref2.onItemSelect,
        listSelectedKeys = _ref2.selectedKeys,
        listDisabled = _ref2.disabled;
    var rowSelection = {
      getCheckboxProps: function getCheckboxProps(item) {
        return {
          disabled: listDisabled || item.disabled
        };
      },
      onSelectAll: function onSelectAll(selected, selectedRows) {
        var treeSelectedKeys = (0, _map2.default)((0, _filter2.default)(selectedRows, function (item) {
          return !item.disabled;
        }), getKey);
        var diffKeys = selected ? (0, _difference2.default)(treeSelectedKeys, listSelectedKeys) : (0, _difference2.default)(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect: function onSelect(record, selected) {
        onItemSelect(getKey(record), selected);
      },
      selectedRowKeys: listSelectedKeys
    };

    var onRow = function onRow(_ref3) {
      var itemDisabled = _ref3.disabled,
          record = (0, _objectWithoutProperties2.default)(_ref3, ["disabled"]);
      var func = direction === 'left' ? leftTableProps.onRow : rightTableProps.onRow;
      var key = getKey(record);
      return _objectSpread({
        onClick: function onClick() {
          if (itemDisabled) return;
          var selected = !listSelectedKeys.includes(key);
          onItemSelect(key, selected);
        }
      }, (0, _isFunction2.default)(func) ? func(record) : {});
    };

    if (direction === 'right') {
      return _react.default.createElement(_DraggableTable.default, (0, _extends2.default)({
        dataSource: rightDataSource,
        columns: columns,
        rowKey: rowKey,
        size: "small"
      }, rightTableProps, {
        rowSelection: rowSelection,
        onRow: onRow,
        onDataSourceChange: onDraggableTableChange
      }));
    }

    return _react.default.createElement(_table.default, (0, _extends2.default)({
      dataSource: leftDataSource,
      columns: columns,
      size: "small",
      rowKey: rowKey
    }, leftTableProps, {
      rowSelection: rowSelection,
      onRow: onRow
    }));
  }

  return _react.default.createElement(_transfer.default, (0, _extends2.default)({}, transferProps, {
    targetKeys: targetKeys,
    dataSource: dataSource,
    onChange: onTransferChange,
    className: "xms-pagination-table-transfer",
    showSelectAll: false
  }), renderTable);
}

PaginationTableTransfer.propTypes = {
  dataSource: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  columns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  targetDataSource: _propTypes.default.arrayOf(_propTypes.default.object),
  leftTableProps: _propTypes.default.shape({
    onRow: _propTypes.default.func
  }),
  rightTableProps: _propTypes.default.shape({
    onRow: _propTypes.default.func
  }),
  onChange: _propTypes.default.func,
  rowKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  direction: _propTypes.default.oneOf(['left', 'right']),
  onItemSelectAll: _propTypes.default.func,
  onItemSelect: _propTypes.default.func,
  selectedKeys: _propTypes.default.arrayOf(_propTypes.default.number),
  disabled: _propTypes.default.bool
};
PaginationTableTransfer.defaultProps = {
  targetDataSource: [],
  leftTableProps: {
    onRow: null
  },
  rightTableProps: {
    onRow: null
  },
  onChange: function onChange() {},
  rowKey: 'id',
  direction: undefined,
  onItemSelectAll: undefined,
  onItemSelect: undefined,
  selectedKeys: undefined,
  disabled: undefined
};

var _default = _react.default.memo(PaginationTableTransfer);

exports.default = _default;