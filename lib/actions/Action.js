"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _RecordModal = _interopRequireDefault(require("../components/RecordModal"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var modalConfirm = _modal.default.confirm;

var Action = function () {
  function Action() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Action);
    this.config = _immutable.default.fromJS(config);

    if (config.columns) {
      this.columns = _immutable.default.List(config.columns);
      this.findCascadeColumn();
    }
  }

  (0, _createClass2.default)(Action, [{
    key: "findCascadeColumn",
    value: function findCascadeColumn() {
      var _this = this;

      this.columns.forEach(function (column) {
        var parentKey = column.getParentKey();

        if (parentKey) {
          var parentColumn = _this.columns.find(function (c) {
            return c.getKey() === parentKey;
          });

          if (parentColumn) {
            column.parentColumn = parentColumn;
            parentColumn.childColumn = (parentColumn.childColumn || []).concat(column);
          }
        }
      });
    }
  }, {
    key: "isRowAction",
    value: function isRowAction() {
      return !this.config.get('global');
    }
  }, {
    key: "isMultipleAction",
    value: function isMultipleAction() {
      return this.config.get('multiple');
    }
  }, {
    key: "isGlobalAction",
    value: function isGlobalAction() {
      return this.config.get('global') && !this.config.get('multiple');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title');
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.config.get('type', 'primary');
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return this.config.get('shape');
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.config.get('icon');
    }
  }, {
    key: "getConfirmType",
    value: function getConfirmType() {
      return this.config.getIn(['confirm', 'type']);
    }
  }, {
    key: "getConfirmTitle",
    value: function getConfirmTitle() {
      return this.config.getIn(['confirm', 'title']);
    }
  }, {
    key: "getConfirmContent",
    value: function getConfirmContent() {
      return this.config.getIn(['confirm', 'content']);
    }
  }, {
    key: "getConfirmComponentProps",
    value: function getConfirmComponentProps() {
      if (!this.confirmComponentProps) {
        this.confirmComponentProps = this.config.getIn(['confirm', 'componentProps'], _immutable.default.Map()).toJS();
      }

      return this.confirmComponentProps;
    }
  }, {
    key: "getLink",
    value: function getLink() {
      return this.config.get('link');
    }
  }, {
    key: "getHandler",
    value: function getHandler() {
      return this.config.get('handler');
    }
  }, {
    key: "getHandlingMessage",
    value: function getHandlingMessage() {
      return this.config.get('handlingMessage');
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return this.columns;
    }
  }, {
    key: "getOnComplete",
    value: function getOnComplete() {
      return this.config.get('onComplete');
    }
  }, {
    key: "getModalComponentProps",
    value: function getModalComponentProps() {
      if (!this.modalComponentProps) {
        this.modalComponentProps = this.config.get('modalComponentProps', _immutable.default.Map()).toJS();
      }

      return this.modalComponentProps;
    }
  }, {
    key: "needReload",
    value: function needReload() {
      return this.config.get('reload');
    }
  }, {
    key: "checkVisibility",
    value: function checkVisibility() {
      return false;
    }
  }, {
    key: "isVisible",
    value: function isVisible(user) {
      var invisible = this.config.get('invisible');

      if ((0, _isFunction2.default)(invisible)) {
        if (!user) {
          return false;
        }

        return !invisible({
          user: user
        });
      }

      return !invisible;
    }
  }, {
    key: "canHandleGlobal",
    value: function canHandleGlobal() {
      return this.isMultipleAction() && !this.isRowAction();
    }
  }, {
    key: "renderInteral",
    value: function renderInteral(_ref) {
      var _this2 = this;

      var record = _ref.record,
          records = _ref.records,
          table = _ref.table,
          buttonProps = _ref.buttonProps,
          params = _ref.params,
          column = _ref.column,
          onClick = _ref.onClick;
      var columns;

      if (column) {
        columns = _immutable.default.List([column]);
      } else {
        columns = this.getColumns({
          table: table,
          column: column
        });
      }

      if (columns) {
        return _react.default.createElement(_RecordModal.default, (0, _extends2.default)({}, this.getModalComponentProps(), {
          columns: columns,
          key: this.getTitle(),
          title: this.getTitle(),
          record: record,
          records: records,
          checkVisibility: this.checkVisibility(),
          onOk: function onOk(body) {
            return onClick({
              data: {
                body: body
              },
              loadingMessage: null,
              throwError: false,
              reload: true
            });
          }
        }), _react.default.createElement(_button.default, buttonProps));
      }

      var confirmType = this.getConfirmType();
      var confirmTitle = this.getConfirmTitle();
      var confirmContent = this.getConfirmContent();

      if (confirmType === 'pop' && !buttonProps.disabled) {
        return _react.default.createElement(_popconfirm.default, (0, _extends2.default)({}, this.getConfirmComponentProps(), {
          key: this.getTitle(),
          title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
          getPopupContainer: function getPopupContainer(triggerNode) {
            return triggerNode.parentNode;
          },
          onConfirm: onClick
        }), _react.default.createElement(_button.default, buttonProps));
      }

      var click = onClick;

      if (confirmTitle) {
        click = function click() {
          return modalConfirm((0, _objectSpread2.default)({}, _this2.getConfirmComponentProps(), {
            title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
            content: (0, _isFunction2.default)(confirmContent) ? confirmContent(params) : confirmContent,
            onOk: onClick
          }));
        };
      }

      return _react.default.createElement(_button.default, (0, _extends2.default)({}, buttonProps, {
        onClick: click,
        key: this.getTitle()
      }));
    }
  }, {
    key: "render",
    value: function render(_ref2) {
      var _this3 = this;

      var record = _ref2.record,
          records = _ref2.records,
          user = _ref2.user,
          submit = _ref2.submit,
          confirm = _ref2.confirm,
          matchParams = _ref2.matchParams,
          create = _ref2.create,
          remove = _ref2.remove,
          edit = _ref2.edit,
          table = _ref2.table,
          column = _ref2.column,
          inline = _ref2.inline;
      var render = this.config.get('render');
      var params = {
        record: record,
        records: records,
        user: user,
        matchParams: matchParams,
        id: (0, _get2.default)(record, table.getPrimaryKey())
      };
      var enable = this.config.get('enable');
      var disabled;
      var filteredRecords;

      if (this.canHandleGlobal()) {
        disabled = records && records.length === 0 || (0, _isFunction2.default)(enable) && !enable(params);
      } else {
        filteredRecords = records ? (0, _filter2.default)(records, function (r) {
          return (0, _isFunction2.default)(enable) ? enable((0, _objectSpread2.default)({}, params, {
            records: null,
            record: r
          })) : true;
        }) : null;

        if (records) {
          disabled = filteredRecords && filteredRecords.length === 0;
        } else {
          disabled = (0, _isFunction2.default)(enable) && !enable(params);
        }
      }

      if (disabled && this.isRowAction() && record) {
        return null;
      }

      if ((0, _isFunction2.default)(render)) {
        return render((0, _objectSpread2.default)({}, params, {
          reload: confirm
        }));
      }

      var handler = this.getHandler({
        remove: remove,
        create: create,
        edit: edit
      });
      var children;

      if (this.getLink() && !disabled) {
        children = _react.default.createElement(_RecordLink.default, {
          link: this.getLink(),
          record: record || records
        }, this.getTitle());
      } else if (this.getShape() !== 'circle') {
        children = this.getTitle();
      }

      var buttonProps = {
        disabled: disabled,
        children: children,
        type: this.getType(),
        shape: this.getShape(),
        icon: this.getIcon(),
        className: 'action-button'
      };

      var onClick = function () {
        var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
          var _ref4,
              _ref4$data,
              data,
              _ref4$loadingMessage,
              loadingMessage,
              _ref4$throwError,
              throwError,
              _ref4$reload,
              reload,
              promise,
              _args = arguments;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref4$data = _ref4.data, data = _ref4$data === void 0 ? {} : _ref4$data, _ref4$loadingMessage = _ref4.loadingMessage, loadingMessage = _ref4$loadingMessage === void 0 ? _this3.getHandlingMessage() : _ref4$loadingMessage, _ref4$throwError = _ref4.throwError, throwError = _ref4$throwError === void 0 ? false : _ref4$throwError, _ref4$reload = _ref4.reload, reload = _ref4$reload === void 0 ? _this3.needReload() : _ref4$reload;

                  if (!(0, _isFunction2.default)(handler)) {
                    _context.next = 5;
                    break;
                  }

                  if (_this3.canHandleGlobal()) {
                    promise = handler((0, _objectSpread2.default)({}, params, data));
                  } else if (filteredRecords) {
                    promise = Promise.all((0, _map2.default)(filteredRecords, function (r) {
                      return handler((0, _objectSpread2.default)({}, params, {
                        records: null,
                        record: r,
                        id: (0, _get2.default)(r, table.getPrimaryKey())
                      }, data));
                    }));
                  } else {
                    promise = handler((0, _objectSpread2.default)({}, params, {
                      id: (0, _get2.default)(record, table.getPrimaryKey())
                    }, data));
                  }

                  _context.next = 5;
                  return submit({
                    promise: promise,
                    throwError: throwError,
                    loadingMessage: loadingMessage,
                    reload: reload,
                    onComplete: _this3.getOnComplete()
                  });

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function onClick() {
          return _ref3.apply(this, arguments);
        };
      }();

      if (inline) {
        return this.renderInline({
          column: column,
          record: record,
          onClick: onClick
        });
      }

      return this.renderInteral({
        record: record,
        records: records,
        table: table,
        buttonProps: buttonProps,
        params: params,
        column: column,
        onClick: onClick
      });
    }
  }, {
    key: "renderInline",
    value: function renderInline() {
      return null;
    }
  }]);
  return Action;
}();

exports.default = Action;