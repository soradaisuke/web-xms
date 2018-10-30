"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/avatar/style");

var _avatar = _interopRequireDefault(require("antd/lib/avatar"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _ClickableDiv2 = _interopRequireDefault(require("react-core/lib/ClickableDiv"));

var _generateUri2 = _interopRequireDefault(require("web-core/lib/generateUri"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

require("./User.less");

function onClickLogOut() {
  _jsCookie.default.remove('sso_token', {
    path: '',
    domain: '.qingtingfm.com'
  });

  window.location.replace((0, _generateUri2.default)('//entry.qingtingfm.com/v1/sso/login.html', {
    return_url: (0, _generateUri2.default)(window.location.href, {
      auth: 1
    })
  }).href);
}

var menu = _react.default.createElement(_menu.default, null, _react.default.createElement(_menu.default.Item, null, _react.default.createElement(_ClickableDiv2.default, {
  onClick: onClickLogOut
}, "\u9000\u51FA\u767B\u5F55")));

var User = function (_React$PureComponent) {
  (0, _inherits2.default)(User, _React$PureComponent);

  function User() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, User);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(User)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickLogOut", function () {});
    return _this;
  }

  (0, _createClass2.default)(User, [{
    key: "render",
    value: function render() {
      var user = this.props.user;

      if (!user) {
        return null;
      }

      return _react.default.createElement(_dropdown.default, {
        overlay: menu
      }, _react.default.createElement("div", {
        className: "user-wrapper"
      }, _react.default.createElement(_avatar.default, {
        className: "avatar",
        src: user.get('avatar'),
        icon: "user"
      }), user.get('nickname'), _react.default.createElement(_icon.default, {
        type: "down"
      })));
    }
  }]);
  return User;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(User, "propTypes", {
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(User, "defaultProps", {
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(User);

exports.default = _default;