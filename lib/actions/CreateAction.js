"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Action2 = _interopRequireDefault(require("./Action"));

var CreateAction = function (_Action) {
  (0, _inherits2.default)(CreateAction, _Action);

  function CreateAction() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, CreateAction);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CreateAction).call(this, (0, _objectSpread2.default)({}, config, {
      global: true,
      multiple: false
    })));
  }

  (0, _createClass2.default)(CreateAction, [{
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title', '新建');
    }
  }, {
    key: "getHandler",
    value: function getHandler(_ref) {
      var create = _ref.create;
      return this.config.get('handler', create);
    }
  }, {
    key: "getHandlingMessage",
    value: function getHandlingMessage() {
      return this.config.get('handlingMessage', '正在保存……');
    }
  }, {
    key: "getColumns",
    value: function getColumns(_ref2) {
      var table = _ref2.table;
      return this.config.get('columns', table.getColumns());
    }
  }, {
    key: "checkVisibility",
    value: function checkVisibility() {
      return true;
    }
  }, {
    key: "canHandleGlobal",
    value: function canHandleGlobal() {
      return false;
    }
  }]);
  return CreateAction;
}(_Action2.default);

exports.default = CreateAction;