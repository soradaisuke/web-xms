"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

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

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _UploadImage = _interopRequireDefault(require("./FormItems/UploadImage"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var _CommonArray = _interopRequireDefault(require("./FormItems/CommonArray"));

var FormItem = _form.default.Item;
var STRING = _DataType.default.STRING,
    NUMBER = _DataType.default.NUMBER,
    URL = _DataType.default.URL,
    ENUM = _DataType.default.ENUM,
    IMAGE = _DataType.default.IMAGE,
    DATE = _DataType.default.DATE,
    DATETIME = _DataType.default.DATETIME,
    ARRAY = _DataType.default.ARRAY;

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
      var _this$props, form, record, onOk, schema;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props = _this.props, form = _this$props.form, record = _this$props.record, onOk = _this$props.onOk, schema = _this$props.schema;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                form.validateFields(function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(err, values) {
                    var formatValues;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (err) {
                              _context.next = 8;
                              break;
                            }

                            formatValues = {};
                            (0, _forEach2.default)(values, function (value, key) {
                              var targetSchema = (0, _find2.default)(schema, {
                                key: key
                              }) || {};
                              var formConfig = targetSchema.form || {};

                              if ((0, _isFunction2.default)(formConfig.generateSubmitValue)) {
                                formatValues[key] = formConfig.generateSubmitValue(value);
                              } else {
                                formatValues[key] = value;
                              }
                            });
                            _context.next = 5;
                            return onOk((0, _objectSpread2.default)({}, record, formatValues));

                          case 5:
                            resolve();
                            _context.next = 9;
                            break;

                          case 8:
                            reject();

                          case 9:
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
          title = _ref3.title,
          user = _ref3.user;
      var _this$props2 = this.props,
          form = _this$props2.form,
          record = _this$props2.record,
          schema = _this$props2.schema;
      var getFieldDecorator = form.getFieldDecorator;
      var targetSchema = (0, _find2.default)(schema, {
        key: key
      }) || {};
      var _targetSchema$form = targetSchema.form,
          formConfig = _targetSchema$form === void 0 ? {} : _targetSchema$form,
          _targetSchema$filters = targetSchema.filters,
          filters = _targetSchema$filters === void 0 ? [] : _targetSchema$filters,
          mapKey = targetSchema.mapKey;
      var enable = (0, _isFunction2.default)(formConfig.enable) ? formConfig.enable(form, record) : true;
      var initialValue = this.isEdit() ? (0, _get2.default)(record, key) : '';

      if ((0, _isFunction2.default)(formConfig.generateInitValue)) {
        initialValue = formConfig.generateInitValue(initialValue);
      } else if (!initialValue && type === ARRAY) {
        initialValue = [];
      }

      var children;

      switch (type) {
        case NUMBER:
        case STRING:
        case URL:
          children = enable ? getFieldDecorator(mapKey, {
            initialValue: initialValue,
            validateFirst: true,
            rules: [type === NUMBER ? {
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
            } : {
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A"),
              whitespace: !formConfig.optional
            }, {
              type: type,
              message: "\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u8981\u6C42\u4E3A".concat(type)
            }].concat(formConfig.rules || [])
          })(type === NUMBER ? _react.default.createElement(_inputNumber.default, {
            placeholder: formConfig && formConfig.placeholder ? formConfig.placeholder : "\u8BF7\u8F93\u5165".concat(title)
          }) : _react.default.createElement(_input.default, {
            placeholder: formConfig && formConfig.placeholder ? formConfig.placeholder : "\u8BF7\u8F93\u5165".concat(title)
          })) : null;
          break;

        case ENUM:
          children = enable ? getFieldDecorator(mapKey, {
            initialValue: initialValue,
            validateFirst: true,
            rules: [{
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
            }].concat(formConfig.rules || [])
          })(_react.default.createElement(_select.default, {
            allowClear: true,
            placeholder: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u9009\u9879",
            getPopupContainer: function getPopupContainer(trigger) {
              return trigger.parentNode;
            }
          }, filters.map(function (op) {
            return _react.default.createElement(_select.default.Option, {
              key: op.value,
              value: op.value
            }, op.text);
          }))) : null;
          break;

        case DATETIME:
        case DATE:
          children = enable ? getFieldDecorator(mapKey, {
            initialValue: initialValue ? (0, _moment.default)(initialValue) : null,
            validateFirst: true,
            rules: [{
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
            }].concat(formConfig.rules || [])
          })(_react.default.createElement(_datePicker.default, {
            showTime: type === DATETIME
          })) : null;
          break;

        case IMAGE:
          children = enable ? getFieldDecorator(mapKey, {
            initialValue: initialValue,
            validateFirst: true,
            valuePropName: 'url',
            rules: [{
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
            }].concat(formConfig.rules || [])
          })(_react.default.createElement(_UploadImage.default, {
            ssoToken: user ? user.get('sso_token') : '',
            title: formConfig.tip
          })) : null;
          break;

        case ARRAY:
          children = enable ? getFieldDecorator(mapKey, {
            initialValue: initialValue,
            validateFirst: true,
            rules: [{
              required: !formConfig.optional,
              message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
            }].concat(formConfig.rules || [])
          })(_react.default.createElement(_CommonArray.default, {
            title: formConfig.tip,
            max: formConfig.max,
            placeholder: formConfig.placeholder,
            enableAdd: formConfig.enableAdd,
            generateValue: formConfig.arrayGenerateValue,
            renderValue: formConfig.arrayRenderValue
          })) : null;
          break;

        default:
          break;
      }

      if (children) {
        return _react.default.createElement(FormItem, {
          key: mapKey,
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
          schema = _this$props3.schema,
          user = _this$props3.user;
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
        return _this2.renderFormItem((0, _objectSpread2.default)({
          user: user
        }, definition));
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
  onOk: _propTypes.default.func.isRequired,
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordModal, "defaultProps", {
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(_form.default.create()(RecordModal));

exports.default = _default;