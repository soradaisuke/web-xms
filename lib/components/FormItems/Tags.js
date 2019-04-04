"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/tag/style");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Tags = function (_React$PureComponent) {
  (0, _inherits2.default)(Tags, _React$PureComponent);

  function Tags() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Tags);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Tags)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      inputValue: '',
      inputVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveInputRef", function (input) {
      _this.input = input;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputChange", function (e) {
      _this.setState({
        inputValue: e.target.value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputConfirm", function () {
      var _this$props = _this.props,
          tags = _this$props.value,
          onChange = _this$props.onChange;
      var inputValue = _this.state.inputValue;

      if (!(0, _trim2.default)(inputValue)) {
        _message2.default.warn('要添加的标签不能为空');

        _this.setState({
          inputVisible: false,
          inputValue: ''
        });
      } else if (tags.indexOf(inputValue) !== -1) {
        _message2.default.warn('要添加的标签已经存在了');
      } else {
        onChange([].concat((0, _toConsumableArray2.default)(tags), [inputValue]));

        _this.setState({
          inputVisible: false,
          inputValue: ''
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showInput", function () {
      _this.setState({
        inputVisible: true
      }, function () {
        return _this.input.focus();
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRemoveTag", function (tag) {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          onChange = _this$props2.onChange;
      onChange(value.filter(function (tagStr) {
        return tag !== tagStr;
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(Tags, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          tags = _this$props3.value,
          max = _this$props3.max,
          style = _this$props3.style;
      var _this$state = this.state,
          inputVisible = _this$state.inputVisible,
          inputValue = _this$state.inputValue;
      return _react.default.createElement(_row.default, {
        type: "flex",
        style: style
      }, tags && tags.length > 0 && tags.map(function (tag) {
        return _react.default.createElement(_tag.default, {
          closable: true,
          key: tag,
          afterClose: function afterClose() {
            return _this2.onRemoveTag(tag);
          }
        }, tag);
      }), inputVisible && _react.default.createElement(_input.default, {
        type: "text",
        size: "small",
        ref: this.saveInputRef,
        style: {
          width: 78
        },
        value: inputValue,
        onChange: this.onInputChange,
        onBlur: this.onInputConfirm,
        onPressEnter: this.onInputConfirm
      }), !inputVisible && tags.length < max && _react.default.createElement(_tag.default, {
        onClick: this.showInput,
        style: {
          background: '#fff',
          borderStyle: 'dashed'
        }
      }, _react.default.createElement(_icon.default, {
        type: "plus"
      }), "\u6DFB\u52A0\u6807\u7B7E"));
    }
  }]);
  return Tags;
}(_react.default.PureComponent);

exports.default = Tags;
(0, _defineProperty2.default)(Tags, "displayName", 'Tags');
(0, _defineProperty2.default)(Tags, "propTypes", {
  onChange: _propTypes.default.func,
  value: _propTypes.default.arrayOf(_propTypes.default.string),
  style: _propTypes.default.shape({}),
  max: _propTypes.default.number
});
(0, _defineProperty2.default)(Tags, "defaultProps", {
  max: 99,
  style: null
});