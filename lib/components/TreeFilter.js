"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tree/style");

var _tree = _interopRequireDefault(require("antd/lib/tree"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generateTreeData = _interopRequireDefault(require("../utils/generateTreeData"));

require("./TreeFilter.less");

var TreeFilter = function (_React$PureComponent) {
  (0, _inherits2.default)(TreeFilter, _React$PureComponent);

  function TreeFilter() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TreeFilter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TreeFilter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onCheck", function (checkedKeys) {
      var _this$props = _this.props,
          setSelectedKeys = _this$props.setSelectedKeys,
          column = _this$props.column;
      setSelectedKeys((0, _map2.default)(checkedKeys, function (key) {
        return column.formatFilterValue(key);
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(TreeFilter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          column = _this$props2.column,
          parentValue = _this$props2.parentValue,
          selectedKeys = _this$props2.selectedKeys;
      var valueOptionsRequest = column.getValueOptionsRequest();
      var treeData = this.state.treeData;

      if (!treeData) {
        var filters = column.getFilters(parentValue, 'disableInFilter');

        if (filters) {
          treeData = filters ? (0, _generateTreeData.default)(filters) : [];
        } else if (valueOptionsRequest) {
          column.fetchValueOptions(parentValue).then(function () {
            return _this2.forceUpdate();
          }).catch(function () {});
        }
      }

      treeData = treeData || [];
      var props = {
        treeData: treeData,
        className: 'tree-filter'
      };

      if (column.canFilterMultipleInTable()) {
        props.checkable = true;
        props.checkedKeys = (0, _map2.default)(selectedKeys, function (key) {
          return String(key);
        });
        props.onCheck = this.onCheck;
      } else {
        props.selectedKeys = (0, _map2.default)(selectedKeys, function (key) {
          return String(key);
        });
        props.onSelect = this.onCheck;
      }

      return _react.default.createElement(_tree.default, props);
    }
  }]);
  return TreeFilter;
}(_react.default.PureComponent);

exports.default = TreeFilter;
(0, _defineProperty2.default)(TreeFilter, "propTypes", {
  selectedKeys: _propTypes.default.array.isRequired,
  setSelectedKeys: _propTypes.default.func.isRequired,
  parentValue: _propTypes.default.any
});
(0, _defineProperty2.default)(TreeFilter, "defaultProps", {
  parentValue: null
});