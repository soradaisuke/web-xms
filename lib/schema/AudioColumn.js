"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _InlineAudioPlayer = _interopRequireDefault(require("../components/Common/InlineAudioPlayer"));

var _StringColumn2 = _interopRequireDefault(require("./StringColumn"));

var AudioColumn = function (_StringColumn) {
  (0, _inherits2.default)(AudioColumn, _StringColumn);

  function AudioColumn() {
    (0, _classCallCheck2.default)(this, AudioColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AudioColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(AudioColumn, [{
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref) {
      var value = _ref.value;
      return value ? _react.default.createElement(_InlineAudioPlayer.default, {
        showPlaybackRate: this.showPlaybackRate(),
        showChangeProgress: this.showChangeProgress(),
        url: value
      }) : null;
    }
  }, {
    key: "showPlaybackRate",
    value: function showPlaybackRate() {
      return this.config.getIn(['table', 'showPlaybackRate']);
    }
  }, {
    key: "showChangeProgress",
    value: function showChangeProgress() {
      return this.config.getIn(['table', 'showChangeProgress']);
    }
  }, {
    key: "getFormPlaceholder",
    value: function getFormPlaceholder() {
      return this.config.getIn(['form', 'placeHolder']) || "\u8BF7\u8F93\u5165".concat(this.getTitle(), "\u5730\u5740");
    }
  }, {
    key: "getFormDefaultRules",
    value: function getFormDefaultRules() {
      return [{
        type: 'url',
        message: '格式不正确，要求为网络地址'
      }];
    }
  }]);
  return AudioColumn;
}(_StringColumn2.default);

exports.default = AudioColumn;