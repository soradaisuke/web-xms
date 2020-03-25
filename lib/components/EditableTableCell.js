"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react-core/lib/ClickableDiv"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _EditableTableRow = require("./EditableTableRow");

var _Column = _interopRequireDefault(require("../schema/Column"));

require("./EditableTableCell.less");

var EditableTableCell = function (_React$PureComponent) {
  (0, _inherits2.default)(EditableTableCell, _React$PureComponent);

  function EditableTableCell() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, EditableTableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EditableTableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      editing: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "toggleEdit", function () {
      var editing = _this.state.editing;

      _this.setState({
        editing: !editing
      }, function () {
        if (!editing && _this.input) {
          _this.input.focus();
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "save", function (e) {
      var submit = _this.props.submit;

      _this.form.validateFields(function (error, values) {
        if (error && error[e.currentTarget.id]) {
          return;
        }

        _this.toggleEdit();

        submit(values);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderCell", function (form) {
      _this.form = form;
      var _this$props = _this.props,
          children = _this$props.children,
          record = _this$props.record,
          column = _this$props.column,
          user = _this$props.user,
          submit = _this$props.submit;
      var editing = _this.state.editing;
      var columnCanEditInTable = column && submit;
      return editing && columnCanEditInTable ? _react.default.createElement(_form.default.Item, {
        style: {
          margin: 0
        }
      }, column.renderInForm({
        form: form,
        record: record,
        user: user,
        hideFormLabel: true,
        isEdit: true,
        formComponentProps: {
          ref: function ref(node) {
            _this.input = node;
          },
          onPressEnter: _this.save,
          onBlur: _this.save
        }
      })) : _react.default.createElement(_ClickableDiv2.default, {
        className: columnCanEditInTable ? 'editable-cell-value-wrap' : 'not-editable-cell',
        onClick: _this.toggleEdit
      }, children);
    });
    return _this;
  }

  (0, _createClass2.default)(EditableTableCell, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          record = _this$props2.record,
          index = _this$props2.index,
          handleSave = _this$props2.handleSave,
          children = _this$props2.children,
          restProps = (0, _objectWithoutProperties2.default)(_this$props2, ["record", "index", "handleSave", "children"]);
      return _react.default.createElement("td", restProps, _react.default.createElement(_EditableTableRow.EditableContext.Consumer, null, this.renderCell));
    }
  }]);
  return EditableTableCell;
}(_react.default.PureComponent);

exports.default = EditableTableCell;
(0, _defineProperty2.default)(EditableTableCell, "displayName", 'EditableTableCell');
(0, _defineProperty2.default)(EditableTableCell, "propTypes", {
  form: _propTypes.default.shape({
    setFields: _propTypes.default.func.isRequired,
    validateFieldsAndScroll: _propTypes.default.func.isRequired,
    getFieldDecorator: _propTypes.default.func.isRequired
  }).isRequired,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  column: _propTypes.default.instanceOf(_Column.default),
  submit: _propTypes.default.func,
  record: _propTypes.default.object
});
(0, _defineProperty2.default)(EditableTableCell, "defaultProps", {
  column: null,
  user: null,
  submit: null,
  record: {}
});