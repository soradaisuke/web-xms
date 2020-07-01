"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ClickableDiv2 = _interopRequireDefault(require("@qt/react/lib/ClickableDiv"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _EditableTableRow = require("./EditableTableRow");

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _usePageConfig2 = _interopRequireDefault(require("../../hooks/usePageConfig"));

var _useUser = _interopRequireDefault(require("../../hooks/useUser"));

var _StringColumn = _interopRequireDefault(require("../../schema/StringColumn"));

var _NumberColumn = _interopRequireDefault(require("../../schema/NumberColumn"));

var _useActionConfig2 = _interopRequireDefault(require("../../hooks/useActionConfig"));

var _FormItem = _interopRequireDefault(require("../Form/FormItem"));

require("./EditableTableCell.less");

function EditableCell(_ref) {
  var children = _ref.children,
      record = _ref.record,
      column = _ref.column,
      onComplete = _ref.onComplete;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      editing = _useState2[0],
      setEditing = _useState2[1];

  var editor = (0, _react.useRef)();
  var form = (0, _react.useContext)(_EditableTableRow.EditableContext);
  var user = (0, _useUser.default)();
  var value = (0, _get2.default)(record, column.getKey());

  var _usePageConfig = (0, _usePageConfig2.default)(),
      table = _usePageConfig.table;

  var _useActionConfig = (0, _useActionConfig2.default)({
    action: table.getEditAction(),
    record: record,
    onComplete: onComplete
  }),
      disabled = _useActionConfig.disabled,
      onOk = _useActionConfig.onOk;

  (0, _react.useEffect)(function () {
    if (editing && editor.current) {
      editor.current.focus();
    }
  }, [editing]);
  var toggleEdit = (0, _useEventCallback2.default)(function () {
    setEditing(function (pre) {
      return !pre;
    });
    form.setFieldsValue((0, _defineProperty2.default)({}, column.getFormKey(), (0, _get2.default)(record, column.getFormKey())));
  }, []);
  var onFormItemRef = (0, _useEventCallback2.default)(function (node) {
    editor.current = node;
  }, [editor]);
  var save = (0, _useEventCallback2.default)((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
    var body;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return form.validateFields();

          case 3:
            body = _context.sent;
            toggleEdit();
            onOk({
              data: {
                body: body
              }
            });
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
  })), [form, column, toggleEdit, onOk]);

  if (disabled || !column.canEdit({
    user: user,
    value: value,
    values: record,
    record: record
  })) {
    return children;
  }

  if (column instanceof _StringColumn.default || column instanceof _NumberColumn.default) {
    if (editing) {
      return _react.default.createElement(_FormItem.default, {
        isEdit: true,
        hideLabel: true,
        column: column,
        formItemComponentProps: {
          ref: onFormItemRef,
          onPressEnter: save,
          onBlur: save
        }
      });
    }

    return _react.default.createElement(_ClickableDiv2.default, {
      className: "editable-cell-value-wrap",
      onClick: toggleEdit
    }, children);
  }

  return children;
}

EditableCell.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default),
  onComplete: _propTypes.default.func,
  children: _propTypes.default.any,
  record: _propTypes.default.object
};
EditableCell.defaultProps = {
  column: null,
  onComplete: null,
  children: null,
  record: {}
};

var _default = _react.default.memo(EditableCell);

exports.default = _default;