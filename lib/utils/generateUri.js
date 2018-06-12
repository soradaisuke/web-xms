"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUri;

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _urlParse = _interopRequireDefault(require("url-parse"));

function generateUri() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var uri = new _urlParse.default(url, true);
  var combinedQueries = (0, _objectSpread2.default)({}, uri.query, queries);
  (0, _keys.default)(combinedQueries).forEach(function (key) {
    if (combinedQueries[key] === '' || combinedQueries[key] === null || typeof combinedQueries[key] === 'undefined') {
      delete combinedQueries[key];
    }
  });
  uri.set('query', combinedQueries);
  return uri;
}