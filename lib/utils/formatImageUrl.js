"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var _removeProtocol = _interopRequireDefault(require("./removeProtocol"));

var _addParamsForUpYunImage = _interopRequireDefault(require("./addParamsForUpYunImage"));

var _default = (0, _flow2.default)(_addParamsForUpYunImage.default, _removeProtocol.default);

exports.default = _default;