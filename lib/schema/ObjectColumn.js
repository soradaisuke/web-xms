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

var _Column2 = _interopRequireDefault(require("./Column"));

var ObjectColumn = function (_Column) {
  (0, _inherits2.default)(ObjectColumn, _Column);

  function ObjectColumn() {
    (0, _classCallCheck2.default)(this, ObjectColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(ObjectColumn, [{
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return JSON.stringify(value);
    }
  }]);
  return ObjectColumn;
}(_Column2.default);

exports.default = ObjectColumn;