"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Action2 = _interopRequireDefault(require("./Action"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CreateAction = function (_Action) {
  (0, _inherits2.default)(CreateAction, _Action);

  var _super = _createSuper(CreateAction);

  function CreateAction() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, CreateAction);
    return _super.call(this, _objectSpread(_objectSpread({}, config), {}, {
      global: true,
      multiple: false
    }));
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
      return this.columns || table.getColumns();
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
  }, {
    key: "setLink",
    value: function setLink(link) {
      return new CreateAction(this.config.set('link', link).toJS());
    }
  }]);
  return CreateAction;
}(_Action2.default);

exports.default = CreateAction;