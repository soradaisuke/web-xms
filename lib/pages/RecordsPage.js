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

var _router = require("dva/router");

var _queryString = require("query-string");

var _dva = require("dva");

var _Page = _interopRequireDefault(require("./Page"));

var _generateUri = _interopRequireDefault(require("../utils/generateUri"));

var Column = _table.default.Column;

var RecordsPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordsPage, _React$PureComponent);

  function RecordsPage() {
    var _getPrototypeOf2;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, RecordsPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RecordsPage)).call.apply(_getPrototypeOf2, [this].concat(args))), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isError: false,
      isLoading: true,
      list: _immutable.default.List(),
      dataSource: []
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangePage", function (pageNum) {
      _this.props.changePage({
        pageNum: pageNum,
        pageSize: _this.props.pageSize
      });
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onConfirmRemove", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(record) {
        var hide;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hide = _message2.default.loading('正在删除……', 0);
                _context.prev = 1;
                _context.next = 4;
                return _this.props.remove(record.id);

              case 4:
                hide();
                _context.next = 7;
                return _this.props.fetch();

              case 7:
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                hide();

                _message2.default.error(_context.t0.message);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "editRecord", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(id, body) {
        var hide;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hide = _message2.default.loading('正在保存……', 0);
                _context2.prev = 1;

                if (!id) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return _this.props.patch({
                  id: id,
                  body: body
                });

              case 5:
                _context2.next = 9;
                break;

              case 7:
                _context2.next = 9;
                return _this.props.create({
                  body: body
                });

              case 9:
                hide();
                _context2.next = 12;
                return _this.props.fetch();

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                hide();

                _message2.default.error(_context2.t0.message);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()), _temp));
  }

  (0, _createClass2.default)(RecordsPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.pageSize !== this.props.pageSize || prevProps.pageNum !== this.props.pageNum) {
        this.fetch();
      }
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.setState({
                  isLoading: true
                });
                _context3.prev = 1;
                _context3.next = 4;
                return this.props.fetch({
                  pageNum: this.props.pageNum,
                  pageSize: this.props.pageSize
                });

              case 4:
                this.setState({
                  isError: false,
                  isLoading: false
                });
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                this.setState({
                  isError: true,
                  isLoading: false
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 7]]);
      }));

      return function fetch() {
        return _fetch.apply(this, arguments);
      };
    }()
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$props = this.props,
          Modal = _this$props.Modal,
          create = _this$props.create,
          patch = _this$props.patch,
          remove = _this$props.remove,
          renderAction = _this$props.renderAction;
      return _react.default.createElement(_react.default.Fragment, null, Modal && create && _react.default.createElement(Modal, {
        record: {},
        onOk: this.editRecord
      }, _react.default.createElement(_button.default, {
        type: "primary"
      }, "\u6DFB\u52A0")), _react.default.createElement(_table.default, {
        loading: this.state.isLoading,
        dataSource: this.state.dataSource,
        rowKey: function rowKey(record) {
          return record.id;
        },
        pagination: false
      }, this.props.children, (patch || remove || renderAction) && _react.default.createElement(Column, {
        title: "\u64CD\u4F5C",
        key: "action",
        render: function render(text, record) {
          return _react.default.createElement("span", null, Modal && patch && _react.default.createElement(Modal, {
            record: record,
            onOk: _this2.editRecord
          }, _react.default.createElement(_button.default, {
            type: "primary"
          }, "\u7F16\u8F91")), remove && _react.default.createElement(_popconfirm.default, {
            title: "\u786E\u8BA4\u5220\u9664\uFF1F",
            onConfirm: function onConfirm() {
              return _this2.onConfirmRemove(record);
            }
          }, _react.default.createElement(_button.default, {
            type: "primary"
          }, "\u5220\u9664")));
        }
      })), _react.default.createElement(_pagination.default, {
        className: "ant-table-pagination",
        total: this.props.total,
        current: this.props.pageNum,
        pageSize: this.props.pageSize,
        onChange: this.onChangePage
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_Page.default, {
        isError: this.state.isError
      }, this.renderContent());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.list !== nextProps.list) {
        return {
          list: nextProps.list,
          dataSource: nextProps.list.toJS()
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
  children: _propTypes.default.node.isRequired,
  fetch: _propTypes.default.func.isRequired,
  create: _propTypes.default.func,
  list: _propTypes.default.instanceOf(_immutable.default.List),
  Modal: _propTypes.default.func,
  pageNum: _propTypes.default.number,
  pageSize: _propTypes.default.number,
  patch: _propTypes.default.func,
  remove: _propTypes.default.func,
  renderAction: _propTypes.default.func,
  total: _propTypes.default.number
});
(0, _defineProperty2.default)(RecordsPage, "defaultProps", {
  create: null,
  patch: null,
  remove: null,
  renderAction: null,
  list: _immutable.default.List(),
  Modal: null,
  pageNum: 1,
  pageSize: 10,
  total: 0
});

var mapStateToProps = function mapStateToProps(state) {
  var queries = (0, _queryString.parse)(state.routing.location.search);
  var props = {};

  if (queries.pageNum) {
    props.pageNum = (0, _toInteger2.default)(queries.pageNum);
  }

  if (queries.pageSize) {
    props.pageSize = (0, _toInteger2.default)(queries.pageSize);
  }

  return props;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changePage: function () {
      var _changePage = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_ref3) {
        var pageNum, pageSize, uri;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                pageNum = _ref3.pageNum, pageSize = _ref3.pageSize;
                uri = (0, _generateUri.default)(window.location.href, {
                  pageNum: pageNum,
                  pageSize: pageSize
                });
                return _context4.abrupt("return", dispatch(_router.routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length))));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function changePage(_x4) {
        return _changePage.apply(this, arguments);
      };
    }()
  };
};

var _default = (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(RecordsPage);

exports.default = _default;