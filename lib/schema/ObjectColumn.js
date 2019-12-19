"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _react = _interopRequireDefault(require("react"));

var _Column2 = _interopRequireDefault(require("./Column"));

var ObjectColumn = function (_Column) {
  (0, _inherits2.default)(ObjectColumn, _Column);

  function ObjectColumn() {
    (0, _classCallCheck2.default)(this, ObjectColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(ObjectColumn, [{
    key: "formatFormFieldValue",
    value: function formatFormFieldValue(v) {
      if ((0, _isPlainObject2.default)(v)) {
        return JSON.stringify(v);
      }

      return v;
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      if ((0, _isString2.default)(v)) {
        return JSON.parse(v);
      }

      return v;
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return JSON.stringify(value);
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var isEdit = _ref2.isEdit;
      return _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit
      })));
    }
  }]);
  return ObjectColumn;
}(_Column2.default);

exports.default = ObjectColumn;