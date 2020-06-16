"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react/lib/ClickableDiv"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _EditableTableRow = require("./EditableTableRow");

var _Column = _interopRequireDefault(require("../schema/Column"));

require("./EditableTableCell.less");

function EditableTableCell(_ref) {
  var children = _ref.children,
      record = _ref.record,
      column = _ref.column,
      user = _ref.user,
      submit = _ref.submit,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["children", "record", "column", "user", "submit"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      editing = _useState2[0],
      setEditing = _useState2[1];

  var inputRef = (0, _react.useRef)();
  var form = (0, _react.useContext)(_EditableTableRow.EditableContext);
  (0, _react.useEffect)(function () {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  var toggleEdit = (0, _react.useCallback)(function () {
    setEditing(!editing);
  }, [editing, setEditing]);
  var save = (0, _react.useCallback)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
    var values;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return form.validateFields();

          case 3:
            values = _context.sent;
            toggleEdit();
            submit(values);
            _context.next = 10;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  })), [form, submit, toggleEdit]);
  var columnCanEditInTable = (0, _react.useMemo)(function () {
    return form && column && submit && column.canShowInEditFrom({
      user: user,
      record: record
    });
  }, [column, submit, user, record, form]);
  var cell = (0, _react.useMemo)(function () {
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
          inputRef.current = node;
        },
        onPressEnter: save,
        onBlur: save
      }
    })) : _react.default.createElement(_ClickableDiv2.default, {
      className: columnCanEditInTable ? 'editable-cell-value-wrap' : 'not-editable-cell',
      onClick: toggleEdit
    }, children);
  }, [editing, columnCanEditInTable, column, form, record, user, save, toggleEdit, children]);
  return _react.default.createElement("td", restProps, cell);
}

EditableTableCell.propTypes = {
  children: _propTypes.default.node,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  column: _propTypes.default.instanceOf(_Column.default),
  submit: _propTypes.default.func,
  record: _propTypes.default.object
};
EditableTableCell.defaultProps = {
  children: null,
  column: null,
  user: null,
  submit: null,
  record: {}
};

var _default = _react.default.memo(EditableTableCell);

exports.default = _default;