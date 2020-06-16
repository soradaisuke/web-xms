"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _Table = _interopRequireDefault(require("../schema/Table"));

var _Page = _interopRequireDefault(require("./Page"));

var _RecordForm = _interopRequireDefault(require("../components/RecordForm"));

var _TableActions = _interopRequireDefault(require("../actions/TableActions"));

require("./RecordsPage.less");

var _visiblePromise = _interopRequireDefault(require("../utils/visiblePromise"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RecordFormPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordFormPage, _React$PureComponent);

  var _super = _createSuper(RecordFormPage);

  function RecordFormPage() {
    var _this;

    (0, _classCallCheck2.default)(this, RecordFormPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      action: null,
      isLoading: false,
      error: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _this$props, id, fetch;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, id = _this$props.match.params.id, fetch = _this$props.fetch;

              if (fetch) {
                _this.setState({
                  isLoading: true,
                  error: null
                });

                fetch({
                  id: id
                }).then(function () {
                  _this.setState({
                    isLoading: false,
                    error: null
                  });
                }).catch(function (e) {
                  return _this.setState({
                    isLoading: false,
                    error: e
                  });
                });
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", function (body) {
      var action = _this.state.action;
      var _this$props2 = _this.props,
          create = _this$props2.create,
          edit = _this$props2.edit,
          id = _this$props2.match.params.id;
      var handler = action.getHandler({
        create: create,
        edit: edit
      });
      return (0, _visiblePromise.default)({
        promise: handler({
          body: body,
          id: id
        }),
        loadingMessage: action.getHandlingMessage(),
        successMessage: '保存成功',
        throwError: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRef", function (ref) {
      _this.form = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickGoBack", function () {
      var history = _this.props.history;

      if (_this.form) {
        _modal.default.confirm({
          title: '确认放弃所编辑的内容返回上一页？',
          onOk: history.goBack
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickReset", function () {
      if (_this.form) {
        _modal.default.confirm({
          title: '确认重置？',
          onOk: function onOk() {
            _this.form.reset();
          }
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickSubmit", function () {
      var history = _this.props.history;

      if (_this.form) {
        _modal.default.confirm({
          title: '确认提交？',
          onOk: function onOk() {
            _this.form.onOk().then(function (isOk) {
              if (isOk) {
                history.goBack();
              }
            });
          }
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderActions", function (data) {
      var isLoading = _this.state.isLoading;
      var renderActions = _this.props.renderActions;
      return _react.default.createElement(_row.default, {
        type: "flex",
        align: "middle"
      }, _react.default.createElement(_button.default, {
        onClick: _this.onClickGoBack
      }, "\u8FD4\u56DE"), _react.default.createElement(_button.default, {
        className: "form-action",
        disabled: isLoading,
        type: "danger",
        onClick: _this.onClickReset
      }, "\u91CD\u7F6E"), _react.default.createElement(_button.default, {
        className: "form-action",
        disabled: isLoading,
        type: "primary",
        onClick: _this.onClickSubmit
      }, "\u63D0\u4EA4"), renderActions && renderActions(data));
    });
    return _this;
  }

  (0, _createClass2.default)(RecordFormPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          actions = _this$props3.actions,
          reset = _this$props3.reset;
      var isEdit = this.isEdit();
      this.setState({
        action: isEdit ? actions.getEditAction() : actions.getCreateAction()
      });

      if (reset) {
        reset();
      }

      if (isEdit) {
        this.fetch();
      }
    }
  }, {
    key: "isEdit",
    value: function isEdit() {
      var id = this.props.match.params.id;
      return id !== 'new';
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props4 = this.props,
          table = _this$props4.table,
          record = _this$props4.record,
          user = _this$props4.user;
      var action = this.state.action;

      if (!table || !action) {
        return null;
      }

      return _react.default.createElement(_card.default, {
        title: action.getTitle(),
        className: "content-card"
      }, _react.default.createElement(_RecordForm.default, {
        className: "record-form-page-form",
        onRef: this.onRef,
        record: record,
        columns: table.getColumns(),
        user: user,
        onOk: this.onOk,
        renderActions: this.renderActions
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      return _react.default.createElement(_Page.default, {
        showWatermark: true,
        isLoading: isLoading,
        isError: !!error,
        errorMessage: error ? error.message : ''
      }, this.renderContent());
    }
  }]);
  return RecordFormPage;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordFormPage, "displayName", 'RecordFormPage');
(0, _defineProperty2.default)(RecordFormPage, "propTypes", {
  actions: _propTypes.default.instanceOf(_TableActions.default).isRequired,
  history: _propTypes.default.shape({
    push: _propTypes.default.func.isRequired,
    goBack: _propTypes.default.func.isRequired
  }).isRequired,
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({
      id: _propTypes.default.string.isRequired
    }).isRequired
  }).isRequired,
  table: _propTypes.default.instanceOf(_Table.default).isRequired,
  reset: _propTypes.default.func,
  renderActions: _propTypes.default.func,
  fetch: _propTypes.default.func,
  create: _propTypes.default.func,
  edit: _propTypes.default.func,
  record: _propTypes.default.object,
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordFormPage, "defaultProps", {
  reset: null,
  user: null,
  renderActions: null,
  fetch: null,
  create: null,
  edit: null,
  record: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordFormPage);

exports.default = _default;