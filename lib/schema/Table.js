"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _immutable = _interopRequireDefault(require("immutable"));

var _findCascadeColumn = _interopRequireDefault(require("../utils/findCascadeColumn"));

var _CreateAction = _interopRequireDefault(require("../actions/CreateAction"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

var _DeleteAction = _interopRequireDefault(require("../actions/DeleteAction"));

var Table = function () {
  function Table() {
    var _this = this;

    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _classCallCheck2.default)(this, Table);
    this.columns = _immutable.default.List(columns);
    this.actions = _immutable.default.List(actions);
    this.columns.forEach(function (column) {
      if (column.isPrimaryKey()) {
        if (_this.primaryKey) {
          console.error('multiple primary key');
        } else {
          _this.primaryKey = column.getKey();
        }
      }

      if (column.getTableDefaultSortDirection()) {
        if (_this.defaultSortOrder) {
          console.error('multiple default sort order');
        } else {
          _this.defaultSortOrder = "".concat(column.getKey(), " ").concat(column.getTableDefaultSortDirection().replace('end', ''));
        }
      }

      if (column.getTableFixedSortDirection()) {
        if (_this.fixedSortOrder) {
          console.error('multiple fixed sort order');
        } else {
          _this.fixedSortOrder = "".concat(column.getKey(), " ").concat(column.getTableFixedSortDirection().replace('end', ''));
        }
      }

      if (!(0, _isNil2.default)(column.getFilterDefault())) {
        _this.defaultFilter = _this.defaultFilter || {};
        _this.defaultFilter[column.getFilterKey()] = column.getFilterDefault();
      }
    });

    if (this.columns.size > 0 && !this.primaryKey) {
      console.error('missing primary key');
    }

    (0, _findCascadeColumn.default)(this.columns);
    this.processActions();
  }

  (0, _createClass2.default)(Table, [{
    key: "processActions",
    value: function processActions() {
      var _this2 = this;

      this.rowActions = _immutable.default.List();
      this.globalActions = _immutable.default.List();
      this.multipleActions = _immutable.default.List();
      this.formActions = _immutable.default.List();
      this.actions.forEach(function (action) {
        if (action.isFormAction()) {
          _this2.formActions = _this2.formActions.push(action);
          return;
        }

        if (action.isRowAction()) {
          _this2.rowActions = _this2.rowActions.push(action);
        }

        if (action.isMultipleAction()) {
          _this2.multipleActions = _this2.multipleActions.push(action);
        }

        if (action.isGlobalAction() || action.isMultipleAction()) {
          _this2.globalActions = _this2.globalActions.push(action);
        }

        if (action instanceof _EditAction.default) {
          _this2.editAction = action;
        }

        if (action instanceof _CreateAction.default) {
          _this2.createAction = action;
        }

        if (action instanceof _DeleteAction.default) {
          _this2.deleteAction = action;
        }
      });
    }
  }, {
    key: "getFormActions",
    value: function getFormActions() {
      return this.formActions;
    }
  }, {
    key: "getActions",
    value: function getActions() {
      return this.actions;
    }
  }, {
    key: "getRowActions",
    value: function getRowActions() {
      return this.rowActions;
    }
  }, {
    key: "getMultipleActions",
    value: function getMultipleActions() {
      return this.multipleActions;
    }
  }, {
    key: "getGlobalActions",
    value: function getGlobalActions() {
      return this.globalActions;
    }
  }, {
    key: "getEditAction",
    value: function getEditAction() {
      return this.editAction;
    }
  }, {
    key: "getCreateAction",
    value: function getCreateAction() {
      return this.createAction;
    }
  }, {
    key: "getDeleteAction",
    value: function getDeleteAction() {
      return this.deleteAction;
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
  }]);
  return Table;
}();

exports.default = Table;