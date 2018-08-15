"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _app.default;
  }
});
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _request2.default;
  }
});
Object.defineProperty(exports, "dynamicRecords", {
  enumerable: true,
  get: function get() {
    return _dynamicRecords2.default;
  }
});
Object.defineProperty(exports, "dynamic", {
  enumerable: true,
  get: function get() {
    return _dynamic2.default;
  }
});
Object.defineProperty(exports, "Page", {
  enumerable: true,
  get: function get() {
    return _Page2.default;
  }
});

var _app = _interopRequireDefault(require("./app"));

var _request2 = _interopRequireDefault(require("./services/request"));

var _dynamicRecords2 = _interopRequireDefault(require("./utils/dynamicRecords"));

var _dynamic2 = _interopRequireDefault(require("dva/dynamic"));

var _Page2 = _interopRequireDefault(require("./pages/Page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }