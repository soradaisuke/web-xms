"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormListItemPrefix;

var _react = require("react");

var _FormListItemContext = _interopRequireDefault(require("../contexts/FormListItemContext"));

function useFormListItemPrefix() {
  return (0, _react.useContext)(_FormListItemContext.default);
}