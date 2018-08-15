"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          _this.props.onOk(_this.props.record.id, values);

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
    key: "render",
    value: function render() {
      var activator = this.props.activator;
      return _react.default.createElement("span", null, _react.default.createElement("span", {
        role: "button",
        onClick: this.showModelHandler
      }, activator), this.state.visible && _react.default.createElement(_modal.default, {
        title: this.props.record.id ? '编辑' : '添加',
        visible: this.state.visible,
        onOk: this.onOk,
        onCancel: this.hideModelHandler
      }, _react.default.createElement(_form.default, {
        horizontal: "true",
        onSubmit: this.okHandler
      })));
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
  onOk: _propTypes.default.func.isRequired
});

var _default = _form.default.create()(RecordModal);

exports.default = _default;