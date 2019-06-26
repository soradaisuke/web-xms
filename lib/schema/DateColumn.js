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

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _BaseDateTimeColumn2 = _interopRequireDefault(require("./BaseDateTimeColumn"));

var DateColumn = function (_BaseDateTimeColumn) {
  (0, _inherits2.default)(DateColumn, _BaseDateTimeColumn);

  function DateColumn() {
    (0, _classCallCheck2.default)(this, DateColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateColumn).apply(this, arguments));
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