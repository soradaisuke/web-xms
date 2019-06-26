"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _immutable = _interopRequireDefault(require("immutable"));

var _NumberColumn2 = _interopRequireDefault(require("./NumberColumn"));

var OrderColumn = function (_NumberColumn) {
  (0, _inherits2.default)(OrderColumn, _NumberColumn);

  function OrderColumn(config) {
    var _this;

    (0, _classCallCheck2.default)(this, OrderColumn);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OrderColumn).call(this, config));

    if ((0, _get2.default)((0, _getPrototypeOf2.default)(OrderColumn.prototype), "getTableSortDirections", (0, _assertThisInitialized2.default)(_this)).call((0, _assertThisInitialized2.default)(_this)).size > 0) {
      console.error('Column.Order can not have sortDirections');
    }

    if ((0, _get2.default)((0, _getPrototypeOf2.default)(OrderColumn.prototype), "getTableDefaultSortOrder", (0, _assertThisInitialized2.default)(_this)).call((0, _assertThisInitialized2.default)(_this))) {
      console.error('Column.Order can not have defaultSortOrder');
    }

    return _this;
  }

  (0, _createClass2.default)(OrderColumn, [{
    key: "getTableSortDirections",
    value: function getTableSortDirections() {
      return _immutable.default.List(['ascend']);
    }
  }, {
    key: "getTableDefaultSortOrder",
    value: function getTableDefaultSortOrder() {
      return 'ascend';
    }
  }]);
  return OrderColumn;
}(_NumberColumn2.default);

exports.default = OrderColumn;