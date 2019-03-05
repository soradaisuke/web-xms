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

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var CommonArraylikeItems = function (_React$PureComponent) {
  (0, _inherits2.default)(CommonArraylikeItems, _React$PureComponent);

  function CommonArraylikeItems() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CommonArraylikeItems);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CommonArraylikeItems)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "add", function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value;
      onChange((0, _objectSpread4.default)({}, value, (0, _defineProperty2.default)({}, _shortid.default.generate(), '')));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "remove", function (k) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          value = _this$props2.value;
      delete value[k];
      onChange((0, _objectSpread4.default)({}, value));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (k, v) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          value = _this$props3.value;
      onChange((0, _objectSpread4.default)({}, value, (0, _defineProperty2.default)({}, k, v)));
    });
    return _this;
  }

  (0, _createClass2.default)(CommonArraylikeItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          value = _this$props4.value,
          onChange = _this$props4.onChange,
          enableAdd = _this$props4.enableAdd;

      if (!(0, _size2.default)(value) && enableAdd) {
        onChange((0, _defineProperty2.default)({}, _shortid.default.generate(), ''));
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
          enableAdd = _this$props5.enableAdd;
      return _react.default.createElement(_col.default, null, (0, _size2.default)(value) > 0 && (0, _keys2.default)(value).map(function (k) {
        return _react.default.createElement(_row.default, {
          key: k
        }, _react.default.createElement(_input.default, {
          placeholder: placeholder,
          style: style,
          value: value[k],
          onChange: function onChange(e) {
            return _this2.onChange(k, e.target.value);
          }
        }), (0, _size2.default)(value) > 1 && _react.default.createElement(_icon.default, {
          style: {
            fontSize: '18px',
            color: 'rgb(255, 0, 0)'
          },
          type: "minus-circle-o",
          onClick: function onClick() {
            return _this2.remove(k);
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
  return CommonArraylikeItems;
}(_react.default.PureComponent);

exports.default = CommonArraylikeItems;
(0, _defineProperty2.default)(CommonArraylikeItems, "displayName", 'CommonArraylikeItems');
(0, _defineProperty2.default)(CommonArraylikeItems, "propTypes", {
  onChange: _propTypes.default.func,
  value: _propTypes.default.shape({}),
  style: _propTypes.default.shape({}),
  max: _propTypes.default.number,
  placeholder: _propTypes.default.string,
  enableAdd: _propTypes.default.bool
});
(0, _defineProperty2.default)(CommonArraylikeItems, "defaultProps", {
  max: 99,
  style: {
    marginTop: '10px',
    width: '80%',
    marginRight: 8
  },
  placeholder: '请输入一个值',
  enableAdd: true
});