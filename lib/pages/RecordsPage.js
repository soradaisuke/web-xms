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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reactRouter = require("react-router");

var _router = require("dva/router");

var _queryString = require("query-string");

var _dva = require("dva");

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _generateUri = _interopRequireDefault(require("../utils/generateUri"));

var _Page = _interopRequireDefault(require("./Page"));

require("./RecordsPage.less");

var Column = _table.default.Column;

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangePage", function (page) {
      var _this$props = _this.props,
          changePage = _this$props.changePage,
          pagesize = _this$props.pagesize;
      changePage({
        page: page,
        pagesize: pagesize
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onConfirmRemove", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(record) {
        var remove, hide;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                remove = _this.props.remove;
                hide = _message2.default.loading('正在删除……', 0);
                _context.prev = 2;
                _context.next = 5;
                return remove(record.id);

              case 5:
                hide();
                _context.next = 8;
                return _this.fetch();

              case 8:
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                hide();

                _message2.default.error(_context.t0.message);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOrderChange", function (body, diff) {
      _this.editRecord((0, _objectSpread2.default)({}, body, {
        pos: body.pos + diff
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "editRecord", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(body) {
        var _this$props2, edit, create, hide;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = _this.props, edit = _this$props2.edit, create = _this$props2.create;
                hide = _message2.default.loading('正在保存……', 0);
                _context2.prev = 2;

                if (!body.id) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return edit(body);

              case 6:
                _context2.next = 10;
                break;

              case 8:
                _context2.next = 10;
                return create(body);

              case 10:
                hide();
                _context2.next = 13;
                return _this.fetch();

              case 13:
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](2);
                hide();

                _message2.default.error(_context2.t0.message);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 15]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
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
      var _this$props3 = this.props,
          pagesize = _this$props3.pagesize,
          page = _this$props3.page;

      if (prevProps.pagesize !== pagesize || prevProps.page !== page) {
        this.fetch();
      }
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3() {
        var _this$props4, fetch, page, pagesize, params;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props4 = this.props, fetch = _this$props4.fetch, page = _this$props4.page, pagesize = _this$props4.pagesize, params = _this$props4.match.params;
                this.setState({
                  isLoading: true
                });
                _context3.prev = 2;
                _context3.next = 5;
                return fetch({
                  page: page,
                  pagesize: pagesize,
                  params: params
                });

              case 5:
                this.setState({
                  isError: false,
                  isLoading: false
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                this.setState({
                  isError: true,
                  isLoading: false
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));

      return function fetch() {
        return _fetch.apply(this, arguments);
      };
    }()
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var schema = this.props.schema;
      return schema.map(function (definition) {
        return RecordsPage.renderColumn((0, _objectSpread2.default)({}, definition));
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          dataSource = _this$state.dataSource;
      var _this$props5 = this.props,
          Modal = _this$props5.Modal,
          create = _this$props5.create,
          edit = _this$props5.edit,
          remove = _this$props5.remove,
          order = _this$props5.order,
          renderAction = _this$props5.renderAction,
          total = _this$props5.total,
          page = _this$props5.page,
          pagesize = _this$props5.pagesize,
          schema = _this$props5.schema;
      return _react.default.createElement(_react.default.Fragment, null, Modal && create && _react.default.createElement(Modal, {
        schema: schema,
        record: {},
        onOk: this.editRecord
      }, _react.default.createElement(_button.default, {
        className: "add-button",
        type: "primary"
      }, "\u6DFB\u52A0")), _react.default.createElement(_table.default, {
        loading: isLoading,
        dataSource: dataSource,
        rowKey: function rowKey(record) {
          return record.id;
        },
        pagination: false
      }, this.renderSchema(), (edit || remove || renderAction) && _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("span", null, Modal && edit && _react.default.createElement(Modal, {
            record: record,
            onOk: _this2.editRecord
          }, _react.default.createElement(_button.default, {
            className: "action-button",
            type: "primary"
          }, "\u7F16\u8F91")), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this2.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            className: "action-button",
            type: "primary"
          }, "\u5220\u9664")), order && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
            className: "action-button",
            type: "primary",
            onClick: function onClick() {
              return _this2.onOrderChange(record, -1);
            }
          }, "\u4E0A\u79FB"), _react.default.createElement(_button.default, {
            className: "action-button",
            type: "primary",
            onClick: function onClick() {
              return _this2.onOrderChange(record, 1);
            }
          }, "\u4E0B\u79FB")));
        }
      })), _react.default.createElement(_pagination.default, {
        className: "ant-table-pagination",
        total: total,
        current: page,
        pagesize: pagesize,
        onChange: this.onChangePage
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
    key: "renderColumn",
    value: function renderColumn(_ref3) {
      var visibility = _ref3.visibility,
          link = _ref3.link,
          title = _ref3.title,
          key = _ref3.key;

      if (!visibility) {
        return null;
      }

      if (visibility === true || visibility.tabel) {
        if (link) {
          return _react.default.createElement(Column, {
            title: title,
            dataIndex: key,
            key: key,
            render: function render(text, record) {
              return _react.default.createElement("span", null, _react.default.createElement(_RecordLink.default, {
                link: link,
                record: record
              }, text));
            }
          });
        }

        return _react.default.createElement(Column, {
          title: title,
          dataIndex: key,
          key: key
        });
      }

      return null;
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
  changePage: _propTypes.default.func.isRequired,
  fetch: _propTypes.default.func.isRequired,
  match: _propTypes.default.object.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    link: _propTypes.default.oneOfType([_propTypes.default.shape({
      path: _propTypes.default.string,
      key: _propTypes.default.string
    }), _propTypes.default.bool]),
    visibility: _propTypes.default.oneOfType([_propTypes.default.shape({
      tabel: _propTypes.default.bool
    }), _propTypes.default.bool])
  })).isRequired,
  create: _propTypes.default.func,
  Modal: _propTypes.default.func,
  order: _propTypes.default.func,
  page: _propTypes.default.number,
  pagesize: _propTypes.default.number,
  edit: _propTypes.default.func,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  renderAction: _propTypes.default.func,
  total: _propTypes.default.number
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  edit: null,
  remove: null,
  renderAction: null,
  records: _immutable.default.List(),
  Modal: null,
  order: null,
  page: 1,
  pagesize: 10,
  total: 0
});

var mapStateToProps = function mapStateToProps(state) {
  var queries = (0, _queryString.parse)(state.routing.location.search);
  var props = {};

  if (queries.page) {
    props.page = (0, _toInteger2.default)(queries.page);
  }

  if (queries.pagesize) {
    props.pagesize = (0, _toInteger2.default)(queries.pagesize);
  }

  return props;
};

var mapDiseditToProps = function mapDiseditToProps(disedit) {
  return {
    changePage: function () {
      var _changePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_ref4) {
        var page, pagesize, uri;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                page = _ref4.page, pagesize = _ref4.pagesize;
                uri = (0, _generateUri.default)(window.location.href, {
                  page: page,
                  pagesize: pagesize
                });
                return _context4.abrupt("return", disedit(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function changePage(_x3) {
        return _changePage.apply(this, arguments);
      };
    }()
  };
};

var _default = (0, _reactRouter.withRouter)((0, _dva.connect)(mapStateToProps, mapDiseditToProps)(RecordsPage));

exports.default = _default;