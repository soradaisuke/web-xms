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

var _moment = _interopRequireDefault(require("moment"));

var _BaseDateTimeColumn2 = _interopRequireDefault(require("./BaseDateTimeColumn"));

var DateTimeColumn = function (_BaseDateTimeColumn) {
  (0, _inherits2.default)(DateTimeColumn, _BaseDateTimeColumn);

  function DateTimeColumn() {
    (0, _classCallCheck2.default)(this, DateTimeColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateTimeColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(DateTimeColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return 'YYYY-MM-DD HH:mm:ss';
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return (0, _moment.default)(value).isValid() ? (0, _moment.default)(value).format(this.getInTableFormat()) : '';
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return true;
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v && (0, _isFunction2.default)(v.toISOString) ? v.toISOString() : v;
    }
  }]);
  return DateTimeColumn;
}(_BaseDateTimeColumn2.default);

exports.default = DateTimeColumn;