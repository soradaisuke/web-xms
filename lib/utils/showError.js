"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showError;

require("antd/es/notification/style");

var _notification2 = _interopRequireDefault(require("antd/es/notification"));

var _react = _interopRequireDefault(require("react"));

function showError(description) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '发生错误';

  _notification2.default.error({
    message: _react.default.createElement("span", {
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, message),
    description: _react.default.createElement("span", {
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, description),
    duration: 0
  });
}