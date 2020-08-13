"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParentFormValue;

var _useForm = _interopRequireDefault(require("./useForm"));

var _useFormListItemPrefix = _interopRequireDefault(require("./useFormListItemPrefix"));

var _getFullFormItemName = _interopRequireDefault(require("../utils/getFullFormItemName"));

function useParentFormValue(column) {
  var form = (0, _useForm.default)();
  var prefix = (0, _useFormListItemPrefix.default)();
  var parentKey = (0, _getFullFormItemName.default)({
    prefix: prefix,
    column: column === null || column === void 0 ? void 0 : column.parentColumn
  });
  return parentKey ? form === null || form === void 0 ? void 0 : form.getFieldValue(parentKey) : null;
}