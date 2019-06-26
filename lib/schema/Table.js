"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _immutable = _interopRequireDefault(require("immutable"));

var _OrderColumn = _interopRequireDefault(require("./OrderColumn"));

var Table = function () {
  function Table() {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, Table);
    this.columns = _immutable.default.List(columns);
    this.findPrimaryKey();
    this.findOrderColumn();
    this.findDefaultSortOrder();
  }

  (0, _createClass2.default)(Table, [{
    key: "findPrimaryKey",
    value: function findPrimaryKey() {
      var primaryColumn = this.columns.find(function (column) {
        return column.isPrimaryKey();
      });

      if (!primaryColumn) {
        throw new Error('missing primary key');
      } else {
        this.primaryKey = primaryColumn.getKey();
      }
    }
  }, {
    key: "findDefaultSortOrder",
    value: function findDefaultSortOrder() {
      var column = this.getOrderColumn() || this.columns.find(function (c) {
        return !!c.getTableDefaultSortOrder();
      });

      if (column) {
        this.defaultSortOrder = "".concat(column.getKey(), " ").concat(column.getTableDefaultSortOrder().replace('end', ''));
      }
    }
  }, {
    key: "findOrderColumn",
    value: function findOrderColumn() {
      this.orderColumn = this.columns.find(function (column) {
        return column instanceof _OrderColumn.default;
      });
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
    key: "getOrderColumn",
    value: function getOrderColumn() {
      return this.orderColumn;
    }
  }]);
  return Table;
}();

exports.default = Table;