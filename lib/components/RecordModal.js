"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var FormItem = _form.default.Item;
var STRING = _DataType.default.STRING,
    NUMBER = _DataType.default.NUMBER,
    URL = _DataType.default.URL;

var RecordModal = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordModal, _React$PureComponent);

  function RecordModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RecordModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RecordModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOk", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _this$props, form, record, onOk;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props = _this.props, form = _this$props.form, record = _this$props.record, onOk = _this$props.onOk;
              _context2.next = 3;
              return new Promise(function (resolve) {
                form.validateFields(function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(err, values) {
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (err) {
                              _context.next = 3;
                              break;
                            }

                            _context.next = 3;
                            return onOk((0, _objectSpread2.default)({}, record, values));

                          case 3:
                            resolve();

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onVisibleChange", function (visibility) {
      var form = _this.props.form;

      if (visibility) {
        form.resetFields();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(RecordModal, [{
    key: "isEdit",
    value: function isEdit() {
      var record = this.props.record;
      return record && Object.keys(record).length > 0;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref3) {
      var key = _ref3.key,
          type = _ref3.type,
          title = _ref3.title;
      var _this$props2 = this.props,
          getFieldDecorator = _this$props2.form.getFieldDecorator,
          record = _this$props2.record;
      var children;

      switch (type) {
        case NUMBER:
        case STRING:
        case URL:
          children = getFieldDecorator(key, {
            initialValue: this.isEdit() ? record[key] : '',
            rules: [{
              required: true,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A"),
              whitespace: true,
              type: type
            }]
          })(_react.default.createElement(_input.default, null));
          break;

        default:
          break;
      }

      if (children) {
        return _react.default.createElement(FormItem, {
          key: key,
          label: title
        }, children);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          schema = _this$props3.schema;
      return _react.default.createElement(_ActivatorModal.default, {
        activator: children,
        title: this.isEdit() ? '编辑' : '添加',
        onOk: this.onOk,
        onVisibleChange: this.onVisibleChange
      }, _react.default.createElement(_form.default, {
        onSubmit: this.okHandler
      }, schema.filter(function (_ref4) {
        var visibility = _ref4.visibility;
        return _this2.isEdit() && visibility.edit || !_this2.isEdit() && visibility.create;
      }).map(function (definition) {
        return _this2.renderFormItem((0, _objectSpread2.default)({}, definition));
      })));
    }
  }]);
  return RecordModal;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordModal, "displayName", 'RecordModal');
(0, _defineProperty2.default)(RecordModal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  form: _propTypes.default.shape({
    validateFields: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired,
    resetFields: _propTypes.default.func.isRequired
  }).isRequired,
  record: _propTypes.default.object.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    visibility: _propTypes.default.shape({
      create: _propTypes.default.bool,
      edit: _propTypes.default.bool
    })
  })).isRequired,
  onOk: _propTypes.default.func.isRequired
});

var _default = _form.default.create()(RecordModal);

exports.default = _default;