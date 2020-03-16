"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _immutable = _interopRequireDefault(require("immutable"));

var Table = function () {
  function Table() {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, Table);
    this.columns = _immutable.default.List(columns);
    this.generateCustomize();
    this.findPrimaryKey();
    this.findDefaultSortOrder();
    this.findFixedSortOrder();
    this.findDefaultFilter();
    this.findCascadeColumn();
    this.calculateScrollWidth({
      selectedCustomizeMap: this.getDefaultSelectedCustomizeMap()
    });
    this.findHasFilter();
  }

  (0, _createClass2.default)(Table, [{
    key: "generateCustomize",
    value: function generateCustomize() {
      var _this = this;

      this.defaultSelectedCustomizeMap = _immutable.default.Map({});
      this.customizeColumns = [];
      this.columns.forEach(function (column) {
        if (column.isCustomize()) {
          _this.defaultSelectedCustomizeMap = _this.defaultSelectedCustomizeMap.set(column.getKey(), column.isCustomizeDefaultSelected());

          _this.customizeColumns.push(column);
        }
      });
    }
  }, {
    key: "getDefaultSelectedCustomizeMap",
    value: function getDefaultSelectedCustomizeMap() {
      return this.defaultSelectedCustomizeMap;
    }
  }, {
    key: "getCustomizeColumns",
    value: function getCustomizeColumns() {
      return this.customizeColumns;
    }
  }, {
    key: "findPrimaryKey",
    value: function findPrimaryKey() {
      var primaryColumn = this.columns.find(function (column) {
        return column.isPrimaryKey();
      });

      if (this.columns.size > 0 && !primaryColumn) {
        console.error('missing primary key');
      } else if (primaryColumn) {
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
      var _this2 = this;

      this.columns.forEach(function (column) {
        var valueOptions = (column.getValueOptions() || _immutable.default.List()).filter(function (option) {
          return option.get('default');
        });

        if (valueOptions.size > 0) {
          _this2.defaultFilter = _this2.defaultFilter || {};
          _this2.defaultFilter[column.getTableFilterKey()] = column.canFilterMultipleInTable() ? valueOptions.map(function (option) {
            return option.get('value');
          }).toArray() : valueOptions.getIn([0, 'value']);
        }

        if (column.getTableFilterDefault()) {
          _this2.defaultFilter = _this2.defaultFilter || {};
          _this2.defaultFilter[column.getTableFilterKey()] = column.getTableFilterDefault();
        }
      });
    }
  }, {
    key: "findCascadeColumn",
    value: function findCascadeColumn() {
      var _this3 = this;

      this.columns.forEach(function (column) {
        var parentKey = column.getParentKey();

        if (parentKey) {
          var parentColumn = _this3.columns.find(function (c) {
            return c.getKey() === parentKey;
          });

          if (parentColumn) {
            column.parentColumn = parentColumn;
            parentColumn.childColumn = (parentColumn.childColumn || []).concat(column);
          }
        }
      });
    }
  }, {
    key: "calculateScrollWidth",
    value: function calculateScrollWidth() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          user = _ref.user,
          selectedCustomizeMap = _ref.selectedCustomizeMap;

      var scrollWidth = 0;
      this.columns.forEach(function (c) {
        if (c.getTableWidth() > 0 && c.canShowInTable({
          user: user,
          selectedCustomizeMap: selectedCustomizeMap
        })) {
          scrollWidth += c.getTableWidth();
        }
      });
      this.scrollWidth = scrollWidth > 0 ? scrollWidth * 1.2 : 0;
    }
  }, {
    key: "findHasFilter",
    value: function findHasFilter() {
      this.hasFilter = (0, _findIndex2.default)(this.columns, function (column) {
        return column.canFilterInTable();
      }) !== -1;
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
  }, {
    key: "getHasFilter",
    value: function getHasFilter() {
      return this.hasFilter;
    }
  }]);
  return Table;
}();

exports.default = Table;