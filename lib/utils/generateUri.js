"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUri;

var _urlParse = _interopRequireDefault(require("url-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function generateUri() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var uri = new _urlParse.default(url, true);

  var combinedQueries = _objectSpread({}, uri.query, queries);

  Object.keys(combinedQueries).forEach(function (key) {
    if (combinedQueries[key] === '' || combinedQueries[key] === null || typeof combinedQueries[key] === 'undefined') {
      delete combinedQueries[key];
    }
  });
  uri.set('query', combinedQueries);
  return uri;
}