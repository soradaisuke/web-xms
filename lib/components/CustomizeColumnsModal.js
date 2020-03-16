"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _Column = _interopRequireDefault(require("../schema/Column"));

var CustomizeColumnsModal = function (_React$PureComponent) {
  (0, _inherits2.default)(CustomizeColumnsModal, _React$PureComponent);

  function CustomizeColumnsModal(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CustomizeColumnsModal);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CustomizeColumnsModal).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", function () {
      var onChangeSelectedCustomizeMap = _this.props.onChangeSelectedCustomizeMap;
      var selectedCustomizeMap = _this.state.selectedCustomizeMap;
      onChangeSelectedCustomizeMap(selectedCustomizeMap);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onVisibleChange", function (visibility) {
      var selectedCustomizeMap = _this.props.selectedCustomizeMap;

      if (visibility) {
        _this.setState({
          selectedCustomizeMap: selectedCustomizeMap
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (selected) {
      _this.setState({
        selectedCustomizeMap: selected
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetSelectedColumns", function () {
      var defaultSelectedCustomizeMap = _this.props.defaultSelectedCustomizeMap;

      _this.onChange(defaultSelectedCustomizeMap);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderCheckbox", function () {
      var selectedCustomizeMap = _this.state.selectedCustomizeMap;
      var columns = _this.props.columns;
      return _react.default.createElement(_row.default, {
        style: {
          marginBottom: 10
        }
      }, (0, _map2.default)(columns, function (column) {
        return _react.default.createElement(_col.default, {
          span: 6,
          key: column.getKey()
        }, _react.default.createElement(_checkbox.default, {
          checked: selectedCustomizeMap.get(column.getKey()),
          onChange: function onChange(_ref) {
            var checked = _ref.target.checked;
            return _this.onChange(selectedCustomizeMap.set(column.getKey(), checked));
          }
        }, column.getTitle()));
      }));
    });
    _this.state = {
      selectedCustomizeMap: props.selectedCustomizeMap
    };
    return _this;
  }

  (0, _createClass2.default)(CustomizeColumnsModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title;
      return _react.default.createElement(_ActivatorModal.default, (0, _extends2.default)({}, this.props, {
        activator: children,
        title: title,
        onOk: this.onOk,
        onVisibleChange: this.onVisibleChange
      }), this.renderCheckbox(), _react.default.createElement(_row.default, null, _react.default.createElement(_button.default, {
        type: "primary",
        onClick: this.resetSelectedColumns
      }, "\u91CD\u7F6E")));
    }
  }]);
  return CustomizeColumnsModal;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(CustomizeColumnsModal, "displayName", 'CustomizeColumnsModal');
(0, _defineProperty2.default)(CustomizeColumnsModal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  selectedCustomizeMap: _propTypes.default.instanceOf(_immutable.default.Map).isRequired,
  onChangeSelectedCustomizeMap: _propTypes.default.func.isRequired,
  defaultSelectedCustomizeMap: _propTypes.default.instanceOf(_immutable.default.Map).isRequired,
  columns: _propTypes.default.arrayOf(_propTypes.default.instanceOf(_Column.default)).isRequired,
  title: _propTypes.default.string
});
(0, _defineProperty2.default)(CustomizeColumnsModal, "defaultProps", {
  title: '自定义列'
});
var _default = CustomizeColumnsModal;
exports.default = _default;