"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useUser;

var _dva = require("dva");

function useUser() {
  return (0, _dva.useSelector)(function (state) {
    return state.user;
  });
}