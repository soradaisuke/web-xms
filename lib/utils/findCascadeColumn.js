"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findCascadeColumn;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

function findCascadeColumn(columns) {
  if (!columns) return;
  columns.forEach(function (column) {
    var parentKey = column.getParentKey();

    if (parentKey) {
      var parentColumn = columns.find(function (c) {
        var _parentKey$toArray, _parentKey$toArray2;

        return (0, _isEqual2.default)(c.getKey(), (_parentKey$toArray = (_parentKey$toArray2 = parentKey.toArray) === null || _parentKey$toArray2 === void 0 ? void 0 : _parentKey$toArray2.call(parentKey)) !== null && _parentKey$toArray !== void 0 ? _parentKey$toArray : parentKey);
      });

      if (parentColumn) {
        column.parentColumn = parentColumn;
        parentColumn.childColumn = (parentColumn.childColumn || []).concat(column);
      }
    }
  });
}