"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Action2 = _interopRequireDefault(require("./Action"));

var DeleteAction = function (_Action) {
  (0, _inherits2.default)(DeleteAction, _Action);

  function DeleteAction() {
    (0, _classCallCheck2.default)(this, DeleteAction);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DeleteAction).apply(this, arguments));
  }

  (0, _createClass2.default)(DeleteAction, [{
    key: "getType",
    value: function getType() {
      return this.config.get('type', 'danger');
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return this.config.get('shape', 'circle');
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.config.get('icon', 'delete');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title', '删除');
    }
  }, {
    key: "getConfirmType",
    value: function getConfirmType() {
      return this.config.getIn(['confirm', 'type'], 'pop');
    }
  }, {
    key: "getConfirmTitle",
    value: function getConfirmTitle() {
      return this.config.getIn(['confirm', 'title'], '确认删除?');
    }
  }, {
    key: "getHandler",
    value: function getHandler(_ref) {
      var remove = _ref.remove;
      return this.config.get('handler', remove);
    }
  }, {
    key: "getHandlingMessage",
    value: function getHandlingMessage() {
      return this.config.get('handlingMessage', '正在删除……');
    }
  }, {
    key: "canHandleGlobal",
    value: function canHandleGlobal() {
      return false;
    }
  }, {
    key: "needReload",
    value: function needReload() {
      return true;
    }
  }]);
  return DeleteAction;
}(_Action2.default);

exports.default = DeleteAction;