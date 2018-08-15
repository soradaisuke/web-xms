"use strict";

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

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

require("antd/lib/table/style");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _toInteger2 = _interopRequireDefault(require("lodash/toInteger"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reactRouterDom = require("react-router-dom");

var _router = require("dva/router");

var _queryString = require("query-string");

var _dva = require("dva");

var _generateUri = _interopRequireDefault(require("../utils/generateUri"));

var _Page = _interopRequireDefault(require("./Page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Column = _table.default.Column;

var RecordsPage = function (_React$PureComponent) {
  _inherits(RecordsPage, _React$PureComponent);

  function RecordsPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RecordsPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RecordsPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isError: false,
      isLoading: true,
      records: _immutable.default.List(),
      dataSource: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangePage", function (pageNum) {
      _this.props.changePage({
        pageNum: pageNum,
        pageSize: _this.props.pageSize
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onConfirmRemove", function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(record) {
        var hide;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "editRecord", function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, body) {
        var hide;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
    }());

    return _this;
  }

  _createClass(RecordsPage, [{
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
      var _fetch = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
    key: "renderSchema",
    value: function renderSchema() {
      return this.props.schema.map(function (_ref3) {
        var key = _ref3.key,
            title = _ref3.title,
            link = _ref3.link,
            show = _ref3.show;

        if (show) {
          if (link) {
            return _react.default.createElement(Column, {
              title: title,
              dataIndex: key,
              key: key,
              render: function render(text, record) {
                return _react.default.createElement("span", null, _react.default.createElement(_reactRouterDom.Link, {
                  to: "".concat(link.path || window.location.pathname, "/").concat(record[link.key || key])
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
      });
    }
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
      }, this.renderSchema(), (patch || remove || renderAction) && _react.default.createElement(Column, {
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

_defineProperty(RecordsPage, "displayName", 'RecordsPage');

_defineProperty(RecordsPage, "propTypes", {
  changePage: _propTypes.default.func.isRequired,
  fetch: _propTypes.default.func.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.string,
    link: _propTypes.default.shape({
      path: _propTypes.default.string,
      key: _propTypes.default.string
    }),
    show: _propTypes.default.bool
  })).isRequired,
  create: _propTypes.default.func,
  Modal: _propTypes.default.func,
  pageNum: _propTypes.default.number,
  pageSize: _propTypes.default.number,
  patch: _propTypes.default.func,
  records: _propTypes.default.instanceOf(_immutable.default.List),
  remove: _propTypes.default.func,
  renderAction: _propTypes.default.func,
  total: _propTypes.default.number
});

_defineProperty(RecordsPage, "defaultProps", {
  create: null,
  patch: null,
  remove: null,
  renderAction: null,
  records: _immutable.default.List(),
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
      var _changePage = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref4) {
        var pageNum, pageSize, uri;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                pageNum = _ref4.pageNum, pageSize = _ref4.pageSize;
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