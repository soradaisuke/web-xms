"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePageFilterForm;

var _react = require("react");

var _PageFilterFormContext = _interopRequireDefault(require("../contexts/PageFilterFormContext"));

function usePageFilterForm() {
  return (0, _react.useContext)(_PageFilterFormContext.default);
}