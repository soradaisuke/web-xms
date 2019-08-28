"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

require("./LoginPage.less");

var _queryString = require("query-string");

var FormItem = _form.default.Item;

var LoginPage = function (_React$PureComponent) {
  (0, _inherits2.default)(LoginPage, _React$PureComponent);

  function LoginPage() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LoginPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LoginPage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "login", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(values) {
        var login, queries;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                login = _this.props.login;
                queries = (0, _queryString.parse)(window.location.search);
                _context.prev = 2;
                _context.next = 5;
                return login(values);

              case 5:
                window.location.replace(queries.return_url ? queries.return_url : window.location.origin);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickLogin", function () {
      var validateFieldsAndScroll = _this.props.form.validateFieldsAndScroll;
      validateFieldsAndScroll(function (err, values) {
        if (!err) {
          _this.login(values);
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(LoginPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getFieldDecorator = _this$props.form.getFieldDecorator,
          isLoading = _this$props.isLoading;
      return _react.default.createElement("div", {
        className: "login-form-wrapper"
      }, _react.default.createElement(_form.default, {
        className: "login-form"
      }, _react.default.createElement("div", {
        className: "logo"
      }), _react.default.createElement(FormItem, {
        key: "account",
        className: "login-form-item"
      }, getFieldDecorator('account', {
        rules: [{
          required: true,
          message: '请输入账号',
          whitespace: true
        }]
      })(_react.default.createElement(_input.default, {
        prefix: _react.default.createElement(_icon.default, {
          type: "user",
          style: {
            color: 'rgba(0,0,0,.25)'
          }
        }),
        placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
        className: "login-input-area"
      }))), _react.default.createElement(FormItem, {
        key: "password",
        className: "login-form-item"
      }, getFieldDecorator('password', {
        rules: [{
          required: true,
          message: '请输入密码'
        }]
      })(_react.default.createElement(_input.default, {
        type: "password",
        prefix: _react.default.createElement(_icon.default, {
          type: "lock",
          style: {
            color: 'rgba(0,0,0,.25)'
          }
        }),
        className: "login-input-area",
        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
        onPressEnter: this.onClickLogin
      }))), _react.default.createElement(_button.default, {
        type: "danger",
        className: "login-button",
        style: {
          width: '100%'
        },
        onClick: this.onClickLogin,
        loading: isLoading
      }, "\u767B\u5F55")));
    }
  }]);
  return LoginPage;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(LoginPage, "displayName", 'LoginPage');
(0, _defineProperty2.default)(LoginPage, "propTypes", {
  login: _propTypes.default.func.isRequired,
  form: _propTypes.default.shape({
    setFields: _propTypes.default.func.isRequired,
    validateFieldsAndScroll: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired
  }).isRequired,
  isLoading: _propTypes.default.bool
});
(0, _defineProperty2.default)(LoginPage, "defaultProps", {
  isLoading: false
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    isLoading: state.loading.effects['user/login']
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    login: function () {
      var _login = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref2) {
        var account, password;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                account = _ref2.account, password = _ref2.password;
                return _context2.abrupt("return", dispatch({
                  type: 'user/login',
                  payload: {
                    account: account,
                    password: password
                  }
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  };
};

var _default = (0, _dva.connect)(mapStateToProps, mapDispatchToProps)(_form.default.create()(LoginPage));

exports.default = _default;