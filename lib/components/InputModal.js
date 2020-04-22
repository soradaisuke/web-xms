"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _makeCancelablePromise2 = _interopRequireDefault(require("@qt/web-core/lib/makeCancelablePromise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var FormItem = _form.default.Item;
var TextArea = _input.default.TextArea;

var InputModal = function (_React$PureComponent) {
  (0, _inherits2.default)(InputModal, _React$PureComponent);

  function InputModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, InputModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InputModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.onOkHandler = (0, _makeCancelablePromise2.default)(new Promise(function (resolve, reject) {
                var _this$props = _this.props,
                    form = _this$props.form,
                    onOk = _this$props.onOk;
                form.validateFields(function (err, _ref2) {
                  var input = _ref2.input;

                  if (!err) {
                    resolve(onOk(input));
                  }

                  reject(err);
                });
              }));
              _context.next = 3;
              return _this.onOkHandler;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onVisibleChange", function () {
      var form = _this.props.form;
      form.resetFields(['input']);
    });
    return _this;
  }

  (0, _createClass2.default)(InputModal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.onOkHandler) {
        this.onOkHandler.cancel();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          activator = _this$props2.activator,
          title = _this$props2.title,
          form = _this$props2.form,
          required = _this$props2.required;
      return _react.default.createElement(_ActivatorModal.default, {
        activator: activator,
        title: title,
        onOk: this.onOk,
        onVisibleChange: this.onVisibleChange
      }, _react.default.createElement(_form.default, null, _react.default.createElement(FormItem, {
        key: "input"
      }, form.getFieldDecorator('input', {
        initialValue: '',
        rules: [{
          required: required,
          message: '输入不能为空',
          whitespace: true
        }]
      })(_react.default.createElement(TextArea, {
        autosize: true,
        placeholder: "\u8BF7\u8F93\u5165"
      })))));
    }
  }]);
  return InputModal;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(InputModal, "displayName", 'InputModal');
(0, _defineProperty2.default)(InputModal, "propTypes", (0, _objectSpread2.default)({}, _ActivatorModal.default.propTypes, {
  form: _propTypes.default.shape({
    validateFields: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired,
    setFieldsValue: _propTypes.default.func.isRequired
  }).isRequired,
  required: _propTypes.default.bool
}));
(0, _defineProperty2.default)(InputModal, "defaultProps", {
  required: true
});

var _default = _form.default.create()(InputModal);

exports.default = _default;