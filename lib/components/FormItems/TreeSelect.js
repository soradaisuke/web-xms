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

require("antd/lib/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generateTreeData = _interopRequireDefault(require("../../utils/generateTreeData"));

require("./TreeSelect.less");

var XMSTreeSelect = function (_React$PureComponent) {
  (0, _inherits2.default)(XMSTreeSelect, _React$PureComponent);

  function XMSTreeSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, XMSTreeSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(XMSTreeSelect).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSearch", (0, _debounce2.default)(function (value) {
      if (value === '') {
        return;
      }

      var _this$props = _this.props,
          column = _this$props.column,
          parentValue = _this$props.parentValue;
      var radioValue = _this.state.radioValue;
      var searchRequest = column.getFormSearchRequest();

      if (searchRequest) {
        searchRequest({
          value: value,
          parentValue: parentValue,
          radioValue: radioValue
        }).then(function (filters) {
          return _this.setState({
            treeData: (0, _generateTreeData.default)(filters)
          });
        });
      }
    }, 500));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (e) {
      _this.setState({
        radioValue: e.target.value
      });
    });
    var _column = _this.props.column;

    var radioOptions = _column.getFormRadioOptions();

    var defaultOption = radioOptions.find(function (option) {
      return option.get('default');
    });

    if (defaultOption) {
      _this.state = {
        radioValue: defaultOption.get('value')
      };
    } else {
      _this.state = {};
    }

    return _this;
  }

  (0, _createClass2.default)(XMSTreeSelect, [{
    key: "renderRadioOptions",
    value: function renderRadioOptions() {
      var column = this.props.column;
      var radioValue = this.state.radioValue;
      var radioOptions = column.getFormRadioOptions();

      if (radioOptions && radioOptions.size > 0) {
        return _react.default.createElement(_radio.default.Group, {
          onChange: this.onChange,
          value: radioValue
        }, radioOptions.map(function (option) {
          return _react.default.createElement(_radio.default, {
            key: option.get('value'),
            value: option.get('value')
          }, option.get('text'));
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          column = _this$props2.column,
          parentValue = _this$props2.parentValue,
          value = _this$props2.value,
          treeDataProps = _this$props2.treeData,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["column", "parentValue", "value", "treeData"]);
      var valueOptionsRequest = column.getValueOptionsRequest();
      var treeData = this.state.treeData;

      if (!treeData && !treeDataProps) {
        var filters = column.getFilters(parentValue, 'disableInForm');

        if (filters) {
          treeData = filters ? (0, _generateTreeData.default)(filters) : [];
        } else if (valueOptionsRequest) {
          column.fetchValueOptions(parentValue).then(function () {
            return _this2.forceUpdate();
          }).catch(function () {});
        }
      }

      treeData = treeData || treeDataProps || [];
      return _react.default.createElement(_react.default.Fragment, null, this.renderRadioOptions(), _react.default.createElement(_treeSelect.default, (0, _extends2.default)({
        placeholder: column.getFormPlaceholder(true),
        searchPlaceholder: column.getFormSearchPlaceholder(),
        treeCheckable: column.canSelectMutipleInForm(),
        getPopupContainer: function getPopupContainer(trigger) {
          return trigger.parentNode;
        }
      }, props, {
        className: "xms-tree-select",
        allowClear: true,
        showSearch: true,
        treeData: treeData,
        treeNodeFilterProp: "title",
        filterTreeNode: column.getFormSearchRequest() ? false : null,
        onSearch: this.onSearch
      })));
    }
  }]);
  return XMSTreeSelect;
}(_react.default.PureComponent);

exports.default = XMSTreeSelect;
(0, _defineProperty2.default)(XMSTreeSelect, "propTypes", {
  parentValue: _propTypes.default.any
});
(0, _defineProperty2.default)(XMSTreeSelect, "defaultProps", {
  parentValue: null
});