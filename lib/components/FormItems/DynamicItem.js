"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

require("./DynamicItem.less");

var DynamicItem = function (_React$PureComponent) {
  (0, _inherits2.default)(DynamicItem, _React$PureComponent);

  function DynamicItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DynamicItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DynamicItem).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "add", function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value;

      if (!value) {
        onChange([_this.initialValue]);
      } else {
        onChange(value.concat([_this.initialValue]));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "remove", function (index) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          value = _this$props2.value;
      onChange((0, _remove2.default)(value, function (_, i) {
        return i !== index;
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (_ref) {
      var column = _ref.column,
          value = _ref.value,
          index = _ref.index;
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          values = _this$props3.value;
      var newValue = (0, _objectSpread3.default)({}, values[index], (0, _defineProperty2.default)({}, column.getFormKey(), value));

      if (column.childColumn) {
        (0, _forEach2.default)(column.childColumn, function (childColumn) {
          (0, _unset2.default)(newValue, childColumn.getFormKey());
        });
      }

      values[index] = newValue;
      onChange((0, _toConsumableArray2.default)(values));
    });
    props.columns.forEach(function (column) {
      return column.resetFilters();
    });
    return _this;
  }

  (0, _createClass2.default)(DynamicItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.calculateInitialValue();
    }
  }, {
    key: "calculateInitialValue",
    value: function calculateInitialValue() {
      var columns = this.props.columns;
      var initialValue = {};

      if (columns) {
        columns.forEach(function (column) {
          (0, _set2.default)(initialValue, column.getFormKey(), column.generateFormInitialValue());
        });
      }

      this.initialValue = initialValue;
    }
  }, {
    key: "renderFormItems",
    value: function renderFormItems(_ref2) {
      var _this2 = this;

      var value = _ref2.value,
          index = _ref2.index;
      var _this$props4 = this.props,
          columns = _this$props4.columns,
          disabled = _this$props4.disabled,
          user = _this$props4.user;
      return _react.default.createElement(_col.default, null, columns.map(function (column) {
        var _formComponentProps;

        var parentValue = column.parentColumn ? (0, _get2.default)(value, column.parentColumn.getFormKey()) : null;
        var columnValue = (0, _get2.default)(value, column.getFormKey());
        var params = {
          user: user,
          value: columnValue,
          values: value,
          parentValue: parentValue,
          formComponentProps: (_formComponentProps = {
            disabled: disabled || column.isImmutableInForm({
              user: user,
              value: columnValue,
              values: value
            })
          }, (0, _defineProperty2.default)(_formComponentProps, column.getFormFiledValuePropName(), (0, _get2.default)(value, column.getFormKey())), (0, _defineProperty2.default)(_formComponentProps, "onChange", function onChange(newValue) {
            return _this2.onChange({
              column: column,
              index: index,
              value: newValue && newValue.target ? newValue.target.value : newValue
            });
          }), _formComponentProps)
        };
        var children;

        if (column.shouldRenderCommonFormItem(parentValue)) {
          children = column.renderCommonFormItem(params);
        } else if (column.getFormRenderInFormItem) {
          children = column.getFormRenderInFormItem(params);
        }

        return _react.default.createElement(_row.default, {
          key: column.getFormKey(),
          type: "flex",
          align: "middle",
          className: "dynamic-item"
        }, _react.default.createElement("span", {
          className: "dynamic-item-title"
        }, column.getTitle()), _react.default.createElement("div", {
          className: "dynamic-item-form-item"
        }, children || column.renderInFormItem(params)));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          value = _this$props5.value,
          max = _this$props5.max,
          disabled = _this$props5.disabled;
      return _react.default.createElement(_col.default, null, (0, _size2.default)(value) > 0 && (0, _map2.default)(value, function (v, i) {
        return _react.default.createElement(_card.default, {
          key: i,
          className: "dynamic-item-card"
        }, _react.default.createElement(_popconfirm.default, {
          title: "\u786E\u8BA4\u5220\u9664\u8BE5\u9879?",
          placement: "left",
          disabled: disabled,
          onConfirm: function onConfirm() {
            return _this3.remove(i);
          },
          getPopupContainer: function getPopupContainer(triggerNode) {
            return triggerNode.parentNode;
          }
        }, _react.default.createElement(_button.default, {
          icon: "close",
          shape: "circle",
          className: "dynamic-delete-button",
          disabled: disabled
        })), _this3.renderFormItems({
          value: v,
          index: i
        }));
      }), _react.default.createElement(_button.default, {
        type: "dashed",
        className: "dynamic-add-button",
        onClick: this.add,
        disabled: disabled || (0, _size2.default)(value) > max
      }, _react.default.createElement(_icon.default, {
        type: "plus"
      }), "\u6DFB\u52A0"));
    }
  }]);
  return DynamicItem;
}(_react.default.PureComponent);

exports.default = DynamicItem;
(0, _defineProperty2.default)(DynamicItem, "displayName", 'DynamicItem');
(0, _defineProperty2.default)(DynamicItem, "propTypes", {
  columns: _propTypes.default.instanceOf(_immutable.default.List).isRequired,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  onChange: _propTypes.default.func,
  value: _propTypes.default.array,
  max: _propTypes.default.number,
  disabled: _propTypes.default.bool
});
(0, _defineProperty2.default)(DynamicItem, "defaultProps", {
  max: 99,
  user: null,
  disabled: false
});