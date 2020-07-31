"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/transfer/style");

var _transfer = _interopRequireDefault(require("antd/lib/transfer"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var StaticTableTransfer = function StaticTableTransfer(_ref) {
  var leftColumns = _ref.leftColumns,
      rightColumns = _ref.rightColumns,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["leftColumns", "rightColumns"]);
  return _react.default.createElement(_transfer.default, (0, _extends2.default)({}, restProps, {
    showSelectAll: false
  }), function (_ref2) {
    var direction = _ref2.direction,
        filteredItems = _ref2.filteredItems,
        onItemSelectAll = _ref2.onItemSelectAll,
        onItemSelect = _ref2.onItemSelect,
        listSelectedKeys = _ref2.selectedKeys,
        listDisabled = _ref2.disabled;
    var columns = direction === 'left' ? leftColumns : rightColumns;
    var rowSelection = {
      getCheckboxProps: function getCheckboxProps(item) {
        return {
          disabled: listDisabled || item.disabled
        };
      },
      onSelectAll: function onSelectAll(selected, selectedRows) {
        var treeSelectedKeys = selectedRows.filter(function (item) {
          return !item.disabled;
        }).map(function (_ref3) {
          var key = _ref3.key;
          return key;
        });
        var diffKeys = selected ? (0, _difference.default)(treeSelectedKeys, listSelectedKeys) : (0, _difference.default)(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect: function onSelect(_ref4, selected) {
        var key = _ref4.key;
        onItemSelect(key, selected);
      },
      selectedRowKeys: listSelectedKeys
    };
    return _react.default.createElement(_table.default, {
      rowSelection: rowSelection,
      columns: columns,
      dataSource: filteredItems,
      size: "small",
      style: {
        pointerEvents: listDisabled ? 'none' : null
      },
      onRow: function onRow(_ref5) {
        var key = _ref5.key,
            itemDisabled = _ref5.disabled;
        return {
          onClick: function onClick() {
            if (itemDisabled || listDisabled) return;
            onItemSelect(key, !listSelectedKeys.includes(key));
          }
        };
      }
    });
  });
};

StaticTableTransfer.propTypes = {
  leftColumns: _propTypes.default.array.isRequired,
  rightColumns: _propTypes.default.array.isRequired
};

var _default = _react.default.memo(StaticTableTransfer);

exports.default = _default;