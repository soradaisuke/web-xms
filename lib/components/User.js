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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react-core/lib/ClickableDiv"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

require("./User.less");

function onClickLogOut() {
  if (window.location.host.indexOf('qingtingfm.com') === -1) {
    _jsCookie.default.remove('sso_token', {
      domain: '.qingtingfm.com'
    });
  } else {
    _jsCookie.default.remove('sso_token', {
      domain: '.qingting.fm'
    });
  }

  window.location.reload();
}

var menu = _react.default.createElement(_menu.default, null, _react.default.createElement(_menu.default.Item, null, _react.default.createElement(_ClickableDiv2.default, {
  onClick: onClickLogOut
}, "\u9000\u51FA\u767B\u5F55")));

var User = function (_React$PureComponent) {
  (0, _inherits2.default)(User, _React$PureComponent);

  function User() {
    (0, _classCallCheck2.default)(this, User);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(User).apply(this, arguments));
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