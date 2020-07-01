"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("antd/lib/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

require("antd/lib/avatar/style");

var _avatar = _interopRequireDefault(require("antd/lib/avatar"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react/lib/ClickableDiv"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _icons = require("@ant-design/icons");

var _dva = require("dva");

require("./User.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var User = function (_React$PureComponent) {
  (0, _inherits2.default)(User, _React$PureComponent);

  var _super = _createSuper(User);

  function User() {
    (0, _classCallCheck2.default)(this, User);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(User, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          user = _this$props.user,
          logout = _this$props.logout;

      if (!user) {
        return null;
      }

      return _react.default.createElement(_dropdown.default, {
        overlay: _react.default.createElement(_menu.default, null, _react.default.createElement(_menu.default.Item, null, _react.default.createElement(_ClickableDiv2.default, {
          onClick: logout
        }, "\u9000\u51FA\u767B\u5F55")))
      }, _react.default.createElement("div", {
        className: "user-wrapper"
      }, _react.default.createElement(_avatar.default, {
        className: "avatar",
        src: user.get('avatar'),
        icon: _react.default.createElement(_icons.UserOutlined, null)
      }), "  ".concat(user.get('nickname'), "  "), _react.default.createElement(_icons.DownOutlined, {
        className: "icon-down"
      })));
    }
  }]);
  return User;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(User, "propTypes", {
  logout: _propTypes.default.func.isRequired,
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

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logout: function () {
      var _logout = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", dispatch({
                  type: 'user/logout'
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  };
};

var _default = (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(User);

exports.default = _default;