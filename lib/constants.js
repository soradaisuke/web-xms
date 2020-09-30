"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKEN_KEY = exports.default = void 0;

var _env = require("@qt/env");

var TOKEN_KEY = _env.isProduction ? 'prod_sso_token' : 'stg_sso_token';
exports.TOKEN_KEY = TOKEN_KEY;
var _default = {
  TOKEN_KEY: TOKEN_KEY
};
exports.default = _default;