"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processListConfig;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _crc = _interopRequireDefault(require("crc-32"));

var _Table = _interopRequireDefault(require("../schema/Table"));

var _CreateAction = _interopRequireDefault(require("../actions/CreateAction"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function processListConfig(_ref) {
  var config = _ref.config,
      path = _ref.path,
      prefix = _ref.prefix,
      inline = _ref.inline,
      useFormPage = _ref.useFormPage;
  var _config$columns = config.columns,
      columns = _config$columns === void 0 ? [] : _config$columns,
      _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions;
  var newTable = new _Table.default(columns);
  return _objectSpread(_objectSpread({}, config), {}, {
    namespace: String(_crc.default.str(path)),
    table: new _Table.default(columns, (0, _map2.default)(actions, function (action) {
      if (action instanceof _CreateAction.default && useFormPage) {
        return action.setLink("".concat(prefix && inline ? "".concat(path.slice(prefix.length + 1), "/") : '', "new/edit"));
      }

      if (action instanceof _EditAction.default && useFormPage) {
        return action.setLink(function (_ref2) {
          var record = _ref2.record;
          return "".concat(prefix && inline ? "".concat(path.slice(prefix.length + 1), "/") : '').concat((0, _get2.default)(record, newTable.getPrimaryKey()), "/edit");
        });
      }

      return action;
    }))
  });
}