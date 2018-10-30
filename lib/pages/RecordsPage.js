"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/pagination/style");

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _makeCancelablePromise2 = _interopRequireDefault(require("web-core/lib/makeCancelablePromise"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _Img = _interopRequireDefault(require("../components/Img"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _Page = _interopRequireDefault(require("./Page"));

require("./RecordsPage.less");

var DATETIME = _DataType.default.DATETIME,
    IMAGE = _DataType.default.IMAGE,
    NUMBER = _DataType.default.NUMBER;
var Column = _table.default.Column;
var Search = _input.default.Search;

var RecordsPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordsPage, _React$PureComponent);

  function RecordsPage() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RecordsPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RecordsPage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      errorMessage: '',
      isError: false,
      isLoading: true,
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputSearch: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "activePromise", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSelectChange", function (selectedRowKeys, selectedRows) {
      _this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangePage", function (page, pagesize) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSearch", function (_ref, value) {
      var type = _ref.type,
          key = _ref.key;
      var _this$props2 = _this.props,
          updatePage = _this$props2.updatePage,
          page = _this$props2.page,
          pagesize = _this$props2.pagesize,
          sort = _this$props2.sort,
          filter = _this$props2.filter;
      var searchValue;

      switch (type) {
        case NUMBER:
          searchValue = parseInt(value, 10);
          break;

        default:
          searchValue = String(value);
          break;
      }

      updatePage({
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: filter,
        search: (0, _defineProperty2.default)({}, key, searchValue)
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(pagination, filters, sorter) {
        var schema, sort, _this$props3, page, pagesize, search, updatePage, filter;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = _this.props.schema;
                sort = _this.props.sort;
                _this$props3 = _this.props, page = _this$props3.page, pagesize = _this$props3.pagesize, search = _this$props3.search, updatePage = _this$props3.updatePage;

                if (sorter && sorter.columnKey && sorter.order) {
                  sort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
                }

                filter = (0, _reduce2.default)(schema, function (acc, _ref3) {
                  var key = _ref3.key,
                      type = _ref3.type,
                      filterKey = _ref3.filterKey;
                  var value = filters[key];

                  if (value && value.length > 0) {
                    switch (type) {
                      case NUMBER:
                        acc[filterKey || key] = parseInt(value[0], 10);
                        break;

                      default:
                        acc[filterKey || key] = String(value[0]);
                        break;
                    }
                  }

                  return acc;
                }, {});
                updatePage({
                  page: page,
                  pagesize: pagesize,
                  sort: sort,
                  search: search,
                  filter: filter
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOrderChange", function () {
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
        }, _callee2, this);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onConfirmRemove", function () {
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
        }, _callee3, this);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onCustomRowAction", function () {
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
        }, _callee4, this);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onCustomMultipleAction", function () {
      var _ref7 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(handler, enable) {
        var matchParams, selectedRows;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context5.next = 6;
                  break;
                }

                matchParams = _this.props.match.params;
                selectedRows = _this.state.selectedRows;
                _context5.next = 5;
                return _this.updateRecord({
                  promise: Promise.all((0, _map2.default)(selectedRows, function (record) {
                    return !(0, _isFunction2.default)(enable) || enable(record) ? handler(record, matchParams) : null;
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
        }, _callee5, this);
      }));

      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onCustomGlobalAction", function () {
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
        }, _callee6, this);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateRecord", function () {
      var _ref10 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref9) {
        var promise, _ref9$loadingMessage, loadingMessage, _ref9$throwError, throwError, hide;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                promise = _ref9.promise, _ref9$loadingMessage = _ref9.loadingMessage, loadingMessage = _ref9$loadingMessage === void 0 ? '正在保存……' : _ref9$loadingMessage, _ref9$throwError = _ref9.throwError, throwError = _ref9$throwError === void 0 ? false : _ref9$throwError;
                hide = _message2.default.loading(loadingMessage, 0);
                _context7.prev = 2;
                _this.activePromise = (0, _makeCancelablePromise2.default)(promise);
                _context7.next = 6;
                return _this.activePromise;

              case 6:
                hide();
                _context7.next = 9;
                return _this.fetch();

              case 9:
                _context7.next = 17;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](2);
                hide();

                if (!throwError) {
                  _context7.next = 17;
                  break;
                }

                _this.activePromise = null;
                throw _context7.t0;

              case 17:
                _this.activePromise = null;

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 11]]);
      }));

      return function (_x12) {
        return _ref10.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "editRecord", function () {
      var _ref11 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(body) {
        var _this$props4, edit, create, primaryKey;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$props4 = _this.props, edit = _this$props4.edit, create = _this$props4.create, primaryKey = _this$props4.primaryKey;
                _context8.next = 3;
                return _this.updateRecord({
                  promise: body[primaryKey] && edit ? edit(body) : create(body),
                  throwError: true
                });

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x13) {
        return _ref11.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9() {
      var _this$props5, fetch, page, pagesize, sort, search, filter;

      return _regenerator.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _this$props5 = _this.props, fetch = _this$props5.fetch, page = _this$props5.page, pagesize = _this$props5.pagesize, sort = _this$props5.sort, search = _this$props5.search, filter = _this$props5.filter;

              _this.setState({
                isLoading: true
              });

              _context9.prev = 2;
              _this.activePromise = (0, _makeCancelablePromise2.default)(fetch({
                page: page,
                pagesize: pagesize,
                sort: sort,
                search: search,
                filter: filter
              }));
              _context9.next = 6;
              return _this.activePromise;

            case 6:
              _this.setState({
                isError: false,
                isLoading: false
              });

              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](2);

              _this.setState({
                errorMessage: _context9.t0.message,
                isError: true,
                isLoading: false
              });

            case 12:
              _this.activePromise = null;

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this, [[2, 9]]);
    })));
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
          search = _this$props6.search,
          filter = _this$props6.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || prevProps.search !== search || prevProps.filter !== filter) {
        this.fetch();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.activePromise) {
        this.activePromise.cancel();
        this.activePromise = null;
      }
    }
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var create = this.props.create;
      return !!create;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(_ref13) {
      var visibility = _ref13.visibility,
          link = _ref13.link,
          title = _ref13.title,
          key = _ref13.key,
          sort = _ref13.sort,
          filterKey = _ref13.filterKey,
          type = _ref13.type,
          imageSize = _ref13.imageSize,
          renderValue = _ref13.renderValue,
          filters = _ref13.filters,
          canFilter = _ref13.canFilter;
      var _this$props7 = this.props,
          currentSort = _this$props7.sort,
          filter = _this$props7.filter;
      var filteredValue = ((0, _has2.default)(filter, key) ? String(filter[key]) : '') || ((0, _has2.default)(filter, filterKey) ? String(filter[filterKey]) : '');

      var renderValueFunc = function renderValueFunc(v) {
        return v;
      };

      if ((0, _isFunction2.default)(renderValue)) {
        renderValueFunc = renderValue;
      } else if ((0, _isArray2.default)(filters)) {
        renderValueFunc = function renderValueFunc(v) {
          var filtered = (0, _find2.default)(filters, function (f) {
            return f.value === v;
          });
          return filtered ? filtered.text : v;
        };
      }

      if (visibility.table) {
        var _render = function render(v) {
          return v;
        };

        if (link) {
          _render = function render(value, record) {
            return _react.default.createElement("span", null, _react.default.createElement(_RecordLink.default, {
              link: link,
              record: record
            }, value));
          };
        } else if (type === DATETIME) {
          _render = function render(value) {
            var datetime = (0, _moment.default)(value);
            return _react.default.createElement("span", null, datetime.isValid() ? datetime.format('YYYY-MM-DD HH:mm:ss') : '');
          };
        } else if (type === IMAGE) {
          _render = function render(value) {
            return _react.default.createElement(_Img.default, {
              useImg: true,
              src: value,
              format: "/both/".concat(imageSize || '100x100')
            });
          };
        }

        var filterProps = canFilter && (0, _isArray2.default)(filters) && filters.length > 0 ? {
          filtered: !!filteredValue,
          filteredValue: filteredValue ? [filteredValue] : [],
          filterMultiple: false,
          filters: filters
        } : {};
        return _react.default.createElement(Column, (0, _extends2.default)({}, filterProps, {
          className: (0, _classnames.default)(sort),
          title: title,
          dataIndex: key,
          key: key,
          sorter: !!sort,
          sortOrder: currentSort && (0, _startsWith2.default)(currentSort, "".concat(key, " ")) ? "".concat((0, _split2.default)(currentSort, ' ')[1], "end") : false,
          render: function render(value, record) {
            return _render(renderValueFunc(value), record);
          }
        }));
      }

      return null;
    }
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var _this2 = this;

      var schema = this.props.schema;
      return schema.map(function (definition) {
        return _this2.renderColumn((0, _objectSpread2.default)({}, definition));
      });
    }
  }, {
    key: "renderCustomRowActions",
    value: function renderCustomRowActions(record) {
      var _this3 = this;

      var _this$props8 = this.props,
          customRowActions = _this$props8.customRowActions,
          matchParams = _this$props8.match.params;
      return customRowActions.map(function (_ref14) {
        var title = _ref14.title,
            type = _ref14.type,
            handler = _ref14.handler,
            enable = _ref14.enable,
            render = _ref14.render;

        if ((0, _isFunction2.default)(enable) && !enable(record)) {
          return null;
        }

        if ((0, _isFunction2.default)(render)) {
          return render(record, matchParams, _this3.fetch);
        }

        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          onClick: function onClick() {
            return _this3.onCustomRowAction(record, handler);
          }
        }, title);
      });
    }
  }, {
    key: "renderCustomMultipleActions",
    value: function renderCustomMultipleActions() {
      var _this4 = this;

      var selectedRowKeys = this.state.selectedRowKeys;
      var hasSelected = selectedRowKeys.length > 0;
      var customMultipleActions = this.props.customMultipleActions;
      return customMultipleActions.map(function (_ref15) {
        var title = _ref15.title,
            type = _ref15.type,
            handler = _ref15.handler,
            enable = _ref15.enable;
        return _react.default.createElement(_button.default, {
          key: "title",
          type: type,
          disabled: !hasSelected,
          onClick: function onClick() {
            return _this4.onCustomMultipleAction(handler, enable);
          }
        }, title);
      });
    }
  }, {
    key: "renderCustomGlobalActions",
    value: function renderCustomGlobalActions() {
      var _this5 = this;

      var _this$props9 = this.props,
          customGlobalActions = _this$props9.customGlobalActions,
          matchParams = _this$props9.match.params;
      return customGlobalActions.map(function (_ref16) {
        var title = _ref16.title,
            type = _ref16.type,
            handler = _ref16.handler,
            render = _ref16.render;

        if ((0, _isFunction2.default)(render)) {
          return render(matchParams, _this5.fetch);
        }

        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          onClick: function onClick() {
            return _this5.onCustomGlobalAction(handler);
          }
        }, title);
      });
    }
  }, {
    key: "renderRowActions",
    value: function renderRowActions() {
      var _this6 = this;

      var _this$props10 = this.props,
          edit = _this$props10.edit,
          remove = _this$props10.remove,
          order = _this$props10.order,
          customRowActions = _this$props10.customRowActions,
          schema = _this$props10.schema;
      return edit || remove || customRowActions.length > 0 ? _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("span", {
            className: "actions"
          }, edit && _react.default.createElement(_RecordModal.default, {
            schema: schema,
            record: record,
            onOk: _this6.editRecord
          }, _react.default.createElement(_button.default, {
            type: "primary",
            shape: "circle",
            icon: "edit"
          })), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this6.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            type: "danger",
            shape: "circle",
            icon: "delete"
          })), order && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "up",
            onClick: function onClick() {
              return _this6.onOrderChange(record, -1);
            }
          }), _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "down",
            onClick: function onClick() {
              return _this6.onOrderChange(record, 1);
            }
          })), _this6.renderCustomRowActions(record));
        }
      }) : null;
    }
  }, {
    key: "renderSearchs",
    value: function renderSearchs() {
      var _this7 = this;

      var inputSearch = this.state.inputSearch;
      var _this$props11 = this.props,
          searchFileds = _this$props11.searchFileds,
          search = _this$props11.search;
      return searchFileds.map(function (definition) {
        return _react.default.createElement(Search, {
          key: definition.key,
          defaultValue: search[definition.key],
          placeholder: definition.title,
          value: inputSearch[definition.key],
          onSearch: function onSearch(value) {
            return _this7.onSearch(definition, value);
          },
          onChange: function onChange(e) {
            return _this7.setState({
              inputSearch: (0, _defineProperty2.default)({}, definition.key, e.target.value)
            });
          },
          style: {
            width: 150
          },
          enterButton: true
        });
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          dataSource = _this$state.dataSource,
          selectedRowKeys = _this$state.selectedRowKeys;
      var _this$props12 = this.props,
          total = _this$props12.total,
          page = _this$props12.page,
          pagesize = _this$props12.pagesize,
          primaryKey = _this$props12.primaryKey,
          schema = _this$props12.schema,
          searchFileds = _this$props12.searchFileds,
          customMultipleActions = _this$props12.customMultipleActions,
          customGlobalActions = _this$props12.customGlobalActions;
      var rowSelection = customMultipleActions.length > 0 ? {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange
      } : null;
      var hasHeader = this.hasAddButton() || searchFileds.length > 0 || customMultipleActions.length > 0 || customGlobalActions.length > 0;
      return _react.default.createElement(_react.default.Fragment, null, hasHeader && _react.default.createElement("div", {
        className: "xms-records-page-content-header"
      }, _react.default.createElement("div", {
        className: "xms-records-page-content-header-buttons"
      }, this.hasAddButton() && _react.default.createElement(_RecordModal.default, {
        schema: schema,
        record: {},
        onOk: this.editRecord
      }, _react.default.createElement(_button.default, {
        className: "add-button",
        type: "primary"
      }, "\u6DFB\u52A0")), this.renderCustomGlobalActions(), this.renderCustomMultipleActions()), _react.default.createElement("div", {
        className: "xms-records-page-content-header-searchs"
      }, this.renderSearchs())), _react.default.createElement(_table.default, {
        loading: isLoading,
        dataSource: dataSource,
        rowKey: primaryKey,
        rowSelection: rowSelection,
        pagination: false,
        onChange: this.onChange
      }, this.renderSchema(), this.renderRowActions()), _react.default.createElement(_pagination.default, {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: RecordsPage.showTotal,
        className: "ant-table-pagination",
        total: total,
        current: page,
        pagesize: pagesize,
        onChange: this.onChangePage,
        onShowSizeChange: this.onChangePage
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          isError = _this$state2.isError,
          errorMessage = _this$state2.errorMessage;
      var Component = this.props.component;
      return _react.default.createElement(_Page.default, {
        isError: isError,
        errorMessage: errorMessage
      }, Component ? _react.default.createElement(Component, null) : null, this.renderContent());
    }
  }], [{
    key: "showTotal",
    value: function showTotal(total, range) {
      return "".concat(range[0], "-").concat(range[1], "\uFF0C\u5171").concat(total, "\u4E2A");
    }
  }, {
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

exports.default = RecordsPage;
(0, _defineProperty2.default)(RecordsPage, "displayName", 'RecordsPage');
(0, _defineProperty2.default)(RecordsPage, "propTypes", {
  fetch: _propTypes.default.func.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.string,
    link: _propTypes.default.shape({
      url: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
      type: _propTypes.default.oneOf(['relative', 'absolute', 'external'])
    }),
    visibility: _propTypes.default.shape({
      create: _propTypes.default.bool,
      edit: _propTypes.default.bool,
      table: _propTypes.default.bool
    })
  })).isRequired,
  updatePage: _propTypes.default.func.isRequired,
  create: _propTypes.default.func,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  customGlobalActions: _propTypes.default.array,
  customMultipleActions: _propTypes.default.array,
  customRowActions: _propTypes.default.array,
  order: _propTypes.default.func,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  filter: _propTypes.default.object,
  primaryKey: _propTypes.default.string,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  search: _propTypes.default.object,
  searchFileds: _propTypes.default.array,
  sort: _propTypes.default.string,
  total: _propTypes.default.number
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  component: null,
  customGlobalActions: [],
  customMultipleActions: [],
  customRowActions: [],
  edit: null,
  filter: {},
  primaryKey: 'id',
  remove: null,
  records: _immutable.default.List(),
  order: null,
  page: 1,
  pagesize: 10,
  search: '',
  searchFileds: [],
  sort: null,
  total: 0
});