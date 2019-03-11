"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CommonArray = function (_React$PureComponent) {
  (0, _inherits2.default)(CommonArray, _React$PureComponent);

  function CommonArray() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CommonArray);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CommonArray)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "add", function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          generateValue = _this$props.generateValue;

      if (!value) {
        onChange([generateValue()]);
      } else {
        onChange(value.concat([generateValue()]));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "remove", function (index) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          value = _this$props2.value;
      onChange((0, _remove2.default)(value, function (_, i) {
        return i !== index;
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (index, v) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          value = _this$props3.value,
          generateValue = _this$props3.generateValue;
      onChange(value.map(function (preValue, i) {
        return i === index ? generateValue(preValue, v) : preValue;
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(CommonArray, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          value = _this$props4.value,
          enableAdd = _this$props4.enableAdd;

      if (!(0, _size2.default)(value) && enableAdd) {
        this.add();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          value = _this$props5.value,
          max = _this$props5.max,
          style = _this$props5.style,
          placeholder = _this$props5.placeholder,
          enableAdd = _this$props5.enableAdd,
          renderValue = _this$props5.renderValue;
      return _react.default.createElement(_col.default, null, (0, _size2.default)(value) > 0 && value.map(function (v, i) {
        return _react.default.createElement(_row.default, {
          key: i
        }, _react.default.createElement(_input.default, {
          placeholder: placeholder,
          style: style,
          value: renderValue(v),
          onChange: function onChange(e) {
            return _this2.onChange(i, e.target.value);
          }
        }), (0, _size2.default)(value) > 1 && _react.default.createElement(_icon.default, {
          style: {
            fontSize: '18px',
            color: 'rgb(255, 0, 0)'
          },
          type: "minus-circle-o",
          onClick: function onClick() {
            return _this2.remove(i);
          }
        }));
      }), enableAdd && (0, _size2.default)(value) <= max && _react.default.createElement(_button.default, {
        type: "dashed",
        onClick: this.add,
        style: {
          marginTop: '10px',
          width: '60%'
        }
      }, _react.default.createElement(_icon.default, {
        type: "plus"
      }), "\u6DFB\u52A0"));
    }
  }]);
  return CommonArray;
}(_react.default.PureComponent);

exports.default = CommonArray;
(0, _defineProperty2.default)(CommonArray, "displayName", 'CommonArray');
(0, _defineProperty2.default)(CommonArray, "propTypes", {
  onChange: _propTypes.default.func,
  value: _propTypes.default.arrayOf(_propTypes.default.any),
  generateValue: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  style: _propTypes.default.shape({}),
  max: _propTypes.default.number,
  placeholder: _propTypes.default.string,
  enableAdd: _propTypes.default.bool
});
(0, _defineProperty2.default)(CommonArray, "defaultProps", {
  max: 99,
  style: {
    marginTop: '10px',
    width: '80%',
    marginRight: 8
  },
  placeholder: '请输入一个值',
  enableAdd: true,
  generateValue: function generateValue(_, nextValue) {
    return nextValue || '';
  },
  renderValue: function renderValue(v) {
    return v;
  }
});