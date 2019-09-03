"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showError;

require("antd/lib/notification/style");

var _notification2 = _interopRequireDefault(require("antd/lib/notification"));

function showError(description) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '发生错误';

  _notification2.default.error({
    message: message,
    description: description,
    duration: 0
  });
}