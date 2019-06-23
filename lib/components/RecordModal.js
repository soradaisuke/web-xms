"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _split2 = _interopRequireDefault(require("lodash/split"));

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var FormItem = _form.default.Item;

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
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
                              _context.next = 9;
                              break;
                            }

                            formatValues = {};
                            (0, _forEach2.default)(schema, function (_ref3) {
                              var key = _ref3.key,
                                  ignoreWhenNotEdit = _ref3.ignoreWhenNotEdit;
                              var newKey = (0, _split2.default)(key, '.')[0];

                              if (ignoreWhenNotEdit && newKey) {
                                (0, _unset2.default)(record, newKey);
                              }
                            });
                            (0, _forEach2.default)(values, function (value, key) {
                              var targetSchema = (0, _find2.default)(schema, {
                                mapKey: key
                              }) || {};
                              var formConfig = targetSchema.form || {};

                              if ((0, _isFunction2.default)(formConfig.generateSubmitValue)) {
                                formatValues[key] = formConfig.generateSubmitValue(value);
                              } else if ((0, _isFunction2.default)(targetSchema.type.formatSubmitValue)) {
                                formatValues[key] = targetSchema.type.formatSubmitValue(value);
                              } else {
                                formatValues[key] = value;
                              }
                            });
                            _context.next = 6;
                            return onOk((0, _objectSpread2.default)({}, record, formatValues));

                          case 6:
                            resolve();
                            _context.next = 10;
                            break;

                          case 9:
                            reject();

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
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
      }, _callee2);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "checkRelevant", function () {
      var _this$props2 = _this.props,
          schema = _this$props2.schema,
          form = _this$props2.form,
          updateModalFilters = _this$props2.updateModalFilters;
      var formFieldsValue = form.getFieldsValue();
      (0, _forEach2.default)(schema, function (_ref4) {
        var childKey = _ref4.childKey;
        return childKey ? updateModalFilters(childKey, formFieldsValue) : null;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onVisibleChange", function () {
      var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(visibility) {
        var form;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                form = _this.props.form;

                if (!visibility) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 4;
                return form.resetFields();

              case 4:
                _this.checkRelevant();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeFormItem", function (v, mapKey, childKey) {
      var _this$props3 = _this.props,
          form = _this$props3.form,
          updateModalFilters = _this$props3.updateModalFilters;
      form.setFieldsValue((0, _defineProperty2.default)({}, childKey, undefined));
      updateModalFilters(childKey, (0, _defineProperty2.default)({}, mapKey, v));
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
    value: function renderFormItem(_ref6) {
      var _this2 = this;

      var key = _ref6.key,
          type = _ref6.type,
          title = _ref6.title,
          user = _ref6.user;
      var _this$props4 = this.props,
          form = _this$props4.form,
          record = _this$props4.record,
          schema = _this$props4.schema;
      var getFieldDecorator = form.getFieldDecorator,
          getFieldsValue = form.getFieldsValue;
      var targetSchema = (0, _find2.default)(schema, {
        key: key
      }) || {};
      var _targetSchema$form = targetSchema.form,
          formConfig = _targetSchema$form === void 0 ? {} : _targetSchema$form,
          _targetSchema$filters = targetSchema.filters,
          filters = _targetSchema$filters === void 0 ? [] : _targetSchema$filters,
          mapKey = targetSchema.mapKey,
          modalFilters = targetSchema.modalFilters,
          childKey = targetSchema.childKey;
      var enable = (0, _isFunction2.default)(formConfig.enable) ? formConfig.enable(getFieldsValue(), record) : true;

      if (!enable) {
        return null;
      }

      var initialValue = this.isEdit() ? type.formatFormValue((0, _get2.default)(record, key)) : type.getFormDefaultInitialValue();

      if ((0, _isFunction2.default)(formConfig.generateInitValue)) {
        initialValue = formConfig.generateInitValue(initialValue);
      }

      var commonEmptyRule = {
        required: !formConfig.optional,
        message: "".concat(title, "\u4E0D\u80FD\u4E3A\u7A7A")
      };

      if (type.canCheckWhiteSpace()) {
        commonEmptyRule.whitespace = !formConfig.optional;
      }

      var children = type.canShowInForm() ? getFieldDecorator(mapKey, (0, _objectSpread2.default)({
        initialValue: initialValue,
        validateFirst: true,
        onChange: childKey ? function (v) {
          return _this2.onChangeFormItem(v, mapKey, childKey);
        } : null,
        rules: [commonEmptyRule].concat(type.getFormRules((0, _objectSpread2.default)({}, formConfig, {
          title: title,
          user: user
        }))).concat(formConfig.rules || [])
      }, type.getFormExtraConfig()))(type.renderFormItem((0, _objectSpread2.default)({}, formConfig, {
        title: title,
        user: user,
        filters: modalFilters || filters,
        formFieldValues: getFieldsValue()
      }))) : null;

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
      var _this3 = this;

      var _this$props5 = this.props,
          children = _this$props5.children,
          schema = _this$props5.schema,
          user = _this$props5.user,
          multipleKey = _this$props5.multipleKey;
      var targetSchema = multipleKey ? schema.filter(function (_ref7) {
        var mapKey = _ref7.mapKey;
        return mapKey === multipleKey;
      }) : schema.filter(function (_ref8) {
        var visibility = _ref8.visibility;
        return _this3.isEdit() && visibility.edit || !_this3.isEdit() && visibility.create;
      });
      return _react.default.createElement(_ActivatorModal.default, {
        activator: children,
        title: this.isEdit() || multipleKey ? '编辑' : '添加',
        onOk: this.onOk,
        onVisibleChange: this.onVisibleChange
      }, _react.default.createElement(_form.default, {
        onSubmit: this.okHandler
      }, targetSchema.map(function (definition) {
        return _this3.renderFormItem((0, _objectSpread2.default)({
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
  updateModalFilters: _propTypes.default.func.isRequired,
  record: _propTypes.default.object.isRequired,
  schema: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    visibility: _propTypes.default.shape({
      create: _propTypes.default.bool,
      edit: _propTypes.default.bool
    })
  })).isRequired,
  onOk: _propTypes.default.func.isRequired,
  multipleKey: _propTypes.default.string,
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordModal, "defaultProps", {
  multipleKey: '',
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(_form.default.create()(RecordModal));

exports.default = _default;