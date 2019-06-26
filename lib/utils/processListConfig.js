"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processListConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Table = _interopRequireDefault(require("../schema/Table"));

var _TableActions = _interopRequireDefault(require("../actions/TableActions"));

function processListConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  var _config$table = config.table,
      table = _config$table === void 0 ? [] : _config$table,
      _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions;
  return (0, _objectSpread2.default)({}, config, {
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new _Table.default(table),
    actions: new _TableActions.default(actions)
  });
}