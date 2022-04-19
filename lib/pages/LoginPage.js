"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _LockOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/LockOutlined"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _UserOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/UserOutlined"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _queryString = require("query-string");

var _dva = require("dva");

var _showError = _interopRequireDefault(require("../utils/showError"));

require("./LoginPage.less");

function LoginPage() {
  var isLoading = (0, _dva.useSelector)(function (state) {
    return state.loading.effects['user/login'];
  });

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var dispatch = (0, _dva.useDispatch)();
  var onClickLogin = (0, _react.useCallback)(function () {
    form.validateFields().then(function (values) {
      return dispatch({
        type: 'user/login',
        payload: values
      }).then(function () {
        var queries = (0, _queryString.parse)(window.location.search);
        window.location.replace(queries.return_url ? queries.return_url : window.location.origin);
      }).catch(function (e) {
        return (0, _showError.default)(e.message);
      });
    }).catch(function () {});
  }, [dispatch, form]);
  return _react.default.createElement("div", {
    className: "login-form-wrapper"
  }, _react.default.createElement(_form.default, {
    className: "login-form",
    form: form
  }, _react.default.createElement("div", {
    className: "logo"
  }), _react.default.createElement(_form.default.Item, {
    key: "account",
    className: "login-form-item",
    name: "account",
    rules: [{
      required: true,
      message: '请输入账号',
      whitespace: true
    }]
  }, _react.default.createElement(_input.default, {
    prefix: _react.default.createElement(_UserOutlined2.default, {
      style: {
        color: 'rgba(0,0,0,.25)'
      }
    }),
    placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
    className: "login-input-area"
  })), _react.default.createElement(_form.default.Item, {
    key: "password",
    className: "login-form-item",
    name: "password",
    rules: [{
      required: true,
      message: '请输入密码'
    }]
  }, _react.default.createElement(_input.default, {
    type: "password",
    prefix: _react.default.createElement(_LockOutlined2.default, {
      style: {
        color: 'rgba(0,0,0,.25)'
      }
    }),
    className: "login-input-area",
    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
    onPressEnter: onClickLogin
  })), _react.default.createElement(_button.default, {
    type: "danger",
    className: "login-button",
    style: {
      width: '100%'
    },
    onClick: onClickLogin,
    loading: isLoading
  }, "\u767B\u5F55")));
}

var _default = _react.default.memo(LoginPage);

exports.default = _default;