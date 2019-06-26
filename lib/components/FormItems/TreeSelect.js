"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/lib/tree-select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

var generateTreeData = function generateTreeData(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        text = _ref.text,
        children = _ref.children,
        item = (0, _objectWithoutProperties2.default)(_ref, ["value", "text", "children"]);
    return (0, _objectSpread2.default)({
      value: value,
      key: value,
      title: text,
      children: generateTreeData(children)
    }, item);
  });
};

var XMSTreeSelect = function (_React$PureComponent) {
  (0, _inherits2.default)(XMSTreeSelect, _React$PureComponent);

  function XMSTreeSelect() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, XMSTreeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(XMSTreeSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSearch", (0, _debounce2.default)(function (value) {
      var column = _this.props.column;
      var searchRequest = column.getFormSearchRequest();

      if (searchRequest) {
        searchRequest(value).then(function (filters) {
          return _this.setState({
            treeData: generateTreeData(filters)
          });
        });
      }
    }, 500));
    return _this;
  }

  (0, _createClass2.default)(XMSTreeSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          column = _this$props.column,
          parentValue = _this$props.parentValue,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["column", "parentValue"]);
      var valueOptionsRequest = column.getValueOptionsRequest();
      var treeData = this.state.treeData;

      if (!treeData) {
        var filters = column.getFilters(parentValue);

        if (filters) {
          treeData = filters ? generateTreeData(filters.toJS()) : [];
        } else if (valueOptionsRequest) {
          column.fetchValueOptions(parentValue).then(function () {
            return _this2.forceUpdate();
          }).catch(function () {});
        }
      }

      treeData = treeData || [];
      return _react.default.createElement(_treeSelect.default, (0, _extends2.default)({}, props, {
        allowClear: true,
        showSearch: true,
        treeCheckable: column.canSelectMutipleInForm(),
        getPopupContaine: function getPopupContaine(trigger) {
          return trigger.parentNode;
        },
        placeholder: column.getFormPlaceholder(true),
        treeData: treeData,
        filterTreeNode: !column.getFormSearchRequest(),
        onSearch: this.onSearch
      }));
    }
  }]);
  return XMSTreeSelect;
}(_react.default.PureComponent);

exports.default = XMSTreeSelect;