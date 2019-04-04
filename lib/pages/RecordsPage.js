"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/pagination/style");

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _generateUpYunImageUrl2 = _interopRequireDefault(require("web-core/lib/generateUpYunImageUrl"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

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

var _reactRouterDom = require("react-router-dom");

var _moment = _interopRequireDefault(require("moment"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _Page = _interopRequireDefault(require("./Page"));

var _DatePickerWithPresets = _interopRequireDefault(require("../components/DatePickerWithPresets"));

var _ColumnTypes = _interopRequireDefault(require("../utils/ColumnTypes"));

require("./RecordsPage.less");

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      records: _immutable.default.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputSearch: {}
    });
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

                newFilter = (0, _reduce2.default)(schema, function (acc, _ref4) {
                  var key = _ref4.key,
                      type = _ref4.type,
                      mapKey = _ref4.mapKey,
                      filterMultiple = _ref4.filterMultiple;
                  var value = (0, _get2.default)(filters, key);
                  var preValue = (0, _get2.default)(filter, key);

                  if ((type === _ColumnTypes.default.date || type === _ColumnTypes.default.datetime) && preValue) {
                    acc[mapKey] = preValue;
                  } else if (value && value.length > 0) {
                    if (filterMultiple) {
                      acc[mapKey] = value.map(function (v) {
                        return type.formatSubmitValue(v);
                      });
                    } else {
                      acc[mapKey] = type.formatSubmitValue(value[0]);
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
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOrderChange", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(body, diff) {
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
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onConfirmRemove", function () {
      var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(record) {
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
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomRowAction", function () {
      var _ref7 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(record, handler) {
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
        return _ref7.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomMultipleAction", function () {
      var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(handler, enable) {
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
        }, _callee5);
      }));

      return function (_x9, _x10) {
        return _ref8.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCustomGlobalAction", function () {
      var _ref9 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(handler) {
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
        return _ref9.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref11 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_ref10) {
        var promise, _ref10$loadingMessage, loadingMessage, _ref10$throwError, throwError, hide;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                promise = _ref10.promise, _ref10$loadingMessage = _ref10.loadingMessage, loadingMessage = _ref10$loadingMessage === void 0 ? '正在保存……' : _ref10$loadingMessage, _ref10$throwError = _ref10.throwError, throwError = _ref10$throwError === void 0 ? false : _ref10$throwError;
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
        }, _callee7, null, [[2, 8]]);
      }));

      return function (_x12) {
        return _ref11.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "editRecord", function () {
      var _ref12 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(body) {
        var _this$props4, edit, inlineEdit, create, primaryKey, newEdit;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$props4 = _this.props, edit = _this$props4.edit, inlineEdit = _this$props4.inlineEdit, create = _this$props4.create, primaryKey = _this$props4.primaryKey;
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
        return _ref12.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9() {
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
      }, _callee9);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeDateFilter", function (mapKey, date) {
      var _this$props6 = _this.props,
          filter = _this$props6.filter,
          updatePage = _this$props6.updatePage,
          dateFilterSchemas = _this$props6.dateFilterSchemas;
      var target = dateFilterSchemas.find(function (_ref14) {
        var mk = _ref14.mapKey;
        return mk === mapKey;
      });

      if (!(0, _isArray2.default)(date) && !date || (0, _isArray2.default)(date) && (!date[0] || !date[1])) {
        delete filter[mapKey];
        updatePage({
          filter: filter
        });
      } else if ((0, _isArray2.default)(date)) {
        updatePage({
          filter: (0, _objectSpread6.default)({}, filter, (0, _defineProperty2.default)({}, mapKey, [target.type.formatSubmitValue(date[0]), target.type.formatSubmitValue(date[1])]))
        });
      } else {
        updatePage({
          filter: (0, _objectSpread6.default)({}, filter, (0, _defineProperty2.default)({}, mapKey, target.type.formatSubmitValue(date)))
        });
      }
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
      var _this$props7 = this.props,
          pagesize = _this$props7.pagesize,
          page = _this$props7.page,
          sort = _this$props7.sort,
          search = _this$props7.search,
          filter = _this$props7.filter;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page || prevProps.sort !== sort || prevProps.search !== search || prevProps.filter !== filter) {
        this.fetch();
      }
    }
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var _this$props8 = this.props,
          create = _this$props8.create,
          hasCreateNew = _this$props8.hasCreateNew;
      return !!create || hasCreateNew;
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(_ref15) {
      var _this2 = this;

      var visibility = _ref15.visibility,
          link = _ref15.link,
          title = _ref15.title,
          key = _ref15.key,
          sort = _ref15.sort,
          mapKey = _ref15.mapKey,
          width = _ref15.width,
          type = _ref15.type,
          imageSize = _ref15.imageSize,
          renderValue = _ref15.renderValue,
          filters = _ref15.filters,
          enabledFilters = _ref15.enabledFilters,
          canFilter = _ref15.canFilter,
          inlineEdit = _ref15.inlineEdit,
          formConfig = _ref15.form,
          _ref15$filterMultiple = _ref15.filterMultiple,
          filterMultiple = _ref15$filterMultiple === void 0 ? false : _ref15$filterMultiple;
      var _this$props9 = this.props,
          currentSort = _this$props9.sort,
          filter = _this$props9.filter;
      var filteredValue = type.canUseColumnFilter() && !(0, _isUndefined2.default)(filter[mapKey]) ? filter[mapKey] : [];
      var renderValueFunc = type.renderValue;

      if ((0, _isFunction2.default)(renderValue)) {
        renderValueFunc = renderValue;
      } else if ((0, _isArray2.default)(filters) && type.canUseColumnFilter()) {
        renderValueFunc = function renderValueFunc(v) {
          if ((0, _isArray2.default)(v)) {
            return v.map(function (item) {
              var filtered = (0, _find2.default)(filters, function (f) {
                return f.value === item;
              });
              return filtered ? filtered.text : item;
            }).join('，');
          }

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
        } else if (type === _ColumnTypes.default.image) {
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
        } else if (inlineEdit && type.canInlineEdit()) {
          _render = function render(value) {
            var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return _react.default.createElement(_input.default.TextArea, {
              key: value,
              placeholder: formConfig && formConfig.placeholder ? formConfig.placeholder : "\u8BF7\u8F93\u5165".concat(title),
              autoComplete: "off",
              defaultValue: value,
              onBlur: function onBlur() {
                var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    relatedTarget = _ref16.relatedTarget,
                    _ref16$target = _ref16.target;

                _ref16$target = _ref16$target === void 0 ? {} : _ref16$target;
                var editValue = _ref16$target.value;

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
                      _this2.editRecord((0, _objectSpread6.default)({}, record, (0, _defineProperty2.default)({}, mapKey, editValue)));
                    }
                  });
                } else {
                  _this2.editRecord((0, _objectSpread6.default)({}, record, (0, _defineProperty2.default)({}, mapKey, editValue)));
                }
              }
            });
          };
        }

        var filterProps = canFilter && (0, _isArray2.default)(enabledFilters) && enabledFilters.length > 0 ? {
          filterMultiple: filterMultiple,
          filtered: (0, _isArray2.default)(filteredValue) ? !!filteredValue.length : !(0, _isUndefined2.default)(filteredValue),
          filteredValue: (0, _isArray2.default)(filteredValue) ? filteredValue : [String(filteredValue)],
          filters: !type.canUseColumnFilter() ? [] : enabledFilters
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
    key: "renderAddButton",
    value: function renderAddButton() {
      var _this$props10 = this.props,
          hasCreateNew = _this$props10.hasCreateNew,
          schema = _this$props10.schema;

      if (hasCreateNew) {
        return _react.default.createElement(_button.default, {
          className: "add-button",
          type: "primary"
        }, _react.default.createElement(_reactRouterDom.Link, {
          to: "".concat(window.location.pathname, "/new")
        }, "\u65B0\u5EFA"));
      }

      return _react.default.createElement(_RecordModal.default, {
        schema: schema,
        record: {},
        onOk: this.editRecord
      }, _react.default.createElement(_button.default, {
        className: "add-button",
        type: "primary"
      }, "\u6DFB\u52A0"));
    }
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var _this3 = this;

      var schema = this.props.schema;
      return schema.map(function (definition) {
        return _this3.renderColumn((0, _objectSpread6.default)({}, definition));
      });
    }
  }, {
    key: "renderCustomRowActions",
    value: function renderCustomRowActions(record) {
      var _this4 = this;

      var _this$props11 = this.props,
          customRowActions = _this$props11.customRowActions,
          matchParams = _this$props11.match.params;
      return customRowActions.map(function (_ref18) {
        var title = _ref18.title,
            type = _ref18.type,
            handler = _ref18.handler,
            enable = _ref18.enable,
            render = _ref18.render,
            confirmModal = _ref18.confirmModal;

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
            return confirm((0, _objectSpread6.default)({}, confirmModal, {
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
      return customMultipleActions.map(function (_ref19) {
        var title = _ref19.title,
            type = _ref19.type,
            handler = _ref19.handler,
            enable = _ref19.enable,
            confirmModal = _ref19.confirmModal;
        return _react.default.createElement(_button.default, {
          key: title,
          type: type,
          disabled: !hasSelected,
          onClick: confirmModal ? function () {
            return confirm((0, _objectSpread6.default)({}, confirmModal, {
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

      var _this$props12 = this.props,
          customGlobalActions = _this$props12.customGlobalActions,
          matchParams = _this$props12.match.params;
      return customGlobalActions.map(function (_ref20) {
        var title = _ref20.title,
            type = _ref20.type,
            handler = _ref20.handler,
            render = _ref20.render;

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

      var _this$props13 = this.props,
          edit = _this$props13.edit,
          remove = _this$props13.remove,
          order = _this$props13.order,
          customRowActions = _this$props13.customRowActions,
          schema = _this$props13.schema;
      return edit || remove || customRowActions.length > 0 || order ? _react.default.createElement(Column, {
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
      var _this$props14 = this.props,
          searchFileds = _this$props14.searchFileds,
          search = _this$props14.search;
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
    key: "renderDateFilters",
    value: function renderDateFilters() {
      var _this9 = this;

      var _this$props15 = this.props,
          dateFilterSchemas = _this$props15.dateFilterSchemas,
          filter = _this$props15.filter;
      return dateFilterSchemas.map(function (_ref21) {
        var key = _ref21.key,
            mapKey = _ref21.mapKey,
            type = _ref21.type,
            title = _ref21.title,
            rangeFilter = _ref21.rangeFilter,
            filters = _ref21.filters;
        var ranges = {};

        if (rangeFilter && filters && filters.length) {
          filters.map(function (_ref22) {
            var text = _ref22.text,
                value = _ref22.value;

            if (!(0, _moment.default)(value[0]).isValid() || !(0, _moment.default)(value[1]).isValid()) {
              throw new Error("mapKey: ".concat(mapKey, ": \u5B58\u5728RangePicker\u7684filter\u7684value\u662F\u65E0\u6548\u7684moment"));
            }

            ranges[text] = [(0, _moment.default)(value[0]), (0, _moment.default)(value[1])];
            return null;
          });
        }

        return _react.default.createElement("div", {
          key: key
        }, "".concat(title, "\uFF1A"), rangeFilter ? _react.default.createElement(_datePicker.default.RangePicker, {
          showTime: type.showTime(),
          format: type.getFormat(),
          value: (0, _has2.default)(filter, mapKey) && (0, _isArray2.default)(filter[mapKey]) && (0, _moment.default)(filter[mapKey][0]).isValid() && (0, _moment.default)(filter[mapKey][1]).isValid() ? [(0, _moment.default)(filter[mapKey][0]), (0, _moment.default)(filter[mapKey][1])] : [],
          ranges: ranges,
          onChange: function onChange(newDate) {
            return _this9.onChangeDateFilter(mapKey, newDate);
          }
        }) : _react.default.createElement(_DatePickerWithPresets.default, {
          value: (0, _has2.default)(filter, mapKey) && (0, _moment.default)(filter[mapKey]).isValid() ? (0, _moment.default)(filter[mapKey]) : null,
          showTime: type.showTime(),
          format: type.getFormat(),
          presets: filters,
          onChange: function onChange(newDate) {
            return _this9.onChangeDateFilter(mapKey, newDate);
          }
        }));
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$state = this.state,
          dataSource = _this$state.dataSource,
          selectedRowKeys = _this$state.selectedRowKeys;
      var _this$props16 = this.props,
          total = _this$props16.total,
          page = _this$props16.page,
          pagesize = _this$props16.pagesize,
          primaryKey = _this$props16.primaryKey,
          searchFileds = _this$props16.searchFileds,
          dateFilterSchemas = _this$props16.dateFilterSchemas,
          customMultipleActions = _this$props16.customMultipleActions,
          customGlobalActions = _this$props16.customGlobalActions,
          isLoading = _this$props16.isLoading;
      var rowSelection = customMultipleActions.length > 0 ? {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange
      } : null;
      var hasHeader = this.hasAddButton() || searchFileds.length > 0 || customMultipleActions.length > 0 || customGlobalActions.length > 0;
      return _react.default.createElement(_react.default.Fragment, null, hasHeader && _react.default.createElement("div", {
        className: "xms-records-page-content-header"
      }, _react.default.createElement("div", {
        className: "xms-records-page-content-header-buttons"
      }, this.hasAddButton() && this.renderAddButton(), this.renderCustomGlobalActions(), this.renderCustomMultipleActions()), _react.default.createElement("div", {
        className: "xms-records-page-content-header-searchs"
      }, this.renderSearchs())), dateFilterSchemas && dateFilterSchemas.length > 0 && _react.default.createElement("div", {
        className: "xms-records-page-content-header-filters"
      }, this.renderDateFilters()), _react.default.createElement(_table.default, {
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
      var _this$props17 = this.props,
          Component = _this$props17.component,
          error = _this$props17.error;
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
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  create: _propTypes.default.func,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  customGlobalActions: _propTypes.default.array,
  customMultipleActions: _propTypes.default.array,
  customRowActions: _propTypes.default.array,
  dateFilterSchemas: _propTypes.default.array,
  error: _propTypes.default.instanceOf(Error),
  isLoading: _propTypes.default.bool,
  order: _propTypes.default.func,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  inlineEdit: _propTypes.default.func,
  filter: _propTypes.default.object,
  primaryKey: _propTypes.default.string,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  search: _propTypes.default.object,
  searchFileds: _propTypes.default.array,
  sort: _propTypes.default.string,
  total: _propTypes.default.number,
  hasCreateNew: _propTypes.default.bool
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  component: null,
  customGlobalActions: [],
  customMultipleActions: [],
  customRowActions: [],
  dateFilterSchemas: [],
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
  total: 0,
  inlineEdit: null,
  hasCreateNew: false
});