"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

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
  }

  (0, _createClass2.default)(Action, [{
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
      return this.config.get('columns');
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
        return _react.default.createElement(_RecordModal.default, {
          columns: columns,
          key: this.getTitle(),
          record: record,
          records: records,
          checkVisibility: this.checkVisibility(),
          onOk: function onOk(body) {
            return onClick({
              data: {
                body: body
              },
              loadingMessage: null,
              throwError: true,
              reload: true
            });
          }
        }, _react.default.createElement(_button.default, buttonProps));
      }

      var confirmType = this.getConfirmType();
      var confirmTitle = this.getConfirmTitle();
      var confirmContent = this.getConfirmContent();

      if (confirmType === 'pop' && !buttonProps.disabled) {
        return _react.default.createElement(_popconfirm.default, {
          key: this.getTitle(),
          title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
          onConfirm: onClick
        }, _react.default.createElement(_button.default, buttonProps));
      }

      var click = onClick;

      if (confirmTitle) {
        click = function click() {
          return modalConfirm({
            title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
            content: (0, _isFunction2.default)(confirmContent) ? confirmContent(params) : confirmContent,
            onOk: onClick
          });
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
      var _this = this;

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
          column = _ref2.column;
      var render = this.config.get('render');
      var params = {
        record: record,
        records: records,
        user: user,
        matchParams: matchParams,
        id: (0, _get2.default)(record, table.getPrimaryKey())
      };

      if ((0, _isFunction2.default)(render)) {
        return render((0, _objectSpread2.default)({}, params, {
          confirm: confirm
        }));
      }

      var enable = this.config.get('enable');
      var disabled;
      var filteredRecords;

      if (this.canHandleGlobal()) {
        disabled = (0, _isFunction2.default)(enable) && !enable(params);
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

      var onClick = function onClick() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$data = _ref3.data,
            data = _ref3$data === void 0 ? {} : _ref3$data,
            _ref3$loadingMessage = _ref3.loadingMessage,
            loadingMessage = _ref3$loadingMessage === void 0 ? _this.getHandlingMessage() : _ref3$loadingMessage,
            _ref3$throwError = _ref3.throwError,
            throwError = _ref3$throwError === void 0 ? false : _ref3$throwError,
            _ref3$reload = _ref3.reload,
            reload = _ref3$reload === void 0 ? _this.needReload() : _ref3$reload;

        if ((0, _isFunction2.default)(handler)) {
          var promise;

          if (_this.canHandleGlobal()) {
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

          submit({
            promise: promise,
            throwError: throwError,
            loadingMessage: loadingMessage,
            reload: reload
          });
        }
      };

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
  }]);
  return Action;
}();

exports.default = Action;