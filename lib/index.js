"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "xms", {
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
Object.defineProperty(exports, "Page", {
  enumerable: true,
  get: function get() {
    return _Page2.default;
  }
});
Object.defineProperty(exports, "RecordPage", {
  enumerable: true,
  get: function get() {
    return _RecordPage2.default;
  }
});
Object.defineProperty(exports, "RecordsPage", {
  enumerable: true,
  get: function get() {
    return _RecordsPage2.default;
  }
});

var _app = _interopRequireDefault(require("./app"));

var _request2 = _interopRequireDefault(require("./services/request"));

var _Page2 = _interopRequireDefault(require("./pages/Page"));

var _RecordPage2 = _interopRequireDefault(require("./pages/RecordPage"));

var _RecordsPage2 = _interopRequireDefault(require("./pages/RecordsPage"));