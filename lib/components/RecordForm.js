"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _showError = _interopRequireDefault(require("../utils/showError"));

var formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    },
    md: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    },
    md: {
      span: 18
    }
  }
};
var tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    },
    md: {
      span: 18,
      offset: 6
    }
  }
};

var generatePaths = function generatePaths(object) {
  var paths = (0, _keys2.default)(object);
  return (0, _reduce2.default)(paths, function (result, key) {
    var value = object[key];

    if ((0, _isPlainObject2.default)(value)) {
      return (0, _concat2.default)(result, (0, _map2.default)(generatePaths(value), function (k) {
        return "".concat(key, ".").concat(k);
      }));
    }

    return (0, _concat2.default)(result, [key]);
  }, []);
};

var RecordForm = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordForm, _React$PureComponent);

  function RecordForm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RecordForm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RecordForm).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(customOnOk) {
        var _this$props, form, onOk, columns;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, form = _this$props.form, onOk = _this$props.onOk, columns = _this$props.columns;
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  form.validateFields(function () {
                    var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(err, values) {
                      var formatValues, hide;
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (err) {
                                _context.next = 24;
                                break;
                              }

                              formatValues = {};
                              (0, _forEach2.default)(generatePaths(values), function (key) {
                                var value = (0, _get2.default)(values, key);
                                var column = columns.find(function (c) {
                                  return c.getFormKey() === key;
                                });

                                if (column) {
                                  var generateSubmitValue = column.getFormGenerateSubmitValue();

                                  if (generateSubmitValue && (0, _isFunction2.default)(generateSubmitValue)) {
                                    (0, _set2.default)(formatValues, key, generateSubmitValue(value));
                                  } else {
                                    (0, _set2.default)(formatValues, key, column.formatFormSubmitValue(value));
                                  }
                                }
                              });
                              hide = _message2.default.loading('保存中...', 0);
                              _context.prev = 4;

                              if (!(0, _isFunction2.default)(customOnOk)) {
                                _context.next = 10;
                                break;
                              }

                              _context.next = 8;
                              return customOnOk(formatValues);

                            case 8:
                              _context.next = 12;
                              break;

                            case 10:
                              _context.next = 12;
                              return onOk(formatValues);

                            case 12:
                              _context.next = 19;
                              break;

                            case 14:
                              _context.prev = 14;
                              _context.t0 = _context["catch"](4);
                              hide();
                              (0, _showError.default)(_context.t0.message);
                              resolve(false);

                            case 19:
                              hide();

                              _message2.default.success('保存成功');

                              resolve(true);
                              _context.next = 25;
                              break;

                            case 24:
                              reject();

                            case 25:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[4, 14]]);
                    }));

                    return function (_x2, _x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "reset", function () {
      var form = _this.props.form;
      return form.resetFields();
    });

    if (props.columns) {
      props.columns.forEach(function (column) {
        return column.resetFilters();
      });
    }

    return _this;
  }

  (0, _createClass2.default)(RecordForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onRef = this.props.onRef;

      if ((0, _isFunction2.default)(onRef)) {
        onRef(this);
      }
    }
  }, {
    key: "isEdit",
    value: function isEdit() {
      var _this$props2 = this.props,
          record = _this$props2.record,
          records = _this$props2.records;
      return record && Object.keys(record).length > 0 || records && records.length > 0;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(column) {
      var _this$props3 = this.props,
          user = _this$props3.user,
          form = _this$props3.form,
          record = _this$props3.record,
          checkVisibility = _this$props3.checkVisibility;
      return column.renderInForm({
        user: user,
        record: record,
        form: form,
        checkVisibility: checkVisibility,
        isEdit: this.isEdit()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          user = _this$props4.user,
          columns = _this$props4.columns,
          record = _this$props4.record,
          form = _this$props4.form,
          renderActions = _this$props4.renderActions,
          className = _this$props4.className;
      var values = form.getFieldsValue();
      return _react.default.createElement(_form.default, (0, _extends2.default)({
        className: className
      }, formItemLayout), columns.map(function (column) {
        return _this2.renderFormItem(column);
      }), renderActions && _react.default.createElement(_form.default.Item, tailFormItemLayout, renderActions({
        user: user,
        record: record,
        values: values,
        form: this
      })));
    }
  }]);
  return RecordForm;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordForm, "displayName", 'RecordForm');
(0, _defineProperty2.default)(RecordForm, "propTypes", {
  form: _propTypes.default.shape({
    validateFields: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired,
    resetFields: _propTypes.default.func.isRequired
  }).isRequired,
  onOk: _propTypes.default.func.isRequired,
  renderActions: _propTypes.default.func,
  onRef: _propTypes.default.func,
  className: _propTypes.default.string,
  checkVisibility: _propTypes.default.bool,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  columns: _propTypes.default.instanceOf(_immutable.default.List),
  record: _propTypes.default.object,
  records: _propTypes.default.array
});
(0, _defineProperty2.default)(RecordForm, "defaultProps", {
  className: '',
  onRef: null,
  checkVisibility: true,
  columns: _immutable.default.List(),
  renderActions: null,
  record: null,
  records: null,
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(_form.default.create()(RecordForm));

exports.default = _default;