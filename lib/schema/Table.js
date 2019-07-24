"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _immutable = _interopRequireDefault(require("immutable"));

var Table = function () {
  function Table() {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, Table);
    this.columns = _immutable.default.List(columns);
    this.findPrimaryKey();
    this.findDefaultSortOrder();
    this.findFixedSortOrder();
    this.findDefaultFilter();
    this.findCascadeColumn();
    this.calculateScrollWidth();
  }

  (0, _createClass2.default)(Table, [{
    key: "findPrimaryKey",
    value: function findPrimaryKey() {
      var primaryColumn = this.columns.find(function (column) {
        return column.isPrimaryKey();
      });

      if (this.columns.size > 0 && !primaryColumn) {
        console.error('missing primary key');
      } else {
        this.primaryKey = primaryColumn.getKey();
      }
    }
  }, {
    key: "findDefaultSortOrder",
    value: function findDefaultSortOrder() {
      var column = this.columns.find(function (c) {
        return !!c.getTableDefaultSortOrder();
      });

      if (column) {
        this.defaultSortOrder = "".concat(column.getKey(), " ").concat(column.getTableDefaultSortOrder().replace('end', ''));
      }
    }
  }, {
    key: "findFixedSortOrder",
    value: function findFixedSortOrder() {
      var column = this.columns.find(function (c) {
        return !!c.getTableFixedSortOrder();
      });

      if (column) {
        this.fixedSortOrder = "".concat(column.getKey(), " ").concat(column.getTableFixedSortOrder().replace('end', ''));
      }
    }
  }, {
    key: "findDefaultFilter",
    value: function findDefaultFilter() {
      var _this = this;

      this.columns.forEach(function (column) {
        var valueOptions = (column.getValueOptions() || _immutable.default.List()).filter(function (option) {
          return option.get('default');
        });

        if (valueOptions.size > 0) {
          _this.defaultFilter = _this.defaultFilter || {};
          _this.defaultFilter[column.getTableFilterKey()] = column.canFilterMultipleInTable() ? valueOptions.map(function (option) {
            return option.get('value');
          }).toArray() : valueOptions.getIn([0, 'value']);
        }
      });
    }
  }, {
    key: "findCascadeColumn",
    value: function findCascadeColumn() {
      var _this2 = this;

      this.columns.forEach(function (column) {
        var parentKey = column.getParentKey();

        if (parentKey) {
          var parentColumn = _this2.columns.find(function (c) {
            return c.getKey() === parentKey;
          });

          if (parentColumn) {
            column.parentColumn = parentColumn;
            parentColumn.childColumn = column;
          }
        }
      });
    }
  }, {
    key: "calculateScrollWidth",
    value: function calculateScrollWidth() {
      var scrollWidth = 0;
      this.columns.forEach(function (c) {
        if (c.getTableWidth() > 0) {
          scrollWidth += c.getTableWidth();
        }
      });
      this.scrollWidth = scrollWidth > 0 ? scrollWidth * 1.2 : 0;
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return this.columns;
    }
  }, {
    key: "getPrimaryKey",
    value: function getPrimaryKey() {
      return this.primaryKey;
    }
  }, {
    key: "getDefaultSortOrder",
    value: function getDefaultSortOrder() {
      return this.defaultSortOrder;
    }
  }, {
    key: "getFixedSortOrder",
    value: function getFixedSortOrder() {
      return this.fixedSortOrder;
    }
  }, {
    key: "getDefaultFilter",
    value: function getDefaultFilter() {
      return this.defaultFilter;
    }
  }, {
    key: "getScrollWidth",
    value: function getScrollWidth() {
      return this.scrollWidth;
    }
  }]);
  return Table;
}();

exports.default = Table;