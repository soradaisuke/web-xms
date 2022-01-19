"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePageData;

var _react = require("react");

var _PageDataContext = _interopRequireDefault(require("../contexts/PageDataContext"));

function usePageData() {
  return (0, _react.useContext)(_PageDataContext.default) || {};
}