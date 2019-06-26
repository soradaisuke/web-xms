"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

var UrlColumn = function (_StringColumn) {
  (0, _inherits2.default)(UrlColumn, _StringColumn);

  function UrlColumn() {
    (0, _classCallCheck2.default)(this, UrlColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UrlColumn).apply(this, arguments));
  }

  return UrlColumn;
}(_StringColumn2.default);

exports.default = UrlColumn;