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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/popover/style");

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (pagination, filters, sorter, columns) {
      var onlyFilters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var _this$props2 = _this.props,
          page = _this$props2.page,
          pagesize = _this$props2.pagesize,
          updatePage = _this$props2.updatePage,
          sort = _this$props2.sort,
          filter = _this$props2.filter;
      var newFilter = (0, _cloneDeep2.default)(filter);
      columns.forEach(function (column) {
        if (column.canFilterInTable()) {
          (0, _unset2.default)(newFilter, column.getTableFilterKey());

          if (column.parentColumn) {
            var parentFilteredValue = filters[column.parentColumn.getKey()];
            parentFilteredValue = column.parentColumn.canFilterMultipleInTable() ? parentFilteredValue : parentFilteredValue[0];

            if (!(0, _isEqual2.default)(parentFilteredValue, (0, _get2.default)(filter, column.parentColumn.getTableFilterKey()))) {
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

          if ((0, _isUndefined2.default)((0, _get2.default)(newFilter, column.getTableFilterKey())) && column.getTableFilterRequired() && column.getTableFilterDefault()) {
            (0, _set2.default)(newFilter, column.getTableFilterKey(), column.getTableFilterDefault());
          }
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref) {
        var promise, loadingMessage, _ref$throwError, throwError, _ref$reload, reload, onComplete, hide, result;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = _ref.promise, loadingMessage = _ref.loadingMessage, _ref$throwError = _ref.throwError, throwError = _ref$throwError === void 0 ? false : _ref$throwError, _ref$reload = _ref.reload, reload = _ref$reload === void 0 ? false : _ref$reload, onComplete = _ref.onComplete;

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
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _this$props3, fetch, page, pagesize, sort, filter;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props3 = _this.props, fetch = _this$props3.fetch, page = _this$props3.page, pagesize = _this$props3.pagesize, sort = _this$props3.sort, filter = _this$props3.filter;
              fetch({
                page: page,
                pagesize: pagesize,
                sort: sort,
                filter: filter
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    _this.state = {
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
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
      var _this$props4 = this.props,
          pagesize = _this$props4.pagesize,
          page = _this$props4.page,
          sort = _this$props4.sort,
          filter = _this$props4.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || !(0, _isEqual2.default)(prevProps.filter, filter)) {
        this.fetch();
      }
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(column) {
      var _this2 = this;

      var _this$props5 = this.props,
          sort = _this$props5.sort,
          filter = _this$props5.filter,
          actions = _this$props5.actions,
          user = _this$props5.user;
      var filterProps = {};

      if (column.canFilterInTable()) {
        var parentFilteredValue = column.parentColumn ? (0, _get2.default)(filter, column.parentColumn.getTableFilterKey()) : null;
        var filteredValue = (0, _get2.default)(filter, column.getTableFilterKey());

        if (!(0, _isUndefined2.default)(filteredValue)) {
          if (column.canFilterRangeInTable() || !(0, _isArray2.default)(filteredValue)) {
            filteredValue = [filteredValue];
          }
        } else {
          filteredValue = [];
        }

        var filters = column.getFilters(parentFilteredValue, 'disableInFilter');
        var valueOptionsRequest = column.getValueOptionsRequest();

        if (filters) {
          filterProps.filters = filters;
          filterProps.filtered = !!filteredValue.length;
          filterProps.filteredValue = filteredValue;
          filterProps.filterMultiple = column.canFilterMultipleInTable();

          if (column.canFilterTreeInTable()) {
            filterProps.filterDropdown = column.getRenderFilterTree({
              filters: filters,
              parentValue: parentFilteredValue
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
          if ((0, _isArray2.default)(parentFilteredValue) && parentFilteredValue.length > 0 || !(0, _isUndefined2.default)(parentFilteredValue)) {
            filterProps.filterDropdown = function () {
              return _react.default.createElement(_spin.default, {
                style: {
                  width: '100%'
                }
              });
            };

            column.fetchValueOptions(parentFilteredValue).then(function () {
              return _this2.forceUpdate();
            }).catch(function () {});
          }
        } else if (column.canRenderFilterDropDown()) {
          filterProps.filtered = !!filteredValue.length;
          filterProps.filteredValue = filteredValue;
          filterProps.filterDropdown = column.renderFilterDropDown;

          filterProps.filterIcon = function (filtered) {
            return _react.default.createElement(_icon.default, {
              type: column.getFilterIcon(),
              style: {
                color: filtered ? '#1890ff' : undefined
              }
            });
          };
        }

        filterProps.parentFilteredValue = parentFilteredValue;
      }

      return _react.default.createElement(Column, (0, _extends2.default)({}, filterProps, {
        title: column.getTableTitle(filterProps),
        dataIndex: column.getKey(),
        key: column.getKey(),
        width: column.getTableWidth(),
        fixed: column.getTableFixed(),
        sorter: column.canSortInTable(),
        sortDirections: column.getTableSortDirections().toArray(),
        sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false,
        render: function render(value, record) {
          var children = column.renderInTable((0, _objectSpread2.default)({
            value: value,
            record: record,
            user: user
          }, filterProps));
          var editAction = actions.getEditAction();

          if (column.canShowEditInTable() && editAction) {
            var action = _this2.renderAction(editAction, {
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
    key: "renderFilterGroup",
    value: function renderFilterGroup() {
      var _this3 = this;

      var _this$props6 = this.props,
          table = _this$props6.table,
          user = _this$props6.user;
      var columns = table.getColumns().filter(function (column) {
        return !column.canShowInTable(user) && column.canFilterInTable();
      });

      if (columns.size === 0) {
        return null;
      }

      return _react.default.createElement(_table.default, {
        bordered: true,
        className: "filters-table",
        rowKey: table.getPrimaryKey(),
        pagination: false,
        onChange: function onChange(pagination, filters, sorter) {
          return _this3.onChange(pagination, filters, sorter, columns, true);
        }
      }, columns.map(function (column) {
        return _this3.renderColumn(column);
      }));
    }
  }, {
    key: "renderAction",
    value: function renderAction(action) {
      var _this4 = this;

      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          record = _ref4.record,
          records = _ref4.records,
          column = _ref4.column;

      var _this$props7 = this.props,
          user = _this$props7.user,
          remove = _this$props7.remove,
          edit = _this$props7.edit,
          create = _this$props7.create,
          table = _this$props7.table,
          matchParams = _this$props7.match.params;
      var props = {
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
        props = (0, _objectSpread2.default)({}, props, {
          record: record
        });
      } else if (records) {
        props = (0, _objectSpread2.default)({}, props, {
          records: records,
          submit: function () {
            var _submit = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
              return _regenerator.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _this4.updateRecord((0, _objectSpread2.default)({}, params, {
                        throwError: true
                      }));

                    case 2:
                      _this4.setState({
                        selectedRowKeys: [],
                        selectedRows: []
                      });

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
      var _this5 = this;

      var _this$props8 = this.props,
          actions = _this$props8.actions,
          user = _this$props8.user;
      var rowActions = actions.getRowActions().filter(function (action) {
        return action.isVisible(user);
      });
      return rowActions.size > 0 ? _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("div", {
            className: "actions"
          }, rowActions.map(function (action) {
            return _this5.renderAction(action, {
              record: record
            });
          }));
        }
      }) : null;
    }
  }, {
    key: "renderGlobalActions",
    value: function renderGlobalActions(multipleActions) {
      var _this6 = this;

      var _this$props9 = this.props,
          actions = _this$props9.actions,
          user = _this$props9.user;
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
        return _this6.renderAction(action);
      }), multipleActions && multipleActions.map(function (action) {
        return _this6.renderAction(action, {
          records: records
        });
      })));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this7 = this;

      var _this$state = this.state,
          dataSource = _this$state.dataSource,
          selectedRowKeys = _this$state.selectedRowKeys;
      var _this$props10 = this.props,
          total = _this$props10.total,
          page = _this$props10.page,
          pagesize = _this$props10.pagesize,
          table = _this$props10.table,
          isLoading = _this$props10.isLoading,
          user = _this$props10.user,
          actions = _this$props10.actions,
          tableScroll = _this$props10.tableScroll,
          paginationComponentProps = _this$props10.paginationComponentProps;
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
      return _react.default.createElement(_react.default.Fragment, null, this.renderGlobalActions(multipleActions), _react.default.createElement(_Group.default, {
        title: "\u5217\u8868"
      }, this.renderFilterGroup(), _react.default.createElement(_table.default, {
        bordered: true,
        loading: isLoading,
        dataSource: dataSource,
        rowKey: table.getPrimaryKey(),
        rowSelection: rowSelection,
        pagination: false,
        scroll: tableScroll || defaultTableScroll,
        onChange: function onChange(pagination, filters, sorter) {
          return _this7.onChange(pagination, filters, sorter, columns);
        }
      }, columns.map(function (column) {
        return _this7.renderColumn(column);
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
      var _this$props11 = this.props,
          Component = _this$props11.component,
          error = _this$props11.error,
          inline = _this$props11.inline;
      return _react.default.createElement(_Page.default, {
        isError: !!error,
        errorMessage: error ? error.message : '',
        showWatermark: !inline
      }, Component ? _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, _react.default.createElement(Component, null)) : null, _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : ''),
        style: {
          minHeight: '600px'
        }
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
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  error: _propTypes.default.instanceOf(Error),
  isLoading: _propTypes.default.bool,
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
  error: null,
  isLoading: false,
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