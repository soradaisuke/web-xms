"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processGroupConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

function processGroupConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  var actions = config.actions;
  var schema = config.schema;

  if (!(0, _isArray2.default)(actions)) {
    throw new Error("action of path ".concat(path, " must be array"));
  }

  actions = (0, _flatten2.default)((0, _map2.default)(actions, function (action) {
    if (action === 'default') {
      return ['create', 'edit', 'remove'];
    }

    return action;
  }));
  return (0, _objectSpread2.default)({}, config, {
    actions: actions,
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
      } else if (sort === 'asc') {
        sort = {
          asc: true
        };
      } else if (sort === 'desc') {
        sort = {
          asdesc: true
        };
      }

      return (0, _objectSpread2.default)({}, definition, {
        visibility: visibility,
        sort: sort
      });
    })
  });
}