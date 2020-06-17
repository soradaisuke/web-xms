"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePageConfig;

var _react = require("react");

var _PageConfigContext = _interopRequireDefault(require("../contexts/PageConfigContext"));

function usePageConfig() {
  return (0, _react.useContext)(_PageConfigContext.default);
}