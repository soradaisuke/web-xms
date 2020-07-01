"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDuration;

var _padCharsStart2 = _interopRequireDefault(require("lodash/fp/padCharsStart"));

var _moment = _interopRequireDefault(require("moment"));

var toFixedTwoDigitsNumber = (0, _padCharsStart2.default)('0')(2);

function formatDuration(duration) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      format = _ref.format,
      toObject = _ref.toObject;

  var diff = _moment.default.duration(duration);

  if (toObject) {
    return {
      days: toFixedTwoDigitsNumber(Math.floor(diff.as('d'))),
      hours: toFixedTwoDigitsNumber(diff.get('h')),
      minutes: toFixedTwoDigitsNumber(diff.get('m')),
      seconds: toFixedTwoDigitsNumber(diff.get('s'))
    };
  }

  if (format) {
    return _moment.default.utc(Math.abs(diff)).format(format);
  }

  if (diff.as('days') >= 1) {
    return "".concat(toFixedTwoDigitsNumber(Math.floor(diff.as('days'))), ":").concat(_moment.default.utc(Math.abs(diff)).format('HH:mm:ss'));
  }

  if (diff.as('hours') >= 1) {
    return _moment.default.utc(Math.abs(diff)).format('HH:mm:ss');
  }

  return _moment.default.utc(Math.abs(diff)).format('mm:ss');
}