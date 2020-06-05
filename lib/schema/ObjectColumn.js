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

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Column2 = _interopRequireDefault(require("./Column"));

var _DynamicItem = _interopRequireDefault(require("../components/FormItems/DynamicItem"));

var _findCascadeColumn = _interopRequireDefault(require("../utils/findCascadeColumn"));

var ObjectColumn = function (_Column) {
  (0, _inherits2.default)(ObjectColumn, _Column);

  function ObjectColumn(data) {
    var _this;

    (0, _classCallCheck2.default)(this, ObjectColumn);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectColumn).call(this, data));
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
      var user = _ref2.user,
          record = _ref2.record,
          value = _ref2.value,
          values = _ref2.values,
          isEdit = _ref2.isEdit,
          _ref2$formComponentPr = _ref2.formComponentProps,
          formComponentProps = _ref2$formComponentPr === void 0 ? {} : _ref2$formComponentPr;

      if (this.columns && this.columns.size) {
        return _react.default.createElement(_DynamicItem.default, (0, _extends2.default)({}, this.getFormComponentProps({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values
        }), formComponentProps, {
          user: user,
          isEdit: isEdit,
          columns: this.columns
        }));
      }

      return _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return ObjectColumn;
}(_Column2.default);

exports.default = ObjectColumn;