"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOk", function () {
      var _this$props = _this.props,
          form = _this$props.form,
          record = _this$props.record,
          onOk = _this$props.onOk;
      form.validateFields(function (err, values) {
        if (!err) {
          onOk((0, _objectSpread2.default)({}, record, values));

          _this.hideModelHandler();
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "showModelHandler", function (e) {
      if (e) {
        e.stopPropagation();
      }

      _this.setState({
        visible: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hideModelHandler", function () {
      _this.setState({
        visible: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(RecordModal, [{
    key: "isEdit",
    value: function isEdit() {
      var id = this.props.record.id;
      return !!id;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref) {
      var key = _ref.key,
          type = _ref.type,
          title = _ref.title;
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
          activator = _this$props3.activator,
          schema = _this$props3.schema;
      var visible = this.state.visible;
      return _react.default.createElement("span", null, _react.default.createElement("span", {
        role: "button",
        tabIndex: 0,
        onClick: this.showModelHandler,
        onKeyPress: this.showModelHandler
      }, activator), visible && _react.default.createElement(_modal.default, {
        title: this.isEdit() ? '编辑' : '添加',
        visible: visible,
        onOk: this.onOk,
        onCancel: this.hideModelHandler
      }, _react.default.createElement(_form.default, {
        onSubmit: this.okHandler
      }, schema.filter(function (_ref2) {
        var visibility = _ref2.visibility;
        return _this2.isEdit() && visibility.edit || !_this2.isEdit() && visibility.create;
      }).map(function (definition) {
        return _this2.renderFormItem((0, _objectSpread2.default)({}, definition));
      }))));
    }
  }]);
  return RecordModal;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordModal, "displayName", 'RecordModal');
(0, _defineProperty2.default)(RecordModal, "propTypes", {
  activator: _propTypes.default.node.isRequired,
  form: _propTypes.default.shape({
    validateFields: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired
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