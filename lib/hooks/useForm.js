"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _react = require("react");

var _FormContext = _interopRequireDefault(require("../contexts/FormContext"));

function useForm() {
  return (0, _react.useContext)(_FormContext.default);
}