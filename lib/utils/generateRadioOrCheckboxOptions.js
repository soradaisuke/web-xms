"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateRadioOrCheckboxOptions;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function generateRadioOrCheckboxOptions(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        label = _ref.text;
    return {
      value: value,
      label: label
    };
  });
}