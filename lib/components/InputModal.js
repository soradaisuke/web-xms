"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _webCommon = require("@qt/web-common");

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var FormItem = _form.default.Item;
var TextArea = _input.default.TextArea;

function InputModal(_ref) {
  var activator = _ref.activator,
      title = _ref.title,
      required = _ref.required,
      onOk = _ref.onOk;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var onOkHandler = (0, _react.useRef)();
  var onOkCallback = (0, _react.useCallback)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onOkHandler.current = (0, _webCommon.makeCancelablePromise)(form.validateFields().then(function (_ref3) {
              var input = _ref3.input;
              return onOk(input);
            }));
            _context.next = 3;
            return onOkHandler.current;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form, onOk]);
  var onVisibleChange = (0, _react.useCallback)(function () {
    return form.resetFields(['input']);
  }, [form]);
  (0, _react.useEffect)(function () {
    return function () {
      var _onOkHandler$current;

      return (_onOkHandler$current = onOkHandler.current) === null || _onOkHandler$current === void 0 ? void 0 : _onOkHandler$current.cancel();
    };
  }, []);
  return _react.default.createElement(_ActivatorModal.default, {
    activator: activator,
    title: title,
    onOk: onOkCallback,
    onVisibleChange: onVisibleChange
  }, _react.default.createElement(_form.default, {
    form: form
  }, _react.default.createElement(FormItem, {
    key: "input",
    name: "input",
    initialValue: "",
    rules: [{
      required: required,
      message: '输入不能为空',
      whitespace: true
    }]
  }, _react.default.createElement(TextArea, {
    autosize: true,
    placeholder: "\u8BF7\u8F93\u5165"
  }))));
}

InputModal.propTypes = {
  activator: _propTypes.default.node.isRequired,
  onOk: _propTypes.default.func.isRequired,
  title: _propTypes.default.string,
  required: _propTypes.default.bool
};
InputModal.defaultProps = {
  title: '',
  required: true
};

var _default = _react.default.memo(InputModal);

exports.default = _default;