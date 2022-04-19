"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/es/progress/style");

var _progress = _interopRequireDefault(require("antd/lib/progress"));

var _CaretRightOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/CaretRightOutlined"));

var _PauseOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/PauseOutlined"));

var _PlusOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/PlusOutlined"));

var _MinusOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/MinusOutlined"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _dva = require("dva");

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

require("./InlineAudioPlayer.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ButtonGroup = _button.default.Group;

var InlineAudioPlayer = function (_React$PureComponent) {
  (0, _inherits2.default)(InlineAudioPlayer, _React$PureComponent);

  var _super = _createSuper(InlineAudioPlayer);

  function InlineAudioPlayer() {
    var _this;

    (0, _classCallCheck2.default)(this, InlineAudioPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      played: 0,
      playbackRate: 1.0,
      id: _shortid.default.generate()
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setPlaybackRate", function (v) {
      _this.setState({
        playbackRate: v
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onProgress", function (state) {
      _this.setState(state);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEnded", function () {
      var _this$props = _this.props,
          loop = _this$props.loop,
          changePlayedAudio = _this$props.changePlayedAudio;

      if (!loop) {
        changePlayedAudio('');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ref", function (player) {
      _this.player = player;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickableRef", function (el) {
      _this.el = el;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickPlay", function () {
      var _this$props2 = _this.props,
          changePlayedAudio = _this$props2.changePlayedAudio,
          id = _this$props2.id;
      var myId = _this.state.id;

      if (id === myId) {
        changePlayedAudio('');
      } else {
        changePlayedAudio(myId);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeRate", function (e) {
      _this.setPlaybackRate(e.target.value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "increase", function () {
      var played = _this.state.played;

      _this.player.seekTo(played + 0.1 < 1 ? played + 0.1 : 0.9999);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "decline", function () {
      var played = _this.state.played;

      _this.player.seekTo(played - 0.1 >= 0 ? played - 0.1 : 0);
    });
    return _this;
  }

  (0, _createClass2.default)(InlineAudioPlayer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          url = _this$props3.url,
          className = _this$props3.className,
          loop = _this$props3.loop,
          showPlaybackRate = _this$props3.showPlaybackRate,
          showChangeProgress = _this$props3.showChangeProgress,
          playbackRates = _this$props3.playbackRates,
          id = _this$props3.id;
      var _this$state = this.state,
          played = _this$state.played,
          playbackRate = _this$state.playbackRate,
          myId = _this$state.id;
      var playing = myId === id;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('inline-audio-player-wrapper', className)
      }, showChangeProgress && _react.default.createElement(ButtonGroup, {
        size: "small"
      }, _react.default.createElement(_button.default, {
        onClick: this.decline,
        icon: _react.default.createElement(_MinusOutlined2.default, null)
      }), _react.default.createElement(_button.default, {
        onClick: this.increase,
        icon: _react.default.createElement(_PlusOutlined2.default, null)
      })), _react.default.createElement(_reactPlayer.default, {
        ref: this.ref,
        height: "0",
        width: "0",
        url: url,
        playing: playing,
        loop: loop,
        playbackRate: playbackRate,
        volume: 1,
        onEnded: this.onEnded,
        onProgress: this.onProgress,
        onSeek: this.onSeek
      }), _react.default.createElement(_progress.default, {
        type: "circle",
        width: 44,
        strokeWidth: 12,
        style: {
          padding: 0
        },
        percent: played * 100,
        format: function format() {
          return _react.default.createElement(_button.default, {
            type: playing ? '' : 'primary',
            shape: "circle",
            onClick: _this2.onClickPlay,
            icon: playing ? _react.default.createElement(_PauseOutlined2.default, null) : _react.default.createElement(_CaretRightOutlined2.default, null)
          });
        }
      }), showPlaybackRate && _react.default.createElement(_radio.default.Group, {
        size: "small",
        value: playbackRate,
        onChange: this.onChangeRate,
        buttonStyle: "solid",
        className: "audio-player-rates"
      }, playbackRates.map(function (v) {
        return _react.default.createElement(_radio.default.Button, {
          key: v,
          value: v
        }, "".concat(v, "x"));
      })));
    }
  }]);
  return InlineAudioPlayer;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(InlineAudioPlayer, "displayName", 'InlineAudioPlayer');
(0, _defineProperty2.default)(InlineAudioPlayer, "propTypes", {
  playbackRates: _propTypes.default.arrayOf(_propTypes.default.number),
  changePlayedAudio: _propTypes.default.func.isRequired,
  id: _propTypes.default.string,
  url: _propTypes.default.string,
  loop: _propTypes.default.bool,
  showPlaybackRate: _propTypes.default.bool,
  showChangeProgress: _propTypes.default.bool,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(InlineAudioPlayer, "defaultProps", {
  id: null,
  playbackRates: [1, 2],
  url: '',
  className: '',
  loop: false,
  showPlaybackRate: false,
  showChangeProgress: false
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    id: state.audio
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changePlayedAudio: function () {
      var _changePlayedAudio = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(id) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", dispatch({
                  type: 'audio/changePlayedAudio',
                  payload: {
                    id: id
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function changePlayedAudio(_x) {
        return _changePlayedAudio.apply(this, arguments);
      }

      return changePlayedAudio;
    }()
  };
};

var _default = (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(InlineAudioPlayer);

exports.default = _default;