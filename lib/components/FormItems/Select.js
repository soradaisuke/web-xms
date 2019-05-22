"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/lib/tree-select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Select = function (_React$PureComponent) {
  (0, _inherits2.default)(Select, _React$PureComponent);

  function Select(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSearch", (0, _debounce2.default)(function (value) {
      var _this$props = _this.props,
          onSearch = _this$props.onSearch,
          showSearch = _this$props.showSearch,
          formFieldValues = _this$props.formFieldValues;

      if (showSearch && (0, _isFunction2.default)(onSearch)) {
        onSearch(value, formFieldValues, function (newTreeData) {
          return _this.setState({
            treeData: newTreeData
          });
        });
      }
    }, 400));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (value) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          treeCheckStrictly = _this$props2.treeCheckStrictly;

      if (treeCheckStrictly && (0, _isArray2.default)(value)) {
        onChange(value.map(function (v) {
          return v ? v.value : null;
        }));
      } else {
        onChange(value);
      }
    });
    _this.state = {
      treeData: props.treeData
    };
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          value = _this$props3.value,
          onChange = _this$props3.onChange,
          onSearch = _this$props3.onSearch,
          filterOptions = _this$props3.filterOptions,
          formFieldValues = _this$props3.formFieldValues,
          td = _this$props3.treeData,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["value", "onChange", "onSearch", "filterOptions", "formFieldValues", "treeData"]);
      var tds = this.state.treeData;
      var treeData = (0, _isFunction2.default)(onSearch) ? tds : td;
      var newTreeData = (0, _isFunction2.default)(filterOptions) ? filterOptions(treeData, formFieldValues) : treeData;
      return _react.default.createElement(_treeSelect.default, (0, _extends2.default)({
        allowClear: true,
        placeholder: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u9009\u9879",
        value: value,
        treeData: newTreeData,
        getPopupContainer: function getPopupContainer(trigger) {
          return trigger.parentNode;
        },
        onSearch: this.onSearch,
        onChange: this.onChange
      }, props));
    }
  }]);
  return Select;
}(_react.default.PureComponent);

exports.default = Select;
(0, _defineProperty2.default)(Select, "displayName", 'Select');
(0, _defineProperty2.default)(Select, "propTypes", {
  onChange: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.arrayOf(_propTypes.default.string)]),
  formFieldValues: _propTypes.default.shape({}),
  onSearch: _propTypes.default.func,
  showSearch: _propTypes.default.bool,
  treeNodeFilterProp: _propTypes.default.string
});
(0, _defineProperty2.default)(Select, "defaultProps", {
  showSearch: false,
  onSearch: null,
  formFieldValues: {},
  treeNodeFilterProp: 'title'
});