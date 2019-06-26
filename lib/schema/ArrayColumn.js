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

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _Column2 = _interopRequireDefault(require("./Column"));

var ArrayColumn = function (_Column) {
  (0, _inherits2.default)(ArrayColumn, _Column);

  function ArrayColumn(column, config) {
    var _this;

    (0, _classCallCheck2.default)(this, ArrayColumn);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ArrayColumn).call(this, config));
    _this.column = column;
    return _this;
  }

  (0, _createClass2.default)(ArrayColumn, [{
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var _this2 = this;

      var value = _ref.value;
      return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(value, function (v) {
        return _react.default.createElement(_react.default.Fragment, {
          key: v
        }, _this2.column.renderInTable({
          value: v
        }), _react.default.createElement("br", null));
      }));
    }
  }]);
  return ArrayColumn;
}(_Column2.default);

exports.default = ArrayColumn;