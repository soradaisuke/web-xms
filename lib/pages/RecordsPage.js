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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _generateUpYunImageUrl2 = _interopRequireDefault(require("web-core/lib/generateUpYunImageUrl"));

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

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

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

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _moment = _interopRequireDefault(require("moment"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _Page = _interopRequireDefault(require("./Page"));

require("./RecordsPage.less");

var DATETIME = _DataType.default.DATETIME,
    IMAGE = _DataType.default.IMAGE,
    NUMBER = _DataType.default.NUMBER,
    STRING = _DataType.default.STRING;
var Column = _table.default.Column;
var Search = _input.default.Search;
var confirm = _modal.default.confirm;

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
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputSearch: {}
    });
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
          mapKey = _ref.mapKey;
      var _this$props2 = _this.props,
          updatePage = _this$props2.updatePage,
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
        page: 1,
        pagesize: pagesize,
        sort: sort,
        filter: filter,
        search: (0, _defineProperty2.default)({}, mapKey, searchValue)
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(pagination, filters, sorter) {
        var _this$props3, schema, page, pagesize, search, updatePage, sort, filter, targetSchema, schemaSort, newSort, newFilter, newPage;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props3 = _this.props, schema = _this$props3.schema, page = _this$props3.page, pagesize = _this$props3.pagesize, search = _this$props3.search, updatePage = _this$props3.updatePage, sort = _this$props3.sort, filter = _this$props3.filter;
                targetSchema = (0, _find2.default)(schema, {
                  key: sorter.columnKey
                }) || {};
                schemaSort = targetSchema.sort;

                if (schemaSort && sorter && sorter.columnKey && sorter.order) {
                  if (schemaSort[sorter.order.replace('end', '')]) {
                    newSort = "".concat(targetSchema.mapKey, " ").concat(sorter.order.replace('end', ''));
                  } else if (schemaSort.asc) {
                    newSort = "".concat(targetSchema.mapKey, " asc");
                  } else if (schemaSort.desc) {
                    newSort = "".concat(targetSchema.mapKey, " desc");
                  } else {
                    newSort = '';
                  }
                } else {
                  newSort = '';
                }

                newFilter = (0, _reduce2.default)(schema, function (acc, _ref3) {
                  var key = _ref3.key,
                      type = _ref3.type,
                      mapKey = _ref3.mapKey;
                  var value = filters[key];

                  if (value && value.length > 0) {
                    switch (type) {
                      case NUMBER:
                        acc[mapKey] = parseInt(value[0], 10);
                        break;

                      default:
                        acc[mapKey] = String(value[0]);
                        break;
                    }
                  }

                  return acc;
                }, {});
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

              case 8:
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
                _context7.next = 5;
                return promise;

              case 5:
                hide();
                _context7.next = 13;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](2);
                hide();

                if (!throwError) {
                  _context7.next = 13;
                  break;
                }

                throw _context7.t0;

              case 13:
                _this.fetch();

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 8]]);
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
      }, _callee9, this);
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
    key: "hasAddButton",
    value: function hasAddButton() {
      var create = this.props.create;
      return !!create;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(_ref13) {
      var _this2 = this;

      var visibility = _ref13.visibility,
          link = _ref13.link,
          title = _ref13.title,
          key = _ref13.key,
          sort = _ref13.sort,
          mapKey = _ref13.mapKey,
          width = _ref13.width,
          type = _ref13.type,
          imageSize = _ref13.imageSize,
          renderValue = _ref13.renderValue,
          filters = _ref13.filters,
          enabledFilters = _ref13.enabledFilters,
          canFilter = _ref13.canFilter,
          inlineEdit = _ref13.inlineEdit,
          formConfig = _ref13.form;
      var _this$props7 = this.props,
          currentSort = _this$props7.sort,
          filter = _this$props7.filter;
      var filteredValue = ((0, _has2.default)(filter, mapKey) ? String(filter[mapKey]) : '') || ((0, _has2.default)(filter, mapKey) ? String(filter[mapKey]) : '');

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
            var src = (0, _generateUpYunImageUrl2.default)(value, "/both/".concat(imageSize || '100x100'));
            var style = width ? {
              width: (0, _isNumber2.default)(width) ? "".concat(width, "px") : width
            } : {};
            return _react.default.createElement("img", {
              alt: "",
              src: src,
              style: style
            });
          };
        } else if (inlineEdit && type === STRING) {
          _render = function render(value) {
            var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return _react.default.createElement(_input.default.TextArea, {
              placeholder: formConfig && formConfig.placeholder ? formConfig.placeholder : "\u8BF7\u8F93\u5165".concat(title),
              autoComplete: "off",
              defaultValue: value,
              onBlur: function onBlur() {
                var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    relatedTarget = _ref14.relatedTarget,
                    _ref14$target = _ref14.target;

                _ref14$target = _ref14$target === void 0 ? {} : _ref14$target;
                var editValue = _ref14$target.value;

                if (formConfig && formConfig.rules) {
                  var validator = new _asyncValidator.default((0, _defineProperty2.default)({}, mapKey, [{
                    required: !formConfig.optional,
                    message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A"),
                    whitespace: true
                  }].concat(formConfig.rules)));
                  validator.validate((0, _defineProperty2.default)({}, mapKey, editValue), function (errors) {
                    if (errors) {
                      _message2.default.error(errors[0].message);

                      if (relatedTarget && (0, _isFunction2.default)(relatedTarget.focus)) {
                        relatedTarget.focus();
                      }
                    } else {
                      _this2.editRecord((0, _objectSpread4.default)({}, record, (0, _defineProperty2.default)({}, mapKey, editValue)));
                    }
                  });
                } else {
                  _this2.editRecord((0, _objectSpread4.default)({}, record, (0, _defineProperty2.default)({}, mapKey, editValue)));
                }
              }
            });
          };
        }

        var filterProps = canFilter && (0, _isArray2.default)(enabledFilters) && enabledFilters.length > 0 ? {
          filtered: !!filteredValue,
          filteredValue: filteredValue ? [filteredValue] : [],
          filterMultiple: false,
          filters: enabledFilters
        } : {};
        return _react.default.createElement(Column, (0, _extends2.default)({}, filterProps, {
          className: (0, _classnames.default)(sort),
          title: title,
          dataIndex: key,
          key: key,
          sorter: !!sort,
          width: width || '',
          sortOrder: currentSort && (0, _startsWith2.default)(currentSort, "".concat(mapKey, " ")) ? "".concat((0, _split2.default)(currentSort, ' ')[1], "end") : false,
          render: function render(value, record) {
            return _render(renderValueFunc(value, record), record);
          }
        }));
      }

      return null;
    }
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var _this3 = this;

      var schema = this.props.schema;
      return schema.map(function (definition) {
        return _this3.renderColumn((0, _objectSpread4.default)({}, definition));
      });
    }
  }, {
    key: "renderCustomRowActions",
    value: function renderCustomRowActions(record) {
      var _this4 = this;

      var _this$props8 = this.props,
          customRowActions = _this$props8.customRowActions,
          matchParams = _this$props8.match.params;
      return customRowActions.map(function (_ref16) {
        var title = _ref16.title,
            type = _ref16.type,
            handler = _ref16.handler,
            enable = _ref16.enable,
            render = _ref16.render,
            confirmModal = _ref16.confirmModal;

        if ((0, _isFunction2.default)(enable) && !enable(record)) {
          return null;
        }

        if ((0, _isFunction2.default)(render)) {
          return render(record, matchParams, _this4.fetch);
        }

        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          onClick: confirmModal ? function () {
            return confirm((0, _objectSpread4.default)({}, confirmModal, {
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
    key: "renderCustomMultipleActions",
    value: function renderCustomMultipleActions() {
      var _this5 = this;

      var selectedRows = this.state.selectedRows;
      var hasSelected = selectedRows.length > 0;
      var customMultipleActions = this.props.customMultipleActions;
      return customMultipleActions.map(function (_ref17) {
        var title = _ref17.title,
            type = _ref17.type,
            handler = _ref17.handler,
            enable = _ref17.enable,
            confirmModal = _ref17.confirmModal;
        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          disabled: !hasSelected,
          onClick: confirmModal ? function () {
            return confirm((0, _objectSpread4.default)({}, confirmModal, {
              title: (0, _isFunction2.default)(confirmModal.title) ? confirmModal.title(selectedRows) : confirmModal.title || '',
              content: (0, _isFunction2.default)(confirmModal.content) ? confirmModal.content(selectedRows) : confirmModal.content || '',
              onOk: function onOk() {
                return _this5.onCustomMultipleAction(handler, enable);
              }
            }));
          } : function () {
            return _this5.onCustomMultipleAction(handler, enable);
          }
        }, title);
      });
    }
  }, {
    key: "renderCustomGlobalActions",
    value: function renderCustomGlobalActions() {
      var _this6 = this;

      var _this$props9 = this.props,
          customGlobalActions = _this$props9.customGlobalActions,
          matchParams = _this$props9.match.params;
      return customGlobalActions.map(function (_ref18) {
        var title = _ref18.title,
            type = _ref18.type,
            handler = _ref18.handler,
            render = _ref18.render;

        if ((0, _isFunction2.default)(render)) {
          return render(matchParams, _this6.fetch);
        }

        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          onClick: function onClick() {
            return _this6.onCustomGlobalAction(handler);
          }
        }, title);
      });
    }
  }, {
    key: "renderRowActions",
    value: function renderRowActions() {
      var _this7 = this;

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
            onOk: _this7.editRecord
          }, _react.default.createElement(_button.default, {
            type: "primary",
            shape: "circle",
            icon: "edit"
          })), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this7.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            type: "danger",
            shape: "circle",
            icon: "delete"
          })), order && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "up",
            onClick: function onClick() {
              return _this7.onOrderChange(record, -1);
            }
          }), _react.default.createElement(_button.default, {
            shape: "circle",
            icon: "down",
            onClick: function onClick() {
              return _this7.onOrderChange(record, 1);
            }
          })), _this7.renderCustomRowActions(record));
        }
      }) : null;
    }
  }, {
    key: "renderSearchs",
    value: function renderSearchs() {
      var _this8 = this;

      var inputSearch = this.state.inputSearch;
      var _this$props11 = this.props,
          searchFileds = _this$props11.searchFileds,
          search = _this$props11.search;
      return searchFileds.map(function (definition) {
        return _react.default.createElement(Search, {
          key: definition.mapKey,
          defaultValue: search[definition.mapKey],
          placeholder: definition.title,
          value: inputSearch[definition.mapKey],
          onSearch: function onSearch(value) {
            return _this8.onSearch(definition, value);
          },
          onChange: function onChange(e) {
            return _this8.setState({
              inputSearch: (0, _defineProperty2.default)({}, definition.mapKey, e.target.value)
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
          customGlobalActions = _this$props12.customGlobalActions,
          isLoading = _this$props12.isLoading;
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
      var _this$props13 = this.props,
          Component = _this$props13.component,
          error = _this$props13.error;
      return _react.default.createElement(_Page.default, {
        isError: !!error,
        errorMessage: error ? error.message : ''
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
  error: _propTypes.default.instanceOf(Error),
  isLoading: _propTypes.default.bool,
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
  searchFileds: [],
  sort: '',
  total: 0
});