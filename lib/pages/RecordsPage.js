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

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reactRouter = require("react-router");

var _moment = _interopRequireDefault(require("moment"));

var _Img = _interopRequireDefault(require("../components/Img"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _Page = _interopRequireDefault(require("./Page"));

require("./RecordsPage.less");

var DATETIME = _DataType.default.DATETIME,
    IMAGE = _DataType.default.IMAGE;
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
      isError: false,
      isLoading: true,
      records: _immutable.default.List(),
      dataSource: []
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSearch", function (search) {
      var _this$props2 = _this.props,
          updatePage = _this$props2.updatePage,
          page = _this$props2.page,
          pagesize = _this$props2.pagesize,
          sort = _this$props2.sort,
          filter = _this$props2.filter;
      updatePage({
        page: page,
        pagesize: pagesize,
        sort: sort,
        filter: filter,
        search: search
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(pagination, filters, sorter) {
        var sort, _this$props3, page, pagesize, search, updatePage;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sort = _this.props.sort;
                _this$props3 = _this.props, page = _this$props3.page, pagesize = _this$props3.pagesize, search = _this$props3.search, updatePage = _this$props3.updatePage;

                if (sorter && sorter.columnKey && sorter.order && _this.checkSort({
                  key: sorter.columnKey,
                  order: sorter.order.replace('end', '')
                })) {
                  sort = "".concat(sorter.columnKey, " ").concat(sorter.order.replace('end', ''));
                }

                updatePage({
                  page: page,
                  pagesize: pagesize,
                  sort: sort,
                  search: search,
                  filter: (0, _mapValues2.default)(filters, function (value) {
                    var number = parseInt(value[0], 10);
                    return (0, _isNaN2.default)(number) ? value : number;
                  })
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOrderChange", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(body, diff) {
        var order, hide;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                order = _this.props.order;
                hide = _message2.default.loading('正在保存……', 0);
                _context2.prev = 2;
                _context2.next = 5;
                return order(body, diff);

              case 5:
                hide();
                _context2.next = 8;
                return _this.fetch();

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                hide();

                _message2.default.error(_context2.t0.message);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 10]]);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onConfirmRemove", function () {
      var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(record) {
        var remove, hide;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                remove = _this.props.remove;
                hide = _message2.default.loading('正在删除……', 0);
                _context3.prev = 2;
                _context3.next = 5;
                return remove(record.id);

              case 5:
                hide();
                _context3.next = 8;
                return _this.fetch();

              case 8:
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                hide();

                _message2.default.error(_context3.t0.message);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      return function (_x6) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onCustomAction", function () {
      var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(record, handler) {
        var hide;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(0, _isFunction2.default)(handler)) {
                  _context4.next = 14;
                  break;
                }

                hide = _message2.default.loading('正在保存……', 0);
                _context4.prev = 2;
                _context4.next = 5;
                return handler(record);

              case 5:
                hide();
                _context4.next = 8;
                return _this.fetch();

              case 8:
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                hide();

                _message2.default.error(_context4.t0.message);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 10]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "editRecord", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(body) {
        var _this$props4, edit, create, params, hide;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this$props4 = _this.props, edit = _this$props4.edit, create = _this$props4.create, params = _this$props4.match.params;
                hide = _message2.default.loading('正在保存……', 0);
                _context5.prev = 2;

                if (!body.id) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 6;
                return edit(body);

              case 6:
                _context5.next = 10;
                break;

              case 8:
                _context5.next = 10;
                return create(body, params);

              case 10:
                hide();
                _context5.next = 13;
                return _this.fetch();

              case 13:
                _context5.next = 19;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](2);
                hide();

                _message2.default.error(_context5.t0.message);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 15]]);
      }));

      return function (_x9) {
        return _ref5.apply(this, arguments);
      };
    }());
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
      var _this$props5 = this.props,
          pagesize = _this$props5.pagesize,
          page = _this$props5.page,
          sort = _this$props5.sort,
          search = _this$props5.search,
          filter = _this$props5.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || prevProps.search !== search || prevProps.filter !== filter) {
        this.fetch();
      }
    }
  }, {
    key: "checkSort",
    value: function checkSort(_ref6) {
      var key = _ref6.key,
          order = _ref6.order;
      var schema = this.props.schema;
      var canSort = false;
      var title;
      (0, _forEach2.default)(schema, function (definition) {
        if (definition.key === key) {
          var sort = definition.sort,
              t = definition.title;
          canSort = sort && sort[order];
          title = t;
          return false;
        }

        return true;
      });

      if (!canSort) {
        _message2.default.error("".concat(title, "\u4E0D\u652F\u6301").concat(order === 'asc' ? '升序' : '降序', "\u6392\u5E8F"));
      }

      return canSort;
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6() {
        var _this$props6, fetch, page, pagesize, sort, search, filter, params;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$props6 = this.props, fetch = _this$props6.fetch, page = _this$props6.page, pagesize = _this$props6.pagesize, sort = _this$props6.sort, search = _this$props6.search, filter = _this$props6.filter, params = _this$props6.match.params;
                this.setState({
                  isLoading: true
                });
                _context6.prev = 2;
                _context6.next = 5;
                return fetch({
                  page: page,
                  pagesize: pagesize,
                  sort: sort,
                  search: search,
                  filter: filter,
                  params: params
                });

              case 5:
                this.setState({
                  isError: false,
                  isLoading: false
                });
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](2);
                this.setState({
                  isError: true,
                  isLoading: false
                });

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 8]]);
      }));

      return function fetch() {
        return _fetch.apply(this, arguments);
      };
    }()
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var _this$props7 = this.props,
          Modal = _this$props7.Modal,
          create = _this$props7.create;
      return Modal && create;
    }
  }, {
    key: "hasHeader",
    value: function hasHeader() {
      var canSearch = this.props.canSearch;
      return this.hasAddButton() || canSearch;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(_ref7) {
      var visibility = _ref7.visibility,
          link = _ref7.link,
          title = _ref7.title,
          key = _ref7.key,
          sort = _ref7.sort,
          type = _ref7.type,
          imageSize = _ref7.imageSize,
          renderValue = _ref7.renderValue,
          filters = _ref7.filters;
      var _this$props8 = this.props,
          currentSort = _this$props8.sort,
          filter = _this$props8.filter;
      var filteredValue = (0, _has2.default)(filter, key) ? String(filter[key]) : '';

      var renderValueFunc = function renderValueFunc(v) {
        return v;
      };

      if ((0, _isFunction2.default)(renderValue)) {
        renderValueFunc = renderValue;
      } else if (filters) {
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
            return _react.default.createElement("span", null, (0, _moment.default)(value).format('YYYY-MM-DD HH:mm:ss'));
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

        var filterProps = filters && filters.length > 0 ? {
          filtered: !!filteredValue,
          filteredValue: filteredValue ? [filteredValue] : [],
          filterMultiple: false,
          filters: filters
        } : {};
        return _react.default.createElement(Column, (0, _extends2.default)({}, filterProps, {
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
    key: "renderActions",
    value: function renderActions() {
      var _this3 = this;

      var _this$props9 = this.props,
          Modal = _this$props9.Modal,
          edit = _this$props9.edit,
          remove = _this$props9.remove,
          order = _this$props9.order,
          customActions = _this$props9.customActions;
      return edit || remove || customActions.length > 0 ? _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("span", null, Modal && edit && _react.default.createElement(Modal, {
            record: record,
            onOk: _this3.editRecord
          }, _react.default.createElement(_button.default, {
            className: "action-button",
            type: "primary",
            shape: "circle",
            icon: "edit"
          })), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this3.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            className: "action-button",
            type: "danger",
            shape: "circle",
            icon: "delete"
          })), order && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
            className: "action-button",
            shape: "circle",
            icon: "up",
            onClick: function onClick() {
              return _this3.onOrderChange(record, -1);
            }
          }), _react.default.createElement(_button.default, {
            className: "action-button",
            shape: "circle",
            icon: "down",
            onClick: function onClick() {
              return _this3.onOrderChange(record, 1);
            }
          })), customActions.map(function (_ref8) {
            var title = _ref8.title,
                handler = _ref8.handler;
            return _react.default.createElement(_button.default, {
              key: title,
              type: "primary",
              className: "action-button",
              onClick: function onClick() {
                return _this3.onCustomAction(record, handler);
              }
            }, title);
          }));
        }
      }) : null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          dataSource = _this$state.dataSource;
      var _this$props10 = this.props,
          Modal = _this$props10.Modal,
          total = _this$props10.total,
          page = _this$props10.page,
          pagesize = _this$props10.pagesize,
          schema = _this$props10.schema,
          search = _this$props10.search,
          searchPlaceHolder = _this$props10.searchPlaceHolder,
          canSearch = _this$props10.canSearch;
      return _react.default.createElement(_react.default.Fragment, null, this.hasHeader() && _react.default.createElement("div", {
        className: "xms-records-page-content-header"
      }, this.hasAddButton() && _react.default.createElement(Modal, {
        schema: schema,
        record: {},
        onOk: this.editRecord
      }, _react.default.createElement(_button.default, {
        className: "add-button",
        type: "primary"
      }, "\u6DFB\u52A0")), canSearch && _react.default.createElement(Search, {
        defaultValue: search,
        placeholder: searchPlaceHolder,
        onSearch: this.onSearch,
        style: {
          width: 200
        },
        enterButton: true
      })), _react.default.createElement(_table.default, {
        loading: isLoading,
        dataSource: dataSource,
        rowKey: function rowKey(record) {
          return record.id;
        },
        pagination: false,
        onChange: this.onChange
      }, this.renderSchema(), this.renderActions()), _react.default.createElement(_pagination.default, {
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
      var isError = this.state.isError;
      return _react.default.createElement(_Page.default, {
        isError: isError
      }, this.renderContent());
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

(0, _defineProperty2.default)(RecordsPage, "displayName", 'RecordsPage');
(0, _defineProperty2.default)(RecordsPage, "propTypes", {
  canSearch: _propTypes.default.bool.isRequired,
  fetch: _propTypes.default.func.isRequired,
  match: _propTypes.default.object.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    link: _propTypes.default.oneOfType([_propTypes.default.shape({
      path: _propTypes.default.string,
      key: _propTypes.default.string
    }), _propTypes.default.bool]),
    visibility: _propTypes.default.shape({
      table: _propTypes.default.bool
    })
  })).isRequired,
  updatePage: _propTypes.default.func.isRequired,
  create: _propTypes.default.func,
  customActions: _propTypes.default.array,
  Modal: _propTypes.default.func,
  order: _propTypes.default.func,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  filter: _propTypes.default.object,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  search: _propTypes.default.string,
  searchPlaceHolder: _propTypes.default.string,
  sort: _propTypes.default.string,
  total: _propTypes.default.number
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  customActions: [],
  edit: null,
  filter: {},
  remove: null,
  records: _immutable.default.List(),
  Modal: null,
  order: null,
  page: 1,
  pagesize: 10,
  search: '',
  searchPlaceHolder: '',
  sort: null,
  total: 0
});

var _default = (0, _reactRouter.withRouter)(RecordsPage);

exports.default = _default;