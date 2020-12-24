"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetChildColumn = resetChildColumn;
exports.resetColumn = resetColumn;
exports.default = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _getFullFormItemName = _interopRequireDefault(require("./getFullFormItemName"));

function resetChildColumn(_ref) {
  var column = _ref.column,
      form = _ref.form,
      forForm = _ref.forForm,
      prefix = _ref.prefix;

  if (column.childColumn) {
    (0, _forEach2.default)(column.childColumn, function (childColumn) {
      form.resetFields([forForm ? (0, _getFullFormItemName.default)({
        prefix: prefix,
        column: childColumn
      }) : childColumn.getFilterKey()]);
      resetColumn({
        column: childColumn,
        form: form,
        forForm: forForm,
        prefix: prefix
      });
    });
  }
}

function resetColumn(_ref2) {
  var column = _ref2.column,
      form = _ref2.form,
      forForm = _ref2.forForm,
      prefix = _ref2.prefix;

  if (!forForm && column.getFilterRequired() && !(0, _isNil2.default)(column.getFilterDefault())) {
    form.setFields([{
      name: column.getFilterKey(),
      value: column.getFilterDefault()
    }]);
  } else {
    form.resetFields([(0, _getFullFormItemName.default)({
      prefix: prefix,
      column: column
    })]);
  }

  resetChildColumn({
    column: column,
    form: form,
    prefix: prefix
  });
}

var _default = {
  resetChildColumn: resetChildColumn,
  resetColumn: resetColumn
};
exports.default = _default;