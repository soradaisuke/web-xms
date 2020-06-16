"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _Action2 = _interopRequireDefault(require("./Action"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EditAction = function (_Action) {
  (0, _inherits2.default)(EditAction, _Action);

  var _super = _createSuper(EditAction);

  function EditAction() {
    (0, _classCallCheck2.default)(this, EditAction);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(EditAction, [{
    key: "getShape",
    value: function getShape() {
      return this.config.get('shape', 'circle');
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.config.get('icon', 'edit');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title', '编辑');
    }
  }, {
    key: "getColumns",
    value: function getColumns(_ref) {
      var table = _ref.table;
      return this.columns || table.getColumns();
    }
  }, {
    key: "getHandler",
    value: function getHandler(_ref2) {
      var edit = _ref2.edit;
      return this.config.get('handler', edit);
    }
  }, {
    key: "getHandlingMessage",
    value: function getHandlingMessage() {
      return this.config.get('handlingMessage', '正在保存……');
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
    key: "isDisabled",
    value: function isDisabled(_ref3) {
      var user = _ref3.user,
          record = _ref3.record,
          records = _ref3.records,
          matchParams = _ref3.matchParams,
          table = _ref3.table;
      var enable = this.config.get('enable');
      return (0, _isFunction2.default)(enable) && !enable({
        record: record,
        records: records,
        user: user,
        matchParams: matchParams,
        id: (0, _get2.default)(record, table.getPrimaryKey())
      });
    }
  }, {
    key: "renderInline",
    value: function renderInline() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          record = _ref4.record,
          column = _ref4.column,
          onClick = _ref4.onClick;

      return column.renderInlineEdit({
        record: record,
        onClick: onClick
      });
    }
  }]);
  return EditAction;
}(_Action2.default);

exports.default = EditAction;