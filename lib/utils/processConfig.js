"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

function processConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  var action = config.action;
  var schema = config.schema;

  if (action === 'all' || action === true) {
    action = {
      create: true,
      edit: true,
      remove: true,
      order: true
    };
  }

  if (!(0, _isPlainObject2.default)(action)) {
    action = {};
  }

  return (0, _objectSpread2.default)({}, config, {
    action: action,
    namespace: path.replace(/(\/|:)/g, '@'),
    schema: schema.map(function (definition) {
      var visibility = definition.visibility,
          sort = definition.sort;

      if (visibility === 'all' || visibility === true) {
        visibility = {
          create: true,
          edit: true,
          tabel: true
        };
      } else if (visibility === 'tabel') {
        visibility = {
          tabel: true
        };
      } else if (visibility === 'modal') {
        visibility = {
          create: true,
          edit: true
        };
      }

      if (!(0, _isPlainObject2.default)(visibility)) {
        visibility = {};
      }

      if (sort === true) {
        sort = {
          asc: true,
          desc: true
        };
      }

      return (0, _objectSpread2.default)({}, definition, {
        visibility: visibility
      });
    })
  });
}