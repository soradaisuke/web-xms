"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Column2 = _interopRequireDefault(require("./Column"));

var _findCascadeColumn = _interopRequireDefault(require("../utils/findCascadeColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ObjectColumn = function (_Column) {
  (0, _inherits2.default)(ObjectColumn, _Column);

  var _super = _createSuper(ObjectColumn);

  function ObjectColumn(data) {
    var _this;

    (0, _classCallCheck2.default)(this, ObjectColumn);
    _this = _super.call(this, data);
    _this.columns = data && data.columns ? _immutable.default.List(data.columns) : null;
    (0, _findCascadeColumn.default)(_this.columns);
    return _this;
  }

  (0, _createClass2.default)(ObjectColumn, [{
    key: "getColumns",
    value: function getColumns() {
      return this.columns;
    }
  }, {
    key: "resetFilters",
    value: function resetFilters() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(ObjectColumn.prototype), "resetFilters", this).call(this);

      if (this.columns && this.columns.size) {
        this.columns.forEach(function (column) {
          return column.resetFilters();
        });
      }
    }
  }, {
    key: "isArray",
    value: function isArray() {
      var _this$columns;

      return (0, _get2.default)((0, _getPrototypeOf2.default)(ObjectColumn.prototype), "isArray", this).call(this) || ((_this$columns = this.columns) === null || _this$columns === void 0 ? void 0 : _this$columns.size) > 0;
    }
  }]);
  return ObjectColumn;
}(_Column2.default);

exports.default = ObjectColumn;