"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/pagination/style");

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/lib/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/popover/style");

var _popover = _interopRequireDefault(require("antd/lib/popover"));

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

var _EditableTableCell = _interopRequireDefault(require("../components/EditableTableCell"));

var _EditableTableRow = _interopRequireDefault(require("../components/EditableTableRow"));

var _Table2 = _interopRequireDefault(require("../schema/Table"));

var _TableActions = _interopRequireDefault(require("../actions/TableActions"));

var _Group = _interopRequireDefault(require("../components/Group"));

var _Page = _interopRequireDefault(require("./Page"));

var _showError = _interopRequireDefault(require("../utils/showError"));

require("./RecordsPage.less");

var Column = _table.default.Column;

var RecordsPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordsPage, _React$PureComponent);
  (0, _createClass2.default)(RecordsPage, null, [{
    key: "showTotal",
    value: function showTotal(total, range) {
      return "".concat(range[0], "-").concat(range[1], "\uFF0C\u5171").concat(total, "\u4E2A");
    }
  }]);

  function RecordsPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RecordsPage);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RecordsPage).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelectChange", function (selectedRowKeys, selectedRows) {
      _this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetPendingFilter", function () {
      _this.setState({
        pendingFilter: {}
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangePage", function (page, pagesize) {
      var _this$props = _this.props,
          updatePage = _this$props.updatePage,
          sort = _this$props.sort,
          filter = _this$props.filter;
      updatePage({
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: filter
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "checkFixedFilterValue", function (_ref) {
      var filter = _ref.filter,
          column = _ref.column;
      var fixedFilterValue = column.getTableFixedFilterValue();

      if ((0, _isUndefined2.default)((0, _get2.default)(filter, column.getTableFilterKey())) && fixedFilterValue) {
        (0, _set2.default)(filter, column.getTableFilterKey(), fixedFilterValue);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (_ref2) {
      var filters = _ref2.filters,
          sorter = _ref2.sorter,
          columns = _ref2.columns,
          _ref2$onlyFilters = _ref2.onlyFilters,
          onlyFilters = _ref2$onlyFilters === void 0 ? false : _ref2$onlyFilters;
      var _this$props2 = _this.props,
          page = _this$props2.page,
          pagesize = _this$props2.pagesize,
          updatePage = _this$props2.updatePage,
          sort = _this$props2.sort,
          filter = _this$props2.filter;
      var newFilter = (0, _cloneDeep2.default)(filter);
      columns.forEach(function (column) {
        if (column.shouldRenderTableFilter() || column.shouldRenderOutsideFilter()) {
          (0, _unset2.default)(newFilter, column.getTableFilterKey());

          if (column.parentColumn) {
            var parentFilteredValue = filters[column.parentColumn.getKey()];
            parentFilteredValue = column.parentColumn.canFilterMultipleInTable() || !parentFilteredValue ? parentFilteredValue : parentFilteredValue[0];

            if (!(0, _isEqual2.default)(parentFilteredValue, (0, _get2.default)((0, _objectSpread4.default)({}, filter), column.parentColumn.getTableFilterKey()))) {
              (0, _set2.default)(newFilter, column.getTableFilterKey(), null);
              return true;
            }
          }

          var value = filters[column.getKey()];

          if (value && value.length > 0) {
            if (column.canFilterMultipleInTable()) {
              if ((0, _filter2.default)(value, function (v) {
                return !(0, _isUndefined2.default)(v) && !(0, _isNull2.default)(v);
              }).length > 0) {
                (0, _set2.default)(newFilter, column.getTableFilterKey(), value);
              }
            } else if (!(0, _isUndefined2.default)(value[0]) && !(0, _isNull2.default)(value[0])) {
              (0, _set2.default)(newFilter, column.getTableFilterKey(), value[0]);
            }
          }

          _this.checkFixedFilterValue({
            filter: newFilter,
            column: column
          });
        }

        return true;
      });
      var newPage = page;
      var newSort = sort;

      if (!onlyFilters) {
        if (sorter && sorter.columnKey && sorter.order) {
          newSort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
        } else {
          newSort = '';
        }

        if (sort !== newSort) {
          newPage = 1;
        }
      }

      if (!(0, _isEqual2.default)(filter, newFilter)) {
        newPage = 1;
      }

      updatePage({
        page: newPage,
        pagesize: pagesize,
        sort: newSort,
        filter: newFilter
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeTriggeredFilter", function (_ref3) {
      var filters = _ref3.filters,
          columns = _ref3.columns;
      var filter = _this.props.filter;
      var pendingFilter = _this.state.pendingFilter;
      var newFilter = (0, _cloneDeep2.default)(pendingFilter);
      columns.forEach(function (column) {
        (0, _unset2.default)(newFilter, column.getTableFilterKey());

        if (column.parentColumn) {
          var parentFilteredValue = filters[column.parentColumn.getTableFilterKey()];

          if (!(0, _isEqual2.default)(parentFilteredValue, (0, _get2.default)((0, _objectSpread4.default)({}, filter, pendingFilter), column.parentColumn.getTableFilterKey()))) {
            (0, _set2.default)(newFilter, column.getTableFilterKey(), null);
            return true;
          }
        }

        var value = filters[column.getTableFilterKey()];
        (0, _set2.default)(newFilter, column.getTableFilterKey(), value);

        _this.checkFixedFilterValue({
          filter: newFilter,
          column: column
        });

        return true;
      });

      _this.setState({
        pendingFilter: newFilter
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref4) {
        var promise, loadingMessage, _ref4$throwError, throwError, _ref4$reload, reload, onComplete, hide, result;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = _ref4.promise, loadingMessage = _ref4.loadingMessage, _ref4$throwError = _ref4.throwError, throwError = _ref4$throwError === void 0 ? false : _ref4$throwError, _ref4$reload = _ref4.reload, reload = _ref4$reload === void 0 ? false : _ref4$reload, onComplete = _ref4.onComplete;

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

                _context.next = 16;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

                if (hide) {
                  hide();
                }

                (0, _showError.default)(_context.t0.message);

                if (!throwError) {
                  _context.next = 16;
                  break;
                }

                throw _context.t0;

              case 16:
                if (reload) {
                  _this.fetch();
                }

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _this$props3, fetch, page, pagesize, sort, filter;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props3 = _this.props, fetch = _this$props3.fetch, page = _this$props3.page, pagesize = _this$props3.pagesize, sort = _this$props3.sort, filter = _this$props3.filter;

              _this.resetTableState();

              fetch({
                page: page,
                pagesize: pagesize,
                sort: sort,
                filter: filter
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetFilters", function () {
      var _this$props4 = _this.props,
          updatePage = _this$props4.updatePage,
          page = _this$props4.page,
          pagesize = _this$props4.pagesize,
          sort = _this$props4.sort,
          columns = _this$props4.table.columns;

      _this.setState({
        pendingFilter: {}
      });

      var filter = {};
      columns.forEach(function (column) {
        if (!column.canFilterInTable()) {
          return;
        }

        _this.checkFixedFilterValue({
          filter: filter,
          column: column
        });
      });
      updatePage({
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: filter
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickFilterGroupSearch", function (columns) {
      var _this$props5 = _this.props,
          pagesize = _this$props5.pagesize,
          updatePage = _this$props5.updatePage,
          sort = _this$props5.sort,
          filter = _this$props5.filter;
      var pendingFilter = _this.state.pendingFilter;
      var newFilter = (0, _objectSpread4.default)({}, filter, pendingFilter);
      columns.forEach(function (column) {
        var filterKey = column.getTableFilterKey();

        if (!(0, _isUndefined2.default)(newFilter[filterKey])) {
          (0, _set2.default)(newFilter, filterKey, column.formatFormSubmitValue(newFilter[filterKey]));
        }
      });
      updatePage({
        page: 1,
        pagesize: pagesize,
        sort: sort,
        filter: newFilter
      });

      _this.resetPendingFilter();
    });
    _this.state = {
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      pendingFilter: {},
      selectedRows: []
    };
    props.table.columns.forEach(function (column) {
      column.resetFilters();
    });
    return _this;
  }

  (0, _createClass2.default)(RecordsPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
          pagesize = _this$props6.pagesize,
          page = _this$props6.page,
          sort = _this$props6.sort,
          filter = _this$props6.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || !(0, _isEqual2.default)(prevProps.filter, filter)) {
        this.fetch();
      }
    }
  }, {
    key: "resetTableState",
    value: function resetTableState() {
      var _this$state = this.state,
          selectedRowKeys = _this$state.selectedRowKeys,
          selectedRows = _this$state.selectedRows;

      if (selectedRowKeys.length || selectedRows.length) {
        this.setState({
          selectedRowKeys: [],
          selectedRows: []
        });
      }
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(_ref7) {
      var _this2 = this;

      var column = _ref7.column,
          columns = _ref7.columns,
          _ref7$shouldRenderTab = _ref7.shouldRenderTableFilter,
          shouldRenderTableFilter = _ref7$shouldRenderTab === void 0 ? true : _ref7$shouldRenderTab,
          _ref7$renderFilterInT = _ref7.renderFilterInTitle,
          renderFilterInTitle = _ref7$renderFilterInT === void 0 ? false : _ref7$renderFilterInT;
      var _this$props7 = this.props,
          sort = _this$props7.sort,
          propsFilter = _this$props7.filter,
          actions = _this$props7.actions,
          table = _this$props7.table,
          edit = _this$props7.edit,
          user = _this$props7.user,
          matchParams = _this$props7.match.params,
          filterGroupTrigger = _this$props7.filterGroupTrigger;
      var pendingFilter = this.state.pendingFilter;
      var filter = (0, _objectSpread4.default)({}, propsFilter, pendingFilter);
      var filterProps = {};
      var isAutoTrigger = !column.shouldRenderOutsideFilter() || !filterGroupTrigger;

      if (column.canFilterInTable() && shouldRenderTableFilter) {
        var _parentFilteredValue = column.parentColumn ? (0, _get2.default)(filter, column.parentColumn.getTableFilterKey()) : null;

        var _filteredValue = (0, _get2.default)(filter, column.getTableFilterKey());

        if (_filteredValue || _filteredValue === 0 || (0, _isBoolean2.default)(_filteredValue)) {
          if (column.canFilterRangeInTable() || !column.canFilterMultipleInTable()) {
            _filteredValue = [_filteredValue];
          }
        } else {
          _filteredValue = [];
        }

        var filters = column.getFilters(_parentFilteredValue, 'disableInFilter');
        var valueOptionsRequest = column.getValueOptionsRequest();

        if (filters || column.getTableFilterSearchRequest()) {
          filterProps.filters = filters;
          filterProps.filtered = !!_filteredValue.length && !(_filteredValue.length === 1 && _filteredValue[0] === null);
          filterProps.filteredValue = _filteredValue;
          filterProps.filterMultiple = column.canFilterMultipleInTable();

          if (column.canFilterTreeInTable() || column.getTableFilterSearchRequest()) {
            filterProps.filterDropdown = column.getRenderFilterTree({
              parentValue: _parentFilteredValue,
              isAutoTrigger: isAutoTrigger
            });

            filterProps.filterIcon = function (filtered) {
              return _react.default.createElement(_icon.default, {
                type: "filter",
                style: {
                  color: filtered ? '#1890ff' : undefined
                }
              });
            };
          }
        } else if (valueOptionsRequest) {
          if ((0, _isArray2.default)(_parentFilteredValue) && _parentFilteredValue.length > 0 && _parentFilteredValue[0] !== null || !(0, _isUndefined2.default)(_parentFilteredValue)) {
            filterProps.filterDropdown = function () {
              return _react.default.createElement(_spin.default, {
                style: {
                  width: '100%'
                }
              });
            };

            column.fetchValueOptions(_parentFilteredValue).then(function () {
              return _this2.forceUpdate();
            }).catch(function () {});
          }
        } else if (column.canRenderFilterDropDown() && !renderFilterInTitle) {
          filterProps.filtered = !!_filteredValue.length;
          filterProps.filteredValue = _filteredValue;

          filterProps.filterDropdown = function (dropDownParams) {
            return column.renderFilterDropDown((0, _objectSpread4.default)({}, dropDownParams, {
              isAutoTrigger: isAutoTrigger
            }));
          };

          filterProps.filterIcon = function (filtered) {
            return _react.default.createElement(_icon.default, {
              type: column.getFilterIcon(),
              style: {
                color: filtered ? '#1890ff' : undefined
              }
            });
          };
        }

        filterProps.parentFilteredValue = _parentFilteredValue;
      }

      var parentFilteredValue = column.parentColumn ? (0, _get2.default)(filter, column.parentColumn.getTableFilterKey()) : undefined;
      var editAction = actions.getEditAction();
      var filteredValue = (0, _get2.default)(filter, column.getTableFilterKey());
      return _react.default.createElement(Column, (0, _extends2.default)({}, renderFilterInTitle ? {} : filterProps, {
        title: renderFilterInTitle ? _react.default.createElement(_col.default, null, _react.default.createElement("div", null, column.getTitle()), column.renderInForm({
          isFilter: true,
          formComponentProps: (0, _objectSpread4.default)({}, column.getTableFilterComponentProps(), {
            parentValue: parentFilteredValue,
            treeCheckable: column.canFilterMultipleInTable(),
            value: (0, _isUndefined2.default)(filteredValue) || filteredValue === null ? undefined : column.formatFormFieldValue(filteredValue),
            onChange: function onChange(v) {
              var value = (0, _isObject2.default)(v) && (0, _isObject2.default)(v.target) ? v.target.value : v;

              _this2.onChangeTriggeredFilter({
                filters: (0, _objectSpread4.default)({}, filter, (0, _defineProperty2.default)({}, column.getTableFilterKey(), (0, _isUndefined2.default)(value) ? null : value)),
                columns: columns
              });
            },
            style: {
              width: 200
            },
            getPopupContainer: function getPopupContainer() {
              return document.getElementsByClassName('xms-page')[0];
            }
          })
        })) : column.getTableTitle(filterProps),
        dataIndex: column.getKey(),
        key: column.getKey(),
        width: column.getTableWidth(),
        fixed: column.getTableFixed(),
        sorter: column.canSortInTable(),
        sortDirections: column.getTableSortDirections().toArray(),
        onCell: column.canShowFormItemInEditableTable() && column.canInlineEdit() ? function (record) {
          return {
            record: record,
            column: column,
            table: table,
            user: user,
            submit: editAction && editAction.isVisible() && (0, _isFunction2.default)(editAction.isDisabled) && !editAction.isDisabled({
              user: user,
              record: record,
              table: table,
              matchParams: matchParams
            }) ? function (body) {
              return _this2.updateRecord({
                promise: editAction.getHandler({
                  edit: edit
                })({
                  id: (0, _get2.default)(record, table.getPrimaryKey()),
                  body: body
                }),
                throwError: true,
                reload: true,
                loadingMessage: editAction.getHandlingMessage()
              });
            } : null
          };
        } : null,
        sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false,
        render: function render(value, record) {
          var children = column.renderInTable((0, _objectSpread4.default)({
            value: value,
            record: record,
            user: user,
            reload: _this2.fetch
          }, filterProps));

          if (column.canInlineEdit() && editAction && !column.canShowFormItemInEditableTable()) {
            var action = _this2.renderAction(editAction, {
              record: record,
              column: column,
              inline: true
            });

            if (action) {
              return action;
            }

            action = _this2.renderAction(editAction, {
              record: record,
              column: column
            });

            if (action) {
              return _react.default.createElement(_react.default.Fragment, null, children, _react.default.createElement(_popover.default, {
                content: action
              }, _react.default.createElement(_icon.default, {
                style: {
                  marginLeft: '1rem'
                },
                type: "info-circle"
              })));
            }
          }

          return children;
        }
      }));
    }
  }, {
    key: "renderExpandFilters",
    value: function renderExpandFilters(column) {
      var _this3 = this;

      var _this$props8 = this.props,
          filter = _this$props8.filter,
          pagesize = _this$props8.pagesize,
          sort = _this$props8.sort,
          updatePage = _this$props8.updatePage;
      var parentFilteredValue = column.parentColumn ? (0, _get2.default)(filter, column.parentColumn.getTableFilterKey()) : null;
      var filteredValue = (0, _get2.default)(filter, column.getTableFilterKey());
      var filters = column.getFilters(parentFilteredValue, 'disableInFilter');
      var valueOptionsRequest = column.getValueOptionsRequest();
      var filterMultiple = column.canFilterMultipleInTable();

      if (!filters && !column.getTableFilterSearchRequest() && valueOptionsRequest) {
        if ((0, _isArray2.default)(parentFilteredValue) && parentFilteredValue.length > 0 || !(0, _isUndefined2.default)(parentFilteredValue)) {
          column.fetchValueOptions(parentFilteredValue).then(function () {
            return _this3.forceUpdate();
          }).catch(function () {});
        }
      }

      var options = filters ? filters.map(function (_ref8) {
        var value = _ref8.value,
            label = _ref8.text;
        return {
          value: value,
          label: label
        };
      }) : [];
      var FilterComponent = filterMultiple ? _checkbox.default.Group : _radio.default.Group;
      var fixedFilterValue = column.getTableFixedFilterValue();
      return _react.default.createElement(_row.default, {
        type: "flex",
        align: "middle",
        style: {
          marginBottom: '1rem'
        }
      }, "".concat(column.getTitle(), "\uFF1A"), _react.default.createElement(FilterComponent, {
        buttonStyle: "solid",
        options: filterMultiple ? options : null,
        value: filteredValue,
        onChange: function onChange(e) {
          var value;

          if (filterMultiple) {
            value = e;
          } else {
            value = e.target.value;
          }

          var newFilter = (0, _cloneDeep2.default)(filter);

          if (((0, _isUndefined2.default)(value) || (0, _isArray2.default)(value) && !(0, _size2.default)(value)) && fixedFilterValue) {
            value = fixedFilterValue;
          }

          (0, _unset2.default)(newFilter, column.getTableFilterKey());
          updatePage({
            page: 1,
            pagesize: pagesize,
            sort: sort,
            filter: (0, _objectSpread4.default)({}, newFilter, (0, _defineProperty2.default)({}, column.getTableFilterKey(), value))
          });
        }
      }, !filterMultiple && [{
        value: fixedFilterValue,
        label: '全部'
      }].concat((0, _toConsumableArray2.default)(options)).map(function (_ref9) {
        var label = _ref9.label,
            value = _ref9.value;
        return _react.default.createElement(_radio.default.Button, {
          value: value
        }, label);
      })));
    }
  }, {
    key: "renderExpandFilterGroup",
    value: function renderExpandFilterGroup() {
      var _this4 = this;

      var table = this.props.table;
      var columns = table.getColumns().filter(function (column) {
        return column.shouldRenderExpandFilter();
      });

      if (columns.size === 0) {
        return null;
      }

      return columns.map(function (column) {
        return _this4.renderExpandFilters(column);
      });
    }
  }, {
    key: "renderFilterGroup",
    value: function renderFilterGroup() {
      var _this5 = this;

      var _this$props9 = this.props,
          table = _this$props9.table,
          user = _this$props9.user,
          filterGroupTrigger = _this$props9.filterGroupTrigger;
      var columns = table.getColumns().filter(function (column) {
        return column.shouldRenderOutsideFilter(user);
      });

      var searchButton = _react.default.createElement(_button.default, {
        type: "primary",
        style: {
          marginBottom: '0.5rem'
        },
        onClick: function onClick() {
          return _this5.onClickFilterGroupSearch(columns);
        }
      }, "\u641C\u7D22");

      if (columns.size === 0) {
        return null;
      }

      var renderFilterGroupTable = function renderFilterGroupTable(filterColumns) {
        return _react.default.createElement(_table.default, {
          bordered: true,
          className: "filters-table",
          rowKey: table.getPrimaryKey(),
          pagination: false,
          onChange: function onChange(pagination, filters, sorter) {
            return _this5.onChange({
              pagination: pagination,
              filters: filters,
              sorter: sorter,
              columns: filterColumns,
              onlyFilter: true
            });
          },
          scroll: {
            x: true
          },
          getPopupContainer: function getPopupContainer() {
            return document.getElementsByClassName('xms-page')[0];
          }
        }, filterColumns.map(function (column) {
          return _this5.renderColumn({
            column: column,
            columns: filterColumns,
            renderFilterInTitle: filterGroupTrigger
          });
        }));
      };

      var groupedColumns = (0, _groupBy2.default)(columns.toArray(), function (column) {
        return column.getFilterGroup();
      });

      if ((0, _size2.default)(groupedColumns) === 1) {
        return _react.default.createElement(_react.default.Fragment, null, renderFilterGroupTable((0, _values2.default)(groupedColumns)[0]), filterGroupTrigger && searchButton);
      }

      return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(groupedColumns, function (iColumns, groupName) {
        return _react.default.createElement(_row.default, {
          key: groupName,
          type: "flex"
        }, _react.default.createElement(_col.default, {
          className: "filter-group-name"
        }, groupName), _react.default.createElement(_col.default, {
          style: {
            flex: 1
          }
        }, renderFilterGroupTable(iColumns)));
      }), filterGroupTrigger && _react.default.createElement(_row.default, {
        key: "button",
        type: "flex"
      }, _react.default.createElement(_col.default, {
        className: "filter-group-name"
      }), _react.default.createElement(_col.default, {
        style: {
          flex: 1
        }
      }, searchButton)));
    }
  }, {
    key: "renderAction",
    value: function renderAction(action) {
      var _this6 = this;

      var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          record = _ref10.record,
          records = _ref10.records,
          column = _ref10.column,
          inline = _ref10.inline;

      var _this$props10 = this.props,
          user = _this$props10.user,
          remove = _this$props10.remove,
          edit = _this$props10.edit,
          create = _this$props10.create,
          table = _this$props10.table,
          matchParams = _this$props10.match.params;
      var props = {
        inline: inline,
        user: user,
        matchParams: matchParams,
        remove: remove,
        edit: edit,
        create: create,
        table: table,
        column: column,
        confirm: this.fetch,
        submit: this.updateRecord
      };

      if (record) {
        props = (0, _objectSpread4.default)({}, props, {
          record: record
        });
      } else if (records) {
        props = (0, _objectSpread4.default)({}, props, {
          records: records,
          submit: function () {
            var _submit = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
              return _regenerator.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _this6.updateRecord((0, _objectSpread4.default)({}, params, {
                        throwError: true
                      }));

                    case 2:
                      _this6.resetTableState();

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));

            function submit(_x2) {
              return _submit.apply(this, arguments);
            }

            return submit;
          }()
        });
      }

      return action.render(props);
    }
  }, {
    key: "renderRowActions",
    value: function renderRowActions() {
      var _this7 = this;

      var _this$props11 = this.props,
          actions = _this$props11.actions,
          user = _this$props11.user;
      var rowActions = actions.getRowActions().filter(function (action) {
        return action.isVisible(user);
      });
      return rowActions.size > 0 ? _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(record) {
          return _react.default.createElement("div", {
            className: "actions"
          }, rowActions.map(function (action) {
            return _this7.renderAction(action, {
              record: record
            });
          }));
        }
      }) : null;
    }
  }, {
    key: "renderGlobalActions",
    value: function renderGlobalActions(multipleActions) {
      var _this8 = this;

      var _this$props12 = this.props,
          actions = _this$props12.actions,
          user = _this$props12.user;
      var globalActions = actions.getGlobalActions().filter(function (action) {
        return action.isVisible(user);
      });

      if (globalActions.size === 0 && (!multipleActions || multipleActions.size === 0)) {
        return null;
      }

      var records = this.state.selectedRows;
      return _react.default.createElement(_Group.default, {
        title: "\u64CD\u4F5C"
      }, _react.default.createElement("div", {
        className: "actions"
      }, globalActions.map(function (action) {
        return _this8.renderAction(action);
      }), multipleActions && multipleActions.map(function (action) {
        return _this8.renderAction(action, {
          records: records
        });
      })));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this9 = this;

      var _this$state2 = this.state,
          dataSource = _this$state2.dataSource,
          selectedRowKeys = _this$state2.selectedRowKeys;
      var _this$props13 = this.props,
          total = _this$props13.total,
          page = _this$props13.page,
          pagesize = _this$props13.pagesize,
          table = _this$props13.table,
          isLoading = _this$props13.isLoading,
          user = _this$props13.user,
          actions = _this$props13.actions,
          tableScroll = _this$props13.tableScroll,
          tableComponentProps = _this$props13.tableComponentProps,
          paginationComponentProps = _this$props13.paginationComponentProps;
      var multipleActions = actions.getMultipleActions().filter(function (action) {
        return action.isVisible(user);
      });
      var rowSelection = multipleActions.size > 0 ? {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange
      } : null;
      var columns = table.getColumns().filter(function (column) {
        return column.canShowInTable(user);
      });
      var defaultTableScroll = table.getScrollWidth() > 0 ? {
        x: table.getScrollWidth()
      } : {};
      var hasFilter = table.getHasFilter();
      return _react.default.createElement(_react.default.Fragment, null, this.renderGlobalActions(multipleActions), _react.default.createElement(_Group.default, {
        title: "\u5217\u8868"
      }, this.renderExpandFilterGroup(), this.renderFilterGroup(), hasFilter && _react.default.createElement(_row.default, {
        style: {
          marginTop: 10
        }
      }, _react.default.createElement(_popconfirm.default, {
        title: "\u786E\u8BA4\u91CD\u7F6E\u5168\u90E8\u7B5B\u9009\u9879?",
        onConfirm: this.resetFilters
      }, _react.default.createElement(_button.default, {
        type: "primary",
        style: {
          marginBottom: '1rem'
        }
      }, "\u91CD\u7F6E"))), _react.default.createElement(_table.default, (0, _extends2.default)({
        bordered: true,
        components: {
          body: {
            row: _EditableTableRow.default,
            cell: _EditableTableCell.default
          }
        },
        rowClassName: function rowClassName() {
          return 'editable-row';
        },
        scroll: tableScroll || defaultTableScroll
      }, tableComponentProps, {
        loading: isLoading,
        dataSource: dataSource,
        rowKey: table.getPrimaryKey(),
        rowSelection: rowSelection,
        pagination: false,
        onChange: function onChange(pagination, filters, sorter) {
          return _this9.onChange({
            pagination: pagination,
            filters: filters,
            sorter: sorter,
            columns: columns
          });
        },
        getPopupContainer: function getPopupContainer() {
          return document.getElementsByClassName('xms-page')[0];
        }
      }), columns.map(function (column) {
        return _this9.renderColumn({
          column: column,
          shouldRenderTableFilter: column.shouldRenderTableFilter(user)
        });
      }), this.renderRowActions()), _react.default.createElement(_pagination.default, (0, _extends2.default)({
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: RecordsPage.showTotal
      }, paginationComponentProps, {
        className: "ant-table-pagination",
        total: total,
        current: page,
        pageSize: pagesize,
        onChange: this.onChangePage,
        onShowSizeChange: this.onChangePage
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props14 = this.props,
          Component = _this$props14.component,
          inline = _this$props14.inline;
      return _react.default.createElement(_Page.default, {
        showWatermark: !inline
      }, Component ? _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, _react.default.createElement(Component, null)) : null, _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, this.renderContent()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.records !== nextProps.records) {
        return {
          records: nextProps.records,
          dataSource: nextProps.records.toJS()
        };
      }

      return null;
    }
  }]);
  return RecordsPage;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordsPage, "displayName", 'RecordsPage');
(0, _defineProperty2.default)(RecordsPage, "propTypes", {
  actions: _propTypes.default.instanceOf(_TableActions.default).isRequired,
  fetch: _propTypes.default.func.isRequired,
  edit: _propTypes.default.func.isRequired,
  remove: _propTypes.default.func.isRequired,
  create: _propTypes.default.func.isRequired,
  table: _propTypes.default.instanceOf(_Table2.default).isRequired,
  updatePage: _propTypes.default.func.isRequired,
  tableComponentProps: _propTypes.default.object.isRequired,
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  isLoading: _propTypes.default.bool,
  filterGroupTrigger: _propTypes.default.bool,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  inline: _propTypes.default.bool,
  filter: _propTypes.default.object,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  sort: _propTypes.default.string,
  total: _propTypes.default.number,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  paginationComponentProps: _propTypes.default.object
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  component: null,
  isLoading: false,
  filterGroupTrigger: false,
  filter: {},
  records: _immutable.default.List(),
  page: 1,
  pagesize: 10,
  sort: '',
  total: 0,
  inline: false,
  user: null,
  paginationComponentProps: {}
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordsPage);

exports.default = _default;