"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberColumn = _interopRequireDefault(require("./NumberColumn"));

var _StringColumn = _interopRequireDefault(require("./StringColumn"));

var _BooleanColumn = _interopRequireDefault(require("./BooleanColumn"));

var _DateColumn = _interopRequireDefault(require("./DateColumn"));

var _DateTimeColumn = _interopRequireDefault(require("./DateTimeColumn"));

var _TimeColumn = _interopRequireDefault(require("./TimeColumn"));

var _OrderColumn = _interopRequireDefault(require("./OrderColumn"));

var _ImageColumn = _interopRequireDefault(require("./ImageColumn"));

var _UrlColumn = _interopRequireDefault(require("./UrlColumn"));

var _AudioColumn = _interopRequireDefault(require("./AudioColumn"));

var _ArrayColumn = _interopRequireDefault(require("./ArrayColumn"));

var _ObjectColumn = _interopRequireDefault(require("./ObjectColumn"));

var _default = {
  Number: function Number(config) {
    return new _NumberColumn.default(config);
  },
  String: function String(config) {
    return new _StringColumn.default(config);
  },
  Boolean: function Boolean(config) {
    return new _BooleanColumn.default(config);
  },
  Date: function Date(config) {
    return new _DateColumn.default(config);
  },
  DateTime: function DateTime(config) {
    return new _DateTimeColumn.default(config);
  },
  Time: function Time(config) {
    return new _TimeColumn.default(config);
  },
  Order: function Order(config) {
    return new _OrderColumn.default(config);
  },
  Image: function Image(config) {
    return new _ImageColumn.default(config);
  },
  Url: function Url(config) {
    return new _UrlColumn.default(config);
  },
  Audio: function Audio(config) {
    return new _AudioColumn.default(config);
  },
  Array: function Array(column, config) {
    return new _ArrayColumn.default(column, config);
  },
  Object: function Object(config) {
    return new _ObjectColumn.default(config);
  }
};
exports.default = _default;