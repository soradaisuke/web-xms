"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Action = _interopRequireDefault(require("./Action"));

var _CreateAction = _interopRequireDefault(require("./CreateAction"));

var _DeleteAction = _interopRequireDefault(require("./DeleteAction"));

var _EditAction = _interopRequireDefault(require("./EditAction"));

var _CustomizeAction = _interopRequireDefault(require("./CustomizeAction"));

var _default = {
  Custom: function Custom(config) {
    return new _Action.default(config);
  },
  Delete: function Delete(config) {
    return new _DeleteAction.default(config);
  },
  Create: function Create(config) {
    return new _CreateAction.default(config);
  },
  Customize: function Customize(config) {
    return new _CustomizeAction.default(config);
  },
  Edit: function Edit(config) {
    return new _EditAction.default(config);
  }
};
exports.default = _default;