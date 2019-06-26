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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _filter3 = _interopRequireDefault(require("lodash/filter"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _chunk2 = _interopRequireDefault(require("lodash/chunk"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

var _router = require("dva/router");

var _Table2 = _interopRequireDefault(require("../schema/Table"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _Group = _interopRequireDefault(require("../components/Group"));

var _Page = _interopRequireDefault(require("./Page"));

require("./RecordsPage.less");

var Column = _table.default.Column;
var Search = _input.default.Search;
var confirm = _modal.default.confirm;

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
          filter = _this$props.filter,
          search = _this$props.search;
      updatePage({
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: filter,
        search: search
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSearch", function (_ref, value) {
      var type = _ref.type,
          mapKey = _ref.mapKey;
      var _this$props2 = _this.props,
          updatePage = _this$props2.updatePage,
          pagesize = _this$props2.pagesize,
          sort = _this$props2.sort,
          filter = _this$props2.filter;
      var searchValue = type.formatSubmitValue(value);
      var search = searchValue || searchValue === 0 ? (0, _defineProperty2.default)({}, mapKey, searchValue) : {};
      updatePage({
        page: 1,
        pagesize: pagesize,
        sort: sort,
        filter: filter,
        search: search
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function () {
      var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(pagination, filters, sorter) {
        var _this$props3, table, page, pagesize, search, updatePage, sort, filter, user, newSort, newFilter, newPage;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props3 = _this.props, table = _this$props3.table, page = _this$props3.page, pagesize = _this$props3.pagesize, search = _this$props3.search, updatePage = _this$props3.updatePage, sort = _this$props3.sort, filter = _this$props3.filter, user = _this$props3.user;

                if (sorter && sorter.columnKey && sorter.order) {
                  newSort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
                } else {
                  newSort = '';
                }

                newFilter = {};
                table.getColumns().forEach(function (column, index) {
                  if (column.canShowInTable(user) && column.canFilterInTable()) {
                    if (column.isParentOnLeft()) {
                      var parentColumn = table.getColumns().get(index - 1);
                      var parentFilteredValue = filters[parentColumn.getKey()];
                      parentFilteredValue = parentColumn.canFilterMultipleInTable() ? parentFilteredValue : parentFilteredValue[0];

                      if (!(0, _isEqual2.default)(parentFilteredValue, (0, _get2.default)(filter, parentColumn.getTableFilterKey()))) {
                        return true;
                      }
                    }

                    var value = filters[column.getKey()];

                    if (value && value.length > 0) {
                      if (column.canFilterMultipleInTable()) {
                        if ((0, _filter3.default)(value, function (v) {
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
                newPage = page;

                if (sort !== newSort || !(0, _isEqual2.default)(filter, newFilter)) {
                  newPage = 1;
                }

                updatePage({
                  page: newPage,
                  pagesize: pagesize,
                  sort: newSort,
                  search: search,
                  filter: newFilter
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOrderChange", function () {
      var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(body, diff) {
        var order;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                order = _this.props.order;
                _context2.next = 3;
                return _this.updateRecord({
                  promise: order(body, diff)
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onConfirmRemove", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(record) {
        var remove;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                remove = _this.props.remove;
                _context3.next = 3;
                return _this.updateRecord({
                  promise: remove(record),
                  loadingMessage: '正在删除……'
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomRowAction", function () {
      var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(record, handler) {
        var matchParams;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context4.next = 4;
                  break;
                }

                matchParams = _this.props.match.params;
                _context4.next = 4;
                return _this.updateRecord({
                  promise: handler(record, matchParams)
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomMultipleAction", function () {
      var _ref7 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(handler, enable) {
        var _this$props4, user, matchParams, selectedRows;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context5.next = 6;
                  break;
                }

                _this$props4 = _this.props, user = _this$props4.user, matchParams = _this$props4.match.params;
                selectedRows = _this.state.selectedRows;
                _context5.next = 5;
                return _this.updateRecord({
                  promise: Promise.all((0, _map2.default)(selectedRows, function (record) {
                    return !(0, _isFunction2.default)(enable) || enable(record, user) ? handler(record, matchParams) : null;
                  }))
                });

              case 5:
                _this.setState({
                  selectedRowKeys: [],
                  selectedRows: []
                });

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomGlobalAction", function () {
      var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(handler) {
        var matchParams;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context6.next = 4;
                  break;
                }

                matchParams = _this.props.match.params;
                _context6.next = 4;
                return _this.updateRecord({
                  promise: handler(matchParams)
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref10 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref9) {
        var promise, _ref9$loadingMessage, loadingMessage, _ref9$throwError, throwError, hide;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                promise = _ref9.promise, _ref9$loadingMessage = _ref9.loadingMessage, loadingMessage = _ref9$loadingMessage === void 0 ? '正在保存……' : _ref9$loadingMessage, _ref9$throwError = _ref9.throwError, throwError = _ref9$throwError === void 0 ? false : _ref9$throwError;
                hide = _message2.default.loading(loadingMessage, 0);
                _context7.prev = 2;
                _context7.next = 5;
                return promise;

              case 5:
                hide();
                _context7.next = 14;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](2);
                hide();

                _message2.default.error(_context7.t0.message);

                if (!throwError) {
                  _context7.next = 14;
                  break;
                }

                throw _context7.t0;

              case 14:
                _this.fetch();

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 8]]);
      }));

      return function (_x12) {
        return _ref10.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "editRecord", function () {
      var _ref11 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(body) {
        var _this$props5, edit, inlineEdit, create, primaryKey, newEdit;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$props5 = _this.props, edit = _this$props5.edit, inlineEdit = _this$props5.inlineEdit, create = _this$props5.create, primaryKey = _this$props5.primaryKey;
                newEdit = edit || inlineEdit;
                _context8.next = 4;
                return _this.updateRecord({
                  promise: body[primaryKey] && newEdit ? newEdit(body) : create(body),
                  throwError: true
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x13) {
        return _ref11.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9() {
      var _this$props6, fetch, page, pagesize, sort, search, filter;

      return _regenerator.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _this$props6 = _this.props, fetch = _this$props6.fetch, page = _this$props6.page, pagesize = _this$props6.pagesize, sort = _this$props6.sort, search = _this$props6.search, filter = _this$props6.filter;
              fetch({
                page: page,
                pagesize: pagesize,
                sort: sort,
                search: search,
                filter: filter
              });

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickQuery", function () {
      var _this$props7 = _this.props,
          filter = _this$props7.filter,
          updatePage = _this$props7.updatePage;
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
        filter: (0, _objectSpread3.default)({}, filter, filterGroup)
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickReset", function () {
      _this.setState({
        filterGroup: {}
      });
    });
    var defaultFilter = props.defaultFilter,
        _filter2 = props.filter,
        filterInGroupTables = props.filterInGroupTables;
    var _filterGroup = {};
    var _filterInGroupTableKeys = {};
    (0, _forEach2.default)(filterInGroupTables, function (_ref13) {
      var mapKey = _ref13.mapKey;
      _filterInGroupTableKeys[mapKey] = true;
      var defaultValue = _filter2[mapKey] === 0 || _filter2[mapKey] ? _filter2[mapKey] : defaultFilter[mapKey];

      if (_filter2 && (defaultValue === 0 || defaultValue)) {
        _filterGroup[mapKey] = defaultValue;
      }
    });
    _this.state = {
      filterGroup: _filterGroup,
      filterInGroupTableKeys: _filterInGroupTableKeys,
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputSearch: {}
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
      var _this$props8 = this.props,
          pagesize = _this$props8.pagesize,
          page = _this$props8.page,
          sort = _this$props8.sort,
          search = _this$props8.search,
          filter = _this$props8.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || prevProps.search !== search || !(0, _isEqual2.default)(prevProps.filter, filter)) {
        this.fetch();
      }
    }
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var _this$props9 = this.props,
          create = _this$props9.create,
          hasCreateNew = _this$props9.hasCreateNew;
      return !!create || hasCreateNew;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(column, index) {
      var _this2 = this;

      var _this$props10 = this.props,
          user = _this$props10.user,
          sort = _this$props10.sort,
          table = _this$props10.table,
          filter = _this$props10.filter;

      if (column.canShowInTable(user)) {
        var filterProps = {};

        if (column.canFilterInTable()) {
          var parentColumn = column.isParentOnLeft() ? table.getColumns().get(index - 1) : null;
          var parentFilteredValue = parentColumn ? (0, _get2.default)(filter, parentColumn.getTableFilterKey()) : null;
          var filteredValue = (0, _get2.default)(filter, column.getTableFilterKey());

          if (!(0, _isUndefined2.default)(filteredValue)) {
            if (column.canFilterRangeInTable() || !(0, _isArray2.default)(filteredValue)) {
              filteredValue = [filteredValue];
            }
          } else {
            filteredValue = [];
          }

          var filters = column.getTableFilters(parentFilteredValue);
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
          title: column.getTitle(),
          dataIndex: column.getKey(),
          key: column.getKey(),
          width: column.getTableWidth(),
          sorter: table.getOrderColumn() ? column === table.getOrderColumn() : column.canSortInTable(),
          sortDirections: column.getTableSortDirections().toArray(),
          sortOrder: sort && (0, _startsWith2.default)(sort, "".concat(column.getKey(), " ")) ? "".concat((0, _split2.default)(sort, ' ')[1], "end") : false,
          render: function render(value, record) {
            return column.renderInTable({
              value: value,
              record: record
            });
          }
        }));
      }

      return null;
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this3 = this;

      var table = this.props.table;
      return table.getColumns().map(function (column, index) {
        return _this3.renderColumn(column, index);
      });
    }
  }, {
    key: "renderCustomRowActions",
    value: function renderCustomRowActions(record) {
      var _this4 = this;

      var _this$props11 = this.props,
          customRowActions = _this$props11.customRowActions,
          user = _this$props11.user,
          matchParams = _this$props11.match.params;
      return customRowActions.map(function (_ref14) {
        var title = _ref14.title,
            type = _ref14.type,
            handler = _ref14.handler,
            enable = _ref14.enable,
            render = _ref14.render,
            confirmModal = _ref14.confirmModal,
            global = _ref14.global;

        if ((0, _isFunction2.default)(enable) && !enable(record, user) || global) {
          return null;
        }

        if ((0, _isFunction2.default)(render)) {
          return render(record, matchParams, _this4.fetch);
        }

        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          onClick: confirmModal ? function () {
            return confirm((0, _objectSpread3.default)({}, confirmModal, {
              title: (0, _isFunction2.default)(confirmModal.title) ? confirmModal.title(record) : confirmModal.title || '',
              content: (0, _isFunction2.default)(confirmModal.content) ? confirmModal.content(record) : confirmModal.content || '',
              onOk: function onOk() {
                return _this4.onCustomRowAction(record, handler);
              }
            }));
          } : function () {
            return _this4.onCustomRowAction(record, handler);
          }
        }, title);
      });
    }
  }, {
    key: "renderRowActions",
    value: function renderRowActions() {
      var _this5 = this;

      var _this$props12 = this.props,
          edit = _this$props12.edit,
          remove = _this$props12.remove,
          order = _this$props12.order,
          customRowActions = _this$props12.customRowActions,
          table = _this$props12.table,
          updateModalFilters = _this$props12.updateModalFilters;
      return edit || remove || customRowActions.length > 0 || order ? _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("div", {
            className: "actions"
          }, edit && _react.default.createElement(_RecordModal.default, {
            table: table,
            record: record,
            onOk: _this5.editRecord,
            updateModalFilters: updateModalFilters
          }, _react.default.createElement(_button.default, {
            type: "primary",
            shape: "circle",
            icon: "edit"
          })), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this5.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            type: "danger",
            shape: "circle",
            icon: "delete"
          })), order && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "up",
            onClick: function onClick() {
              return _this5.onOrderChange(record, -1);
            }
          }), _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "down",
            onClick: function onClick() {
              return _this5.onOrderChange(record, 1);
            }
          })), _this5.renderCustomRowActions(record));
        }
      }) : null;
    }
  }, {
    key: "renderSearchGroup",
    value: function renderSearchGroup() {
      var _this6 = this;

      var inputSearch = this.state.inputSearch;
      var _this$props13 = this.props,
          searchFields = _this$props13.searchFields,
          search = _this$props13.search;

      if (!searchFields || searchFields.length === 0) {
        return null;
      }

      return _react.default.createElement(_Group.default, {
        title: "\u641C\u7D22"
      }, (0, _chunk2.default)(searchFields, 6).map(function (definitions) {
        return _react.default.createElement(_row.default, {
          gutter: 20,
          key: (0, _join2.default)((0, _map2.default)(definitions, function (_ref15) {
            var mapKey = _ref15.mapKey;
            return mapKey;
          }))
        }, definitions.map(function (definition) {
          return _react.default.createElement(_col.default, {
            span: 4,
            key: definition.mapKey
          }, _react.default.createElement(Search, {
            defaultValue: search[definition.mapKey],
            placeholder: definition.title,
            value: inputSearch[definition.mapKey],
            onSearch: function onSearch(value) {
              return _this6.onSearch(definition, value);
            },
            onChange: function onChange(e) {
              return _this6.setState({
                inputSearch: (0, _defineProperty2.default)({}, definition.mapKey, e.target.value)
              });
            },
            style: {
              width: '100%'
            },
            enterButton: true
          }));
        }));
      }));
    }
  }, {
    key: "renderFilterGroup",
    value: function renderFilterGroup() {
      var _this7 = this;

      var filterInGroupTables = this.props.filterInGroupTables;
      var filterGroup = this.state.filterGroup;

      if (!filterInGroupTables || filterInGroupTables.length === 0) {
        return null;
      }

      return _react.default.createElement(_Group.default, {
        title: "\u7B5B\u9009"
      }, filterInGroupTables.map(function (_ref16) {
        var mapKey = _ref16.mapKey,
            type = _ref16.type,
            title = _ref16.title,
            definition = (0, _objectWithoutProperties2.default)(_ref16, ["mapKey", "type", "title"]);
        return _react.default.createElement(_row.default, {
          type: "flex",
          align: "middle",
          className: "filter-row",
          key: mapKey
        }, _react.default.createElement("div", {
          className: "filter-title"
        }, "".concat(title, "\uFF1A")), _react.default.createElement(_col.default, {
          span: 12
        }, type.renderFilterItem((0, _objectSpread3.default)({}, definition, {
          value: filterGroup[mapKey],
          onChange: function onChange(v) {
            _this7.setState({
              filterGroup: (0, _objectSpread3.default)({}, filterGroup, (0, _defineProperty2.default)({}, mapKey, v))
            });
          }
        }))));
      }), _react.default.createElement(_row.default, {
        key: "filter-group-action-buttons"
      }, _react.default.createElement(_popconfirm.default, {
        title: "\u786E\u8BA4\u91CD\u7F6E\uFF1F",
        onConfirm: this.onClickReset
      }, _react.default.createElement(_button.default, {
        type: "danger"
      }, "\u91CD\u7F6E")), _react.default.createElement(_button.default, {
        type: "primary",
        style: {
          marginLeft: '.6rem'
        },
        onClick: this.onClickQuery
      }, "\u67E5\u8BE2")));
    }
  }, {
    key: "renderActionGroup",
    value: function renderActionGroup() {
      var _this8 = this;

      var actions = [];
      var selectedRows = this.state.selectedRows;
      var hasSelected = selectedRows.length > 0;
      var _this$props14 = this.props,
          create = _this$props14.create,
          hasCreateNew = _this$props14.hasCreateNew,
          table = _this$props14.table,
          customGlobalActions = _this$props14.customGlobalActions,
          customMultipleActions = _this$props14.customMultipleActions,
          customMultipleEdits = _this$props14.customMultipleEdits,
          updateModalFilters = _this$props14.updateModalFilters,
          matchParams = _this$props14.match.params;

      if (hasCreateNew) {
        actions.push({
          createNew: true,
          title: 'createNew'
        });
      } else if (create) {
        actions.push({
          create: true,
          title: 'create'
        });
      }

      actions = actions.concat(customGlobalActions).concat(customMultipleActions);

      if (actions.length === 0 && customMultipleEdits.length === 0) {
        return null;
      }

      return _react.default.createElement(_Group.default, {
        title: "\u64CD\u4F5C"
      }, (0, _chunk2.default)(actions, 6).map(function (groupActions) {
        return _react.default.createElement(_row.default, {
          gutter: 20,
          key: (0, _join2.default)((0, _map2.default)(groupActions, function (_ref17) {
            var title = _ref17.title;
            return title;
          }))
        }, groupActions.map(function (_ref18, index) {
          var createNew = _ref18.createNew,
              crt = _ref18.create,
              global = _ref18.global,
              render = _ref18.render,
              title = _ref18.title,
              type = _ref18.type,
              handler = _ref18.handler,
              multiple = _ref18.multiple,
              confirmModal = _ref18.confirmModal,
              enable = _ref18.enable;
          var children;

          if (createNew) {
            children = _react.default.createElement(_button.default, {
              className: "add-button",
              type: "primary"
            }, _react.default.createElement(_router.Link, {
              to: "".concat(window.location.pathname, "/new")
            }, "\u65B0\u5EFA"));
          } else if (crt) {
            children = _react.default.createElement(_RecordModal.default, {
              table: table,
              record: {},
              onOk: _this8.editRecord,
              updateModalFilters: updateModalFilters
            }, _react.default.createElement(_button.default, {
              className: "add-button",
              type: "primary"
            }, "\u6DFB\u52A0"));
          } else if (global && !multiple) {
            if ((0, _isFunction2.default)(render)) {
              children = render(matchParams, _this8.fetch);
            } else {
              children = _react.default.createElement(_button.default, {
                type: type,
                onClick: function onClick() {
                  return _this8.onCustomGlobalAction(handler);
                }
              }, title);
            }
          } else if (multiple) {
            if ((0, _isFunction2.default)(render)) {
              children = render(matchParams, _this8.fetch, selectedRows);
            } else {
              children = _react.default.createElement(_button.default, {
                type: type,
                disabled: !hasSelected,
                onClick: confirmModal ? function () {
                  return confirm((0, _objectSpread3.default)({}, confirmModal, {
                    title: (0, _isFunction2.default)(confirmModal.title) ? confirmModal.title(selectedRows) : confirmModal.title || '',
                    content: (0, _isFunction2.default)(confirmModal.content) ? confirmModal.content(selectedRows) : confirmModal.content || '',
                    onOk: function onOk() {
                      return _this8.onCustomMultipleAction(handler, enable);
                    }
                  }));
                } : function () {
                  return _this8.onCustomMultipleAction(handler, enable);
                }
              }, title);
            }
          }

          return _react.default.createElement(_col.default, {
            span: 4,
            key: title || index
          }, children);
        }), customMultipleEdits.map(function (_ref19, index) {
          var title = _ref19.title,
              mapKey = _ref19.mapKey;
          return _react.default.createElement(_col.default, {
            span: 4,
            key: title || index
          }, _react.default.createElement(_RecordModal.default, {
            table: table,
            record: {},
            multipleKey: mapKey,
            updateModalFilters: updateModalFilters,
            onOk: function onOk(data) {
              return _this8.onCustomMultipleAction(function (record) {
                return _this8.editRecord((0, _objectSpread3.default)({}, record, data));
              });
            }
          }, _react.default.createElement(_button.default, {
            type: "primary",
            disabled: !hasSelected
          }, title)));
        }));
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$state2 = this.state,
          dataSource = _this$state2.dataSource,
          selectedRowKeys = _this$state2.selectedRowKeys;
      var _this$props15 = this.props,
          total = _this$props15.total,
          page = _this$props15.page,
          pagesize = _this$props15.pagesize,
          table = _this$props15.table,
          customMultipleActions = _this$props15.customMultipleActions,
          customMultipleEdits = _this$props15.customMultipleEdits,
          isLoading = _this$props15.isLoading;
      var rowSelection = customMultipleActions.length > 0 || customMultipleEdits.length > 0 ? {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange
      } : null;
      return _react.default.createElement(_react.default.Fragment, null, this.renderSearchGroup(), this.renderFilterGroup(), this.renderActionGroup(), _react.default.createElement(_Group.default, {
        title: "\u8BE6\u60C5"
      }, _react.default.createElement(_table.default, {
        bordered: true,
        loading: isLoading,
        dataSource: dataSource,
        rowKey: table.getPrimaryKey(),
        rowSelection: rowSelection,
        pagination: false,
        onChange: this.onChange
      }, this.renderTable(), this.renderRowActions()), _react.default.createElement(_pagination.default, {
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
      var _this$props16 = this.props,
          Component = _this$props16.component,
          error = _this$props16.error,
          inline = _this$props16.inline;
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
  fetch: _propTypes.default.func.isRequired,
  table: _propTypes.default.instanceOf(_Table2.default).isRequired,
  updatePage: _propTypes.default.func.isRequired,
  updateModalFilters: _propTypes.default.func.isRequired,
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  create: _propTypes.default.func,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  customGlobalActions: _propTypes.default.array,
  customMultipleActions: _propTypes.default.array,
  customRowActions: _propTypes.default.array,
  filterInGroupTables: _propTypes.default.array,
  customMultipleEdits: _propTypes.default.array,
  error: _propTypes.default.instanceOf(Error),
  isLoading: _propTypes.default.bool,
  order: _propTypes.default.func,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  inline: _propTypes.default.bool,
  inlineEdit: _propTypes.default.func,
  filter: _propTypes.default.object,
  primaryKey: _propTypes.default.string,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  defaultFilter: _propTypes.default.object,
  search: _propTypes.default.object,
  searchFields: _propTypes.default.array,
  sort: _propTypes.default.string,
  total: _propTypes.default.number,
  hasCreateNew: _propTypes.default.bool,
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  component: null,
  customGlobalActions: [],
  customMultipleActions: [],
  customRowActions: [],
  filterInGroupTables: [],
  customMultipleEdits: [],
  error: null,
  isLoading: false,
  edit: null,
  filter: {},
  primaryKey: 'id',
  remove: null,
  records: _immutable.default.List(),
  order: null,
  page: 1,
  pagesize: 10,
  search: {},
  searchFields: [],
  sort: '',
  total: 0,
  inline: false,
  inlineEdit: null,
  hasCreateNew: false,
  defaultFilter: {},
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordsPage);

exports.default = _default;