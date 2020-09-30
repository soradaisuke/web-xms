"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DraggableBodyRow = _interopRequireDefault(require("./DraggableBodyRow"));

var _DraggableHeaderRow = _interopRequireDefault(require("./DraggableHeaderRow"));

var _getKeyByRowKey = _interopRequireDefault(require("../../utils/getKeyByRowKey"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var dndContext = (0, _reactDnd.createDndContext)(_reactDndHtml5Backend.HTML5Backend);
var dragComponents = {
  header: {
    row: _DraggableHeaderRow.default
  },
  body: {
    row: _DraggableBodyRow.default
  }
};

function DraggableTable(_ref) {
  var onRow = _ref.onRow,
      onChange = _ref.onChange,
      onDataSourceChange = _ref.onDataSourceChange,
      dataSource = _ref.dataSource,
      pagination = _ref.pagination,
      rowKey = _ref.rowKey,
      components = _ref.components,
      tableProps = (0, _objectWithoutProperties2.default)(_ref, ["onRow", "onChange", "onDataSourceChange", "dataSource", "pagination", "rowKey", "components"]);

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      current = _useState2[0],
      setCurrent = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      pageSize = _useState4[0],
      setPageSize = _useState4[1];

  (0, _react.useEffect)(function () {
    setCurrent((pagination === null || pagination === void 0 ? void 0 : pagination.current) || 1);
  }, [pagination]);
  (0, _react.useEffect)(function () {
    setPageSize((pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) || 10);
  }, [pagination]);
  var getKey = (0, _react.useMemo)(function () {
    return (0, _getKeyByRowKey.default)(rowKey);
  }, [rowKey]);
  var moveRow = (0, _useEventCallback2.default)(function (dragIndex, hoverIndex) {
    var copyDataSource = (0, _toConsumableArray2.default)(dataSource);
    var dragRow = copyDataSource[dragIndex];
    copyDataSource.splice(dragIndex, 1);
    copyDataSource.splice(hoverIndex, 0, dragRow);
    onDataSourceChange(copyDataSource, [getKey(dataSource[dragIndex], getKey(dataSource[hoverIndex]))]);
  }, [dataSource, onDataSourceChange, getKey]);
  var onTableChange = (0, _useEventCallback2.default)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onChange === null || onChange === void 0 ? void 0 : onChange.apply(void 0, args);
    setCurrent(args[0].current);
    setPageSize(args[0].pageSize);
  });
  var composeOnRow = (0, _react.useCallback)(function (record, index) {
    var prevTotalRows = (current - 1) * pageSize;
    return _objectSpread(_objectSpread({}, onRow(record, index)), {}, {
      index: index + prevTotalRows,
      moveRow: moveRow,
      showArrowUp: current !== 1 && index === 0,
      showArrowDown: index === pageSize - 1 && index !== dataSource.length - 1
    });
  }, [moveRow, onRow, current, pageSize, dataSource.length]);
  return _react.default.createElement(_reactDnd.DndProvider, {
    manager: dndContext.dragDropManager
  }, _react.default.createElement(_table.default, (0, _extends2.default)({
    dataSource: dataSource,
    components: (0, _merge2.default)(dragComponents, components),
    pagination: pagination,
    onRow: composeOnRow,
    rowKey: rowKey,
    onChange: onTableChange
  }, tableProps)));
}

DraggableTable.propTypes = {
  dataSource: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onRow: _propTypes.default.func,
  onDataSourceChange: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func,
  components: _propTypes.default.object,
  rowKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  pagination: _propTypes.default.shape({
    current: _propTypes.default.number,
    pageSize: _propTypes.default.number,
    onChange: _propTypes.default.func
  })
};
DraggableTable.defaultProps = {
  onChange: null,
  onRow: function onRow() {},
  pagination: null,
  rowKey: 'id',
  components: {}
};

var _default = _react.default.memo(DraggableTable);

exports.default = _default;