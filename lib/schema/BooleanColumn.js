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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Column2 = _interopRequireDefault(require("./Column"));

var BooleanColumn = function (_Column) {
  (0, _inherits2.default)(BooleanColumn, _Column);

  function BooleanColumn() {
    (0, _classCallCheck2.default)(this, BooleanColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BooleanColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(BooleanColumn, [{
    key: "getValueOptions",
    value: function getValueOptions() {
      return (0, _get2.default)((0, _getPrototypeOf2.default)(BooleanColumn.prototype), "getValueOptions", this).call(this) || _immutable.default.fromJS([{
        text: '是',
        value: true
      }, {
        text: '否',
        value: false
      }]);
    }
  }, {
    key: "useValueOptionsInTable",
    value: function useValueOptionsInTable() {
      return true;
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v && v !== 'false';
    }
  }]);
  return BooleanColumn;
}(_Column2.default);

exports.default = BooleanColumn;