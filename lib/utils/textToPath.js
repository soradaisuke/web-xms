"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _replace2 = _interopRequireDefault(require("lodash/fp/replace"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var translateSlashes = (0, _replace2.default)(/\//g, '{slashes}');
var translatePercent = (0, _replace2.default)(/%/g, '{percent}');
var translateHash = (0, _replace2.default)(/#/g, '{hash}');
var translateQuestionMark = (0, _replace2.default)(/\?/g, '{qmark}');

function translatePatterns(text) {
  var result = text;
  var match = text.match(/\{(.*)\}/g);

  if (match) {
    (0, _forEach2.default)(match, function (pattern) {
      var value = pattern.substring(1, pattern.length - 1);
      result = result.replace(pattern, translateSlashes(value));
    });
  }

  return result;
}

var _default = (0, _flow2.default)(translatePatterns, translatePercent, translateHash, translateQuestionMark);

exports.default = _default;