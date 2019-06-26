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

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

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
      var newFilter = (0, _objectSpread2.default)({}, filter);
      columns.forEach(function (column) {
        if (column.canFilterInTable()) {
          delete newFilter[column.getTableFilterKey()];

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

        if (sort !== newSort || !(0, _isEqual2.default)(filter, newFilter)) {
          newPage = 1;
        }
      }

      updatePage({
        page: newPage,
        pagesize: pagesize,
        sort: newSort,
        filter: newFilter
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOrderChange", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(body, diff) {
        var order;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                order = _this.props.order;
                _context.next = 3;
                return _this.updateRecord({
                  promise: order(body, diff)
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomGlobalAction", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(handler) {
        var matchParams;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context2.next = 4;
                  break;
                }

                matchParams = _this.props.match.params;
                _context2.next = 4;
                return _this.updateRecord({
                  promise: handler(matchParams)
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref3) {
        var promise, _ref3$loadingMessage, loadingMessage, _ref3$throwError, throwError, hide;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                promise = _ref3.promise, _ref3$loadingMessage = _ref3.loadingMessage, loadingMessage = _ref3$loadingMessage === void 0 ? '正在保存……' : _ref3$loadingMessage, _ref3$throwError = _ref3.throwError, throwError = _ref3$throwError === void 0 ? false : _ref3$throwError;

                if (loadingMessage) {
                  hide = _message2.default.loading(loadingMessage, 0);
                }

                _context3.prev = 2;
                _context3.next = 5;
                return promise;

              case 5:
                if (hide) {
                  hide();
                }

                _context3.next = 14;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);

                if (hide) {
                  hide();
                }

                _message2.default.error(_context3.t0.message);

                if (!throwError) {
                  _context3.next = 14;
                  break;
                }

                throw _context3.t0;

              case 14:
                _this.fetch();

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 8]]);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "editRecord", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(body) {
        var _this$props3, edit, inlineEdit, create, primaryKey, newEdit;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props3 = _this.props, edit = _this$props3.edit, inlineEdit = _this$props3.inlineEdit, create = _this$props3.create, primaryKey = _this$props3.primaryKey;
                newEdit = edit || inlineEdit;
                _context4.next = 4;
                return _this.updateRecord({
                  promise: body[primaryKey] && newEdit ? newEdit(body) : create(body),
                  throwError: true
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
      var _this$props4, fetch, page, pagesize, sort, filter;

      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this$props4 = _this.props, fetch = _this$props4.fetch, page = _this$props4.page, pagesize = _this$props4.pagesize, sort = _this$props4.sort, filter = _this$props4.filter;
              fetch({
                page: page,
                pagesize: pagesize,
                sort: sort,
                filter: filter
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickQuery", function () {
      var _this$props5 = _this.props,
          filter = _this$props5.filter,
          updatePage = _this$props5.updatePage;
      var _this$state = _this.state,
          filterGroup = _this$state.filterGroup,
          filterInGroupTableKeys = _this$state.filterInGroupTableKeys;
      (0, _forEach2.default)(filter, function (_, key) {
        if (filterInGroupTableKeys[key]) {
          delete filter[key];
        }
      });
      (0, _forEach2.default)(filterGroup, function (v, key) {
        var hasValidValue = function hasValidValue(arr) {
          return (0, _findIndex2.default)(arr, function (item) {
            return item === 0 || item;
          }) !== -1;
        };

        if ((0, _isArray2.default)(v) && !hasValidValue(v) || v !== 0 && !v) {
          delete filterGroup[key];
        }
      });
      updatePage({
        filter: (0, _objectSpread2.default)({}, filter, filterGroup)
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickReset", function () {
      _this.setState({
        filterGroup: {}
      });
    });
    _this.state = {
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: []
    };
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
    key: "hasAddButton",
    value: function hasAddButton() {
      var _this$props7 = this.props,
          create = _this$props7.create,
          hasCreateNew = _this$props7.hasCreateNew;
      return !!create || hasCreateNew;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(column) {
      var _this2 = this;

      var _this$props8 = this.props,
          sort = _this$props8.sort,
          filter = _this$props8.filter,
          actions = _this$props8.actions;
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

        var filters = column.getFilters(parentFilteredValue);
        filters = filters ? filters.toJS() : null;
        var valueOptionsRequest = column.getValueOptionsRequest();

        if (filters) {
          filterProps.filters = filters;
          filterProps.filtered = !!filteredValue.length;
          filterProps.filteredValue = filteredValue;
          filterProps.filterMultiple = column.canFilterMultipleInTable();
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
        }
      }

      return _react.default.createElement(Column, (0, _extends2.default)({}, filterProps, {
        title: column.getTableTitle(filterProps),
        dataIndex: column.getKey(),
        key: column.getKey(),
        width: column.getTableWidth(),
        sorter: column.canSortInTable(),
        sortDirections: column.getTableSortDirections().toArray(),
        sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false,
        render: function render(value, record) {
          var children = column.renderInTable({
            value: value,
            record: record
          });
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

      var _this$props9 = this.props,
          table = _this$props9.table,
          user = _this$props9.user;
      var columns = table.getColumns().filter(function (column) {
        return !column.canShowInTable(user) && column.canFilterInTable();
      });

      if (columns.size === 0) {
        return null;
      }

      return _react.default.createElement(_Group.default, {
        title: "\u7B5B\u9009"
      }, _react.default.createElement(_table.default, {
        bordered: true,
        className: "filters-table",
        rowKey: table.getPrimaryKey(),
        pagination: false,
        onChange: function onChange(pagination, filters, sorter) {
          return _this3.onChange(pagination, filters, sorter, columns, true);
        }
      }, columns.map(function (column) {
        return _this3.renderColumn(column);
      })));
    }
  }, {
    key: "renderAction",
    value: function renderAction(action) {
      var _this4 = this;

      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          record = _ref7.record,
          records = _ref7.records,
          column = _ref7.column;

      var _this$props10 = this.props,
          user = _this$props10.user,
          remove = _this$props10.remove,
          edit = _this$props10.edit,
          create = _this$props10.create,
          table = _this$props10.table,
          matchParams = _this$props10.match.params;
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
            var _submit = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(params) {
              return _regenerator.default.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
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
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));

            function submit(_x6) {
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

      var _this$props11 = this.props,
          actions = _this$props11.actions,
          user = _this$props11.user;
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
    value: function renderGlobalActions() {
      var _this6 = this;

      var _this$props12 = this.props,
          actions = _this$props12.actions,
          user = _this$props12.user;
      var globalActions = actions.getGlobalActions().filter(function (action) {
        return action.isVisible(user);
      });

      if (globalActions.size === 0) {
        return null;
      }

      return _react.default.createElement(_Group.default, {
        title: "\u64CD\u4F5C"
      }, _react.default.createElement("div", {
        className: "actions"
      }, globalActions.map(function (action) {
        return _this6.renderAction(action);
      })));
    }
  }, {
    key: "renderMultipleActions",
    value: function renderMultipleActions(multipleActions) {
      var _this7 = this;

      if (multipleActions.size === 0) {
        return null;
      }

      var records = this.state.selectedRows;
      return _react.default.createElement("div", {
        className: "actions"
      }, multipleActions.map(function (action) {
        return _this7.renderAction(action, {
          records: records
        });
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this8 = this;

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
          actions = _this$props13.actions;
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
      return _react.default.createElement(_react.default.Fragment, null, this.renderFilterGroup(), this.renderGlobalActions(), _react.default.createElement(_Group.default, {
        title: "\u8BE6\u60C5"
      }, this.renderMultipleActions(multipleActions), _react.default.createElement(_table.default, {
        bordered: true,
        loading: isLoading,
        dataSource: dataSource,
        rowKey: table.getPrimaryKey(),
        rowSelection: rowSelection,
        pagination: false,
        onChange: function onChange(pagination, filters, sorter) {
          return _this8.onChange(pagination, filters, sorter, columns);
        }
      }, columns.map(function (column) {
        return _this8.renderColumn(column);
      }), this.renderRowActions()), _react.default.createElement(_pagination.default, {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: RecordsPage.showTotal,
        className: "ant-table-pagination",
        total: total,
        current: page,
        pagesize: pagesize,
        onChange: this.onChangePage,
        onShowSizeChange: this.onChangePage
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props14 = this.props,
          Component = _this$props14.component,
          error = _this$props14.error,
          inline = _this$props14.inline;
      return _react.default.createElement(_Page.default, {
        isError: !!error,
        errorMessage: error ? error.message : ''
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
  table: _propTypes.default.instanceOf(_Table2.default).isRequired,
  updatePage: _propTypes.default.func.isRequired,
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  create: _propTypes.default.func,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  error: _propTypes.default.instanceOf(Error),
  isLoading: _propTypes.default.bool,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  inline: _propTypes.default.bool,
  filter: _propTypes.default.object,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  sort: _propTypes.default.string,
  total: _propTypes.default.number,
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  component: null,
  error: null,
  isLoading: false,
  edit: null,
  filter: {},
  remove: null,
  records: _immutable.default.List(),
  page: 1,
  pagesize: 10,
  sort: '',
  total: 0,
  inline: false,
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordsPage);

exports.default = _default;