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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _BaseDateTimeColumn2 = _interopRequireDefault(require("./BaseDateTimeColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DateColumn = function (_BaseDateTimeColumn) {
  (0, _inherits2.default)(DateColumn, _BaseDateTimeColumn);

  var _super = _createSuper(DateColumn);

  function DateColumn() {
    (0, _classCallCheck2.default)(this, DateColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DateColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return 'YYYY-MM-DD';
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return false;
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v && (0, _isFunction2.default)(v.format) ? v.format('YYYY-MM-DD') : v;
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      return v && (0, _isFunction2.default)(v.format) ? v.format('YYYY-MM-DD') : v;
    }
  }]);
  return DateColumn;
}(_BaseDateTimeColumn2.default);

exports.default = DateColumn;