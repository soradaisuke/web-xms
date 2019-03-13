"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Select = function (_React$PureComponent) {
  (0, _inherits2.default)(Select, _React$PureComponent);

  function Select(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSearch", function (value) {
      var _this$props = _this.props,
          onSearch = _this$props.onSearch,
          showSearch = _this$props.showSearch,
          formFieldValues = _this$props.formFieldValues;

      if (showSearch) {
        onSearch(value, formFieldValues, function (newOptions) {
          return _this.setState({
            options: newOptions
          });
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (value) {
      var onChange = _this.props.onChange;
      onChange(value);
    });
    _this.state = {
      options: props.options
    };
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          onSearch = _this$props2.onSearch,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["value", "onChange", "onSearch"]);
      var options = this.state.options;
      return _react.default.createElement(_select.default, (0, _extends2.default)({
        allowClear: true,
        value: value,
        placeholder: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u9009\u9879",
        getPopupContainer: function getPopupContainer(trigger) {
          return trigger.parentNode;
        },
        onSearch: this.onSearch,
        onChange: this.onChange
      }, props), options.map(function (_ref) {
        var children = _ref.children,
            value = _ref.value,
            opProps = (0, _objectWithoutProperties2.default)(_ref, ["children", "value"]);
        return _react.default.createElement(_select.default.Option, (0, _extends2.default)({
          value: (0, _isUndefined2.default)(value) ? opProps.key : value
        }, opProps), children);
      }));
    }
  }]);
  return Select;
}(_react.default.PureComponent);

exports.default = Select;
(0, _defineProperty2.default)(Select, "displayName", 'Select');
(0, _defineProperty2.default)(Select, "propTypes", {
  onChange: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.arrayOf(_propTypes.default.string)]),
  formFieldValues: _propTypes.default.shape({}).isRequired,
  onSearch: _propTypes.default.func,
  showSearch: _propTypes.default.bool
});
(0, _defineProperty2.default)(Select, "defaultProps", {
  showSearch: false,
  onSearch: function onSearch() {}
});