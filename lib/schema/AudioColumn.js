"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _UrlColumn2 = _interopRequireDefault(require("./UrlColumn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AudioColumn = function (_UrlColumn) {
  (0, _inherits2.default)(AudioColumn, _UrlColumn);

  var _super = _createSuper(AudioColumn);

  function AudioColumn() {
    (0, _classCallCheck2.default)(this, AudioColumn);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(AudioColumn, [{
    key: "showPlaybackRate",
    value: function showPlaybackRate() {
      return this.config.getIn(['table', 'showPlaybackRate']);
    }
  }, {
    key: "showChangeProgress",
    value: function showChangeProgress() {
      return this.config.getIn(['table', 'showChangeProgress']);
    }
  }]);
  return AudioColumn;
}(_UrlColumn2.default);

exports.default = AudioColumn;