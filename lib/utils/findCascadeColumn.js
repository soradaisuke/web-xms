"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findCascadeColumn;

function findCascadeColumn(columns) {
  if (!columns) return;
  columns.forEach(function (column) {
    var parentKey = column.getParentKey();

    if (parentKey) {
      var parentColumn = columns.find(function (c) {
        return c.getKey() === parentKey;
      });

      if (parentColumn) {
        column.parentColumn = parentColumn;
        parentColumn.childColumn = (parentColumn.childColumn || []).concat(column);
      }
    }
  });
}