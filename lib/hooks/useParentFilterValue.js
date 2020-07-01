"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParentFilterValue;

var _usePageFilterForm = _interopRequireDefault(require("./usePageFilterForm"));

function useParentFilterValue(column) {
  var _column$parentColumn;

  var form = (0, _usePageFilterForm.default)();
  var parentKey = column === null || column === void 0 ? void 0 : (_column$parentColumn = column.parentColumn) === null || _column$parentColumn === void 0 ? void 0 : _column$parentColumn.getFilterKey();
  return parentKey ? form === null || form === void 0 ? void 0 : form.getFieldValue(parentKey) : null;
}