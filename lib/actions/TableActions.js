"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _immutable = _interopRequireDefault(require("immutable"));

var _EditAction = _interopRequireDefault(require("./EditAction"));

var _CreateAction = _interopRequireDefault(require("./CreateAction"));

var TableActions = function () {
  function TableActions() {
    var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, TableActions);
    this.actions = _immutable.default.List(actions);
    this.processActions();
  }

  (0, _createClass2.default)(TableActions, [{
    key: "processActions",
    value: function processActions() {
      var _this = this;

      this.rowActions = _immutable.default.List();
      this.globalActions = _immutable.default.List();
      this.multipleActions = _immutable.default.List();
      this.actions.forEach(function (action) {
        if (action.isRowAction()) {
          _this.rowActions = _this.rowActions.push(action);
        }

        if (action.isMultipleAction()) {
          _this.multipleActions = _this.multipleActions.push(action);
        }

        if (action.isGlobalAction()) {
          _this.globalActions = _this.globalActions.push(action);
        }

        if (action instanceof _EditAction.default) {
          _this.editAction = action;
        }

        if (action instanceof _CreateAction.default) {
          _this.createAction = action;
        }
      });
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
  }]);
  return TableActions;
}();

exports.default = TableActions;