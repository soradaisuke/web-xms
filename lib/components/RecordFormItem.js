"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var FormItem = _form.default.Item;

var RecordFormItem = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordFormItem, _React$PureComponent);

  function RecordFormItem() {
    (0, _classCallCheck2.default)(this, RecordFormItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RecordFormItem).apply(this, arguments));
  }

  (0, _createClass2.default)(RecordFormItem, [{
    key: "renderItem",
    value: function renderItem() {
      var _this$props = this.props,
          _this$props$definitio = _this$props.definition,
          key = _this$props$definitio.key,
          type = _this$props$definitio.type,
          title = _this$props$definitio.title,
          getFieldDecorator = _this$props.getFieldDecorator;

      switch (type) {
        case 'text':
          return getFieldDecorator(key, {
            rules: [{
              required: true,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A"),
              whitespace: true
            }]
          })(_react.default.createElement(_input.default, null));

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = this.props.definition.title;
      return _react.default.createElement(FormItem, {
        label: title
      }, this.renderItem());
    }
  }]);
  return RecordFormItem;
}(_react.default.PureComponent);

exports.default = RecordFormItem;
(0, _defineProperty2.default)(RecordFormItem, "displayName", 'RecordFormItem');
(0, _defineProperty2.default)(RecordFormItem, "propTypes", {
  definition: _propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    type: _propTypes.default.oneOf(['text', 'number']),
    title: _propTypes.default.string.isRequired
  }).isRequired,
  getFieldDecorator: _propTypes.default.func.isRequired
});