"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/slider/style");

var _slider = _interopRequireDefault(require("antd/lib/slider"));

var _SoundOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/SoundOutlined"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _CaretRightOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/CaretRightOutlined"));

var _PauseOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/PauseOutlined"));

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react/lib/ClickableDiv"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatDuration = _interopRequireDefault(require("../../utils/formatDuration"));

require("./AudioPlayer.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AudioPlayer = function (_React$PureComponent) {
  (0, _inherits2.default)(AudioPlayer, _React$PureComponent);

  var _super = _createSuper(AudioPlayer);

  function AudioPlayer() {
    var _this;

    (0, _classCallCheck2.default)(this, AudioPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      playing: false,
      volume: 1.0,
      played: 0,
      playbackRate: 1.0,
      seekTo: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pause", function () {
      _this.setState({
        playing: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setVolume", function (value) {
      _this.setState({
        volume: value / 100
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setPlaybackRate", function (v) {
      _this.setState({
        playbackRate: v
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSeekStart", function () {
      _this.addEventListeners();

      _this.setState({
        seeking: true,
        playing: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSeekEnd", function () {
      _this.removeEventListenrs();

      _this.setState({
        seeking: false,
        playing: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onProgress", function (state) {
      _this.setState(state);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSeek", function (seconds) {
      _this.setState({
        seekTo: seconds
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeProgress", function (e) {
      _this.player.seekTo(_this.getProgressByEvent(e));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEnded", function () {
      var loop = _this.props.loop;

      _this.setState({
        playing: loop
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ref", function (player) {
      _this.player = player;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickableRef", function (el) {
      _this.el = el;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickPlay", function () {
      var playing = _this.state.playing;

      _this.setState({
        playing: !playing
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeRate", function (e) {
      _this.setPlaybackRate(e.target.value);
    });
    return _this;
  }

  (0, _createClass2.default)(AudioPlayer, [{
    key: "getProgressByEvent",
    value: function getProgressByEvent(event) {
      var progress = (event.pageX - this.el.getBoundingClientRect().left) / this.el.offsetWidth;
      progress = Math.max(0, progress);
      progress = Math.min(1, progress);
      return progress;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      window.addEventListener('mouseup', this.onSeekEnd);
      window.addEventListener('mousemove', this.onChangeProgress);
    }
  }, {
    key: "removeEventListenrs",
    value: function removeEventListenrs() {
      window.removeEventListener('mouseup', this.onSeekEnd);
      window.removeEventListener('mousemove', this.onChangeProgress);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          url = _this$props.url,
          className = _this$props.className,
          loop = _this$props.loop,
          showPlaybackRate = _this$props.showPlaybackRate,
          showVolume = _this$props.showVolume,
          playbackRates = _this$props.playbackRates;
      var _this$state = this.state,
          playing = _this$state.playing,
          volume = _this$state.volume,
          played = _this$state.played,
          seekTo = _this$state.seekTo,
          seeking = _this$state.seeking,
          playbackRate = _this$state.playbackRate,
          playedSeconds = _this$state.playedSeconds;
      var duration = this.player && this.player.getDuration() ? this.player.getDuration() : 0;
      var currentPlayed = seeking && duration && seekTo ? seekTo / duration : played;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('audio-player-wrapper', className)
      }, _react.default.createElement(_reactPlayer.default, {
        ref: this.ref,
        height: "0",
        width: "0",
        url: url,
        playing: playing,
        loop: loop,
        playbackRate: playbackRate,
        volume: volume,
        onEnded: this.onEnded,
        onProgress: this.onProgress,
        onSeek: this.onSeek
      }), _react.default.createElement(_ClickableDiv2.default, {
        className: "audio-player-progress",
        onClick: this.onChangeProgress,
        onNodeRef: this.onClickableRef
      }, _react.default.createElement("div", {
        className: "audio-player-rail"
      }), _react.default.createElement("div", {
        className: "audio-player-track",
        style: {
          width: "".concat(currentPlayed * 100, "%")
        }
      }), _react.default.createElement("button", {
        "aria-label": "Seek",
        type: "button",
        className: "audio-player-handle",
        style: {
          left: "".concat(currentPlayed * 100, "%")
        },
        onMouseDown: this.onSeekStart
      })), _react.default.createElement("div", {
        className: "audio-player-controls"
      }, _react.default.createElement(_button.default, {
        type: playing ? '' : 'primary',
        shape: "circle",
        onClick: this.onClickPlay,
        icon: playing ? _react.default.createElement(_PauseOutlined2.default, null) : _react.default.createElement(_CaretRightOutlined2.default, null)
      }), _react.default.createElement("div", {
        className: "audio-player-duration"
      }, (0, _formatDuration.default)({
        seconds: playedSeconds
      }), "/", (0, _formatDuration.default)({
        seconds: duration
      })), showPlaybackRate && _react.default.createElement(_radio.default.Group, {
        value: playbackRate,
        onChange: this.onChangeRate,
        buttonStyle: "solid",
        className: "audio-player-rates"
      }, playbackRates.map(function (v) {
        return _react.default.createElement(_radio.default.Button, {
          key: v,
          value: v
        }, "".concat(v, "x"));
      })), showVolume && _react.default.createElement("div", {
        className: "audio-player-sound"
      }, _react.default.createElement(_button.default, {
        size: "small",
        shape: "circle",
        icon: _react.default.createElement(_SoundOutlined2.default, null)
      }), _react.default.createElement(_slider.default, {
        className: "audio-player-sound-slider",
        defaultValue: volume * 100,
        onChange: this.setVolume
      }))));
    }
  }]);
  return AudioPlayer;
}(_react.default.PureComponent);

exports.default = AudioPlayer;
(0, _defineProperty2.default)(AudioPlayer, "displayName", 'AudioPlayer');
(0, _defineProperty2.default)(AudioPlayer, "propTypes", {
  playbackRates: _propTypes.default.arrayOf(_propTypes.default.number),
  url: _propTypes.default.string,
  loop: _propTypes.default.bool,
  showPlaybackRate: _propTypes.default.bool,
  showVolume: _propTypes.default.bool,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(AudioPlayer, "defaultProps", {
  playbackRates: [1, 1.25, 1.5, 2],
  url: '',
  className: '',
  loop: false,
  showPlaybackRate: true,
  showVolume: true
});