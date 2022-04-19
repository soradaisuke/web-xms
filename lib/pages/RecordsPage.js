"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

var _usePageData = _interopRequireDefault(require("../hooks/usePageData"));

require("./RecordsPage.less");

var _useActionParams = _interopRequireDefault(require("../hooks/useActionParams"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Column = _table.default.Column;

function showTotal(total, range) {
  return "".concat(range[0], "-").concat(range[1], "\uFF0C\u5171").concat(total, "\u4E2A");
}

function RecordsPage(_ref) {
  var isLoading = _ref.isLoading;
  var pageData = (0, _usePageData.default)();
  var page = pageData.page,
      pagesize = pageData.pagesize,
      sort = pageData.sort,
      filter = pageData.filter,
      records = pageData.records,
      total = pageData.total;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _usePageConfig = (0, _usePageConfig2.default)(),
      Component = _usePageConfig.component,
      inline = _usePageConfig.inline,
      table = _usePageConfig.table,
      pageProps = _usePageConfig.pageProps,
      fetchEffect = _usePageConfig.fetch,
      updatePage = _usePageConfig.updatePage,
      tableProps = _usePageConfig.tableProps,
      filterFormProps = _usePageConfig.filterFormProps;

  var user = (0, _useUser.default)();

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedRows = _useState2[0],
      setSelectedRows = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedRowKeys = _useState4[0],
      setSelectedRowKeys = _useState4[1];

  var params = (0, _useActionParams.default)({
    records: records
  });
  var rowActions = (0, _react.useMemo)(function () {
    return table.getRowActions();
  }, [table]);
  var multipleActions = (0, _react.useMemo)(function () {
    return table.getMultipleActions().filter(function (a) {
      return a.isVisible(params);
    });
  }, [table, params]);
  var globalActions = (0, _react.useMemo)(function () {
    return table.getGlobalActions().filter(function (a) {
      return a.isVisible(params);
    });
  }, [table, params]);
  var columns = (0, _react.useMemo)(function () {
    return table.getColumns().filter(function (column) {
      return column.canShowInTable(params);
    });
  }, [table, params]);

  var _useState5 = (0, _react.useState)(columns.map(function (c) {
    return c.getTableWidth();
  })),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 1),
      widths = _useState6[0];

  var filterColumns = (0, _react.useMemo)(function () {
    return table.getColumns().filter(function (column) {
      return column.canFilter(user);
    });
  }, [table, user]);
  var tableFilterColumns = (0, _react.useMemo)(function () {
    return filterColumns.filter(function (column) {
      return !column.canFilterOutside();
    });
  }, [filterColumns]);
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
    var newFilter = _objectSpread({}, f);

    filterColumns.forEach(function (column) {
      var filterValue = newFilter[column.getFilterKey()];

      if (column.getFilterRequired() && ((0, _isNil2.default)(filterValue) || (0, _isArray2.default)(filterValue) && filterValue.length === 0)) {
        (0, _set2.default)(newFilter, column.getFilterKey(), column.getFilterDefault());
        form.setFields([{
          name: column.getFilterKey(),
          value: column.getFilterDefault()
        }]);
      }
    });
    updatePage({
      page: 1,
      pagesize: pagesize,
      sort: sort,
      filter: newFilter
    });
  });
  var onTableChange = (0, _useEventCallback2.default)(function (pagination, filters, sorter) {
    var newPage = pagination.current;
    var newPageSize = pagination.pageSize;
    var newSort = table.getFixedSortOrder() || '';

    if (sorter && sorter.columnKey && sorter.order) {
      newSort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
    }

    if (sort !== newSort) {
      newPage = 1;
    }

    var tableFilter = {};
    tableFilterColumns.forEach(function (column) {
      (0, _set2.default)(tableFilter, column.getFilterKey(), (0, _get2.default)(filter, column.getFilterKey()));
    });

    if (!(0, _isEqual2.default)(tableFilter, filters)) {
      newPage = 1;
    }

    updatePage({
      page: newPage,
      pagesize: newPageSize,
      sort: newSort,
      filter: filter
    });
  }, [table, tableFilterColumns]);
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
  var renderColumn = (0, _react.useCallback)(function (column, index) {
    var filterProps = {};

    if (column.canFilter(user) && !column.canFilterOutside()) {
      var _column$parentColumn;

      var filteredValue = (0, _get2.default)(filter, column.getFilterKey());
      var parentFilteredValue = (0, _get2.default)(filter, (_column$parentColumn = column.parentColumn) === null || _column$parentColumn === void 0 ? void 0 : _column$parentColumn.getFilterKey());

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
          key: parentFilteredValue,
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
      className: "xms-table-column",
      fixed: column.getTableFixed(),
      width: widths.get(index),
      title: column.getTitle(),
      dataIndex: column.getKey(),
      key: column.getKey(),
      sorter: column.canSortInTable(),
      sortDirections: column.getTableSortDirections(),
      onCell: function onCell(record) {
        return {
          record: record,
          column: column,
          reload: fetch
        };
      },
      sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false
    }));
  }, [fetch, filter, sort, widths, user]);
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
        label: name,
        style: {
          fontWeight: 'bold'
        }
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
      title: "\u64CD\u4F5C",
      className: "actions"
    }, globalActions && globalActions.map(function (action) {
      return _react.default.createElement(_Action.default, {
        key: action.getKey(),
        action: action,
        records: action.isMultipleAction() ? selectedRows : null,
        reload: fetch
      });
    }));
  }, [fetch, globalActions, selectedRows]);
  var tableChildren = (0, _react.useMemo)(function () {
    var _tableProps$paginatio;

    return _react.default.createElement(_table.default, (0, _extends2.default)({
      bordered: true,
      rowKey: table.getPrimaryKey()
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
      dataSource: records,
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
    }), columns.map(function (column, index) {
      return renderColumn(column, index);
    }), rowActions.size > 0 ? _react.default.createElement(Column, {
      title: "\u64CD\u4F5C",
      key: "action",
      className: "actions",
      render: function render(_, record) {
        return _react.default.createElement(_react.default.Fragment, null, rowActions.map(function (action) {
          return _react.default.createElement(_Action.default, {
            key: action.getKey(),
            action: action,
            record: record,
            reload: fetch
          });
        }));
      }
    }) : null);
  }, [columns, records, fetch, isLoading, onTableChange, page, pagesize, renderColumn, rowActions, rowSelection, table, tableProps, total]);
  return _react.default.createElement(_Page.default, pageProps, Component ? _react.default.createElement(_card.default, {
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
  isLoading: _propTypes.default.bool
};
RecordsPage.defaultProps = {
  isLoading: false
};

var _default = _react.default.memo(RecordsPage);

exports.default = _default;