"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

var _EditableTableCell = _interopRequireDefault(require("../components/Editable/EditableTableCell"));

var _EditableTableRow = _interopRequireDefault(require("../components/Editable/EditableTableRow"));

var _Group = _interopRequireDefault(require("../components/Group"));

var _Page = _interopRequireDefault(require("./Page"));

var _Action = _interopRequireDefault(require("../components/Action"));

var _FilterDropDown = _interopRequireDefault(require("../components/Filter/FilterDropDown"));

var _FilterIcon = _interopRequireDefault(require("../components/Filter/FilterIcon"));

var _FormItem = _interopRequireDefault(require("../components/Filter/FormItem"));

var _PageFilterFormContext = _interopRequireDefault(require("../contexts/PageFilterFormContext"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

require("./RecordsPage.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Column = _table.default.Column;

function showTotal(total, range) {
  return "".concat(range[0], "-").concat(range[1], "\uFF0C\u5171").concat(total, "\u4E2A");
}

function RecordsPage(_ref) {
  var page = _ref.page,
      pagesize = _ref.pagesize,
      sort = _ref.sort,
      filter = _ref.filter,
      isLoading = _ref.isLoading,
      records = _ref.records,
      total = _ref.total;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var user = (0, _useUser.default)();

  var _usePageConfig = (0, _usePageConfig2.default)(),
      Component = _usePageConfig.component,
      inline = _usePageConfig.inline,
      table = _usePageConfig.table,
      fetchEffect = _usePageConfig.fetch,
      updatePage = _usePageConfig.updatePage,
      tableProps = _usePageConfig.tableProps,
      filterFormProps = _usePageConfig.filterFormProps;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedRows = _useState2[0],
      setSelectedRows = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedRowKeys = _useState4[0],
      setSelectedRowKeys = _useState4[1];

  var dataSource = (0, _react.useMemo)(function () {
    return records.toJS();
  }, [records]);
  var rowActions = (0, _react.useMemo)(function () {
    return table.getRowActions().filter(function (action) {
      return action.isVisible(user);
    });
  }, [user, table]);
  var multipleActions = (0, _react.useMemo)(function () {
    return table.getMultipleActions().filter(function (action) {
      return action.isVisible(user);
    });
  }, [user, table]);
  var globalActions = (0, _react.useMemo)(function () {
    return table.getGlobalActions().filter(function (action) {
      return action.isVisible(user);
    });
  }, [user, table]);
  var columns = (0, _react.useMemo)(function () {
    return table.getColumns().filter(function (column) {
      return column.canShowInTable(user);
    });
  }, [table, user]);
  var filterColumns = (0, _react.useMemo)(function () {
    return columns.filter(function (column) {
      return column.canFilter();
    });
  }, [columns]);
  var hasOutsideFilter = (0, _react.useMemo)(function () {
    return filterColumns.filter(function (column) {
      return column.canFilterOutside();
    }).size > 0;
  }, [filterColumns]);
  var hasTableFilter = (0, _react.useMemo)(function () {
    return filterColumns.filter(function (column) {
      return !column.canFilterOutside();
    }).size > 0;
  }, [filterColumns]);
  var groupedFilterColumns = (0, _react.useMemo)(function () {
    return (0, _groupBy2.default)(filterColumns.toArray(), function (column) {
      return column.getFilterGroup();
    });
  }, [filterColumns]);
  var onTableSelectChange = (0, _useEventCallback2.default)(function (rowKeys, rows) {
    setSelectedRows(rows);
    setSelectedRowKeys(rowKeys);
  });
  var onFilterFinish = (0, _useEventCallback2.default)(function (f) {
    updatePage({
      page: page,
      pagesize: pagesize,
      sort: sort,
      filter: f
    });
  });
  var onTableChange = (0, _useEventCallback2.default)(function (pagination, _, sorter) {
    var newPage = pagination.page;
    var newPageSize = pagination.pageSize;
    var newSort = '';

    if (sorter && sorter.columnKey && sorter.order) {
      newSort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
    }

    if (sort !== newSort) {
      newPage = 1;
    }

    updatePage({
      page: newPage,
      pagesize: newPageSize,
      sort: newSort,
      filter: filter
    });
  });
  var onResetFilters = (0, _useEventCallback2.default)(function () {
    form.resetFields();
    form.submit();
  });
  var rowSelection = (0, _react.useMemo)(function () {
    return multipleActions.size > 0 ? {
      selectedRowKeys: selectedRowKeys,
      onChange: onTableSelectChange
    } : null;
  }, [multipleActions, selectedRowKeys, onTableSelectChange]);
  var fetch = (0, _react.useCallback)(function () {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    fetchEffect({
      page: page,
      pagesize: pagesize,
      sort: sort,
      filter: filter
    });
  }, [fetchEffect, filter, page, pagesize, sort]);
  var renderColumn = (0, _react.useCallback)(function (column) {
    var filterProps = {};

    if (column.canFilter() && !column.canFilterOutside()) {
      var filteredValue = (0, _get2.default)(filter, column.getFilterKey());

      if (filteredValue || filteredValue === 0 || (0, _isBoolean2.default)(filteredValue)) {
        if (column.canFilterRange() || !column.canFilterMultiple()) {
          filteredValue = [filteredValue];
        }
      } else {
        filteredValue = [];
      }

      filterProps.filtered = !!filteredValue.length && !(filteredValue.length === 1 && filteredValue[0] === null);
      filterProps.filteredValue = filteredValue;
      filterProps.filterMultiple = column.canFilterMultiple();

      filterProps.filterDropdown = function (dropDownParams) {
        return _react.default.createElement(_FilterDropDown.default, (0, _extends2.default)({
          column: column
        }, dropDownParams));
      };

      filterProps.filterIcon = function (filtered) {
        return _react.default.createElement(_FilterIcon.default, {
          column: column,
          filtered: filtered
        });
      };
    }

    return _react.default.createElement(Column, (0, _extends2.default)({}, column.getTableColumnProps(), filterProps, {
      title: column.getTitle(),
      dataIndex: column.getKey(),
      key: column.getKey(),
      sorter: column.canSortInTable(),
      sortDirections: column.getTableSortDirections(),
      onCell: function onCell(record) {
        return {
          record: record,
          column: column,
          onComplete: fetch
        };
      },
      sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false
    }));
  }, [fetch, filter, sort]);
  (0, _react.useEffect)(function () {
    table.columns.forEach(function (column) {
      column.resetFilters();
    });
  }, [table.columns]);
  (0, _react.useEffect)(function () {
    form.setFieldsValue(filter);
  }, [filter, form]);
  (0, _react.useEffect)(function () {
    fetch();
  }, [fetch, page, pagesize, sort, filter]);
  var filterFormChildren = (0, _react.useMemo)(function () {
    return (hasOutsideFilter || hasTableFilter) && _react.default.createElement(_form.default, (0, _extends2.default)({
      layout: "inline"
    }, filterFormProps, {
      form: form,
      onFinish: onFilterFinish
    }), (0, _map2.default)(groupedFilterColumns, function (cs, name) {
      return _react.default.createElement(_react.default.Fragment, {
        key: name
      }, name && _react.default.createElement(_form.default.Item, {
        label: name
      }), cs.map(function (column) {
        return _react.default.createElement(_FormItem.default, {
          key: column.getFilterKey(),
          column: column
        });
      }), _react.default.createElement("div", {
        className: "line-break",
        style: {
          width: '100%'
        }
      }));
    }), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
      type: "primary",
      htmlType: "submit"
    }, "\u7B5B\u9009")), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
      danger: true,
      type: "primary",
      htmlType: "submit",
      onClick: onResetFilters
    }, "\u91CD\u7F6E")));
  }, [filterFormProps, form, groupedFilterColumns, hasOutsideFilter, hasTableFilter, onFilterFinish, onResetFilters]);
  var globalActionsChildren = (0, _react.useMemo)(function () {
    return globalActions.size > 0 && _react.default.createElement(_Group.default, {
      title: "\u64CD\u4F5C"
    }, _react.default.createElement("div", {
      className: "actions"
    }, globalActions && globalActions.map(function (action) {
      return _react.default.createElement(_Action.default, {
        key: action.getTitle(),
        action: action,
        records: action.isMultipleAction() ? selectedRows : dataSource,
        onComplete: fetch
      });
    })));
  }, [fetch, globalActions, dataSource, selectedRows]);
  var tableChildren = (0, _react.useMemo)(function () {
    var _tableProps$paginatio;

    return _react.default.createElement(_table.default, (0, _extends2.default)({
      bordered: true
    }, tableProps, {
      components: {
        body: {
          row: _EditableTableRow.default,
          cell: _EditableTableCell.default
        }
      },
      rowClassName: function rowClassName() {
        return 'editable-row';
      },
      loading: isLoading,
      dataSource: dataSource,
      rowKey: table.getPrimaryKey(),
      rowSelection: rowSelection,
      onChange: onTableChange,
      pagination: _objectSpread(_objectSpread({
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: showTotal
      }, (_tableProps$paginatio = tableProps.pagination) !== null && _tableProps$paginatio !== void 0 ? _tableProps$paginatio : {}), {}, {
        total: total,
        current: page,
        pageSize: pagesize
      })
    }), columns.map(function (column) {
      return renderColumn(column);
    }), rowActions.size > 0 ? _react.default.createElement(Column, {
      title: "\u64CD\u4F5C",
      key: "action",
      render: function render(record) {
        return _react.default.createElement("div", {
          className: "actions"
        }, rowActions.map(function (action) {
          return _react.default.createElement(_Action.default, {
            key: action.getTitle(),
            action: action,
            record: record,
            onComplete: fetch
          });
        }));
      }
    }) : null);
  }, [columns, dataSource, fetch, isLoading, onTableChange, page, pagesize, renderColumn, rowActions, rowSelection, table, tableProps, total]);
  return _react.default.createElement(_Page.default, {
    showWatermark: !inline
  }, Component ? _react.default.createElement(_card.default, {
    className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
  }, _react.default.createElement(Component, null)) : null, _react.default.createElement(_card.default, {
    className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
  }, _react.default.createElement(_PageFilterFormContext.default.Provider, {
    value: form
  }, globalActionsChildren, _react.default.createElement(_Group.default, {
    title: "\u5217\u8868"
  }, filterFormChildren, tableChildren))));
}

RecordsPage.propTypes = {
  isLoading: _propTypes.default.bool,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  filter: _propTypes.default.object,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  sort: _propTypes.default.string,
  total: _propTypes.default.number
};
RecordsPage.defaultProps = {
  isLoading: false,
  filter: {},
  records: _immutable.default.List(),
  page: 1,
  pagesize: 10,
  sort: '',
  total: 0
};

var _default = _react.default.memo(RecordsPage);

exports.default = _default;