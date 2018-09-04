"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processGroupConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

var ORDER = _DataType.default.ORDER;

function processGroupConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  var actions = config.actions;
  var schema = config.schema;

  if (!(0, _isArray2.default)(actions)) {
    throw new Error("".concat(path, ": actions\u5FC5\u987B\u662F\u6570\u7EC4"));
  }

  var orderFields = (0, _filter2.default)(schema, function (definition) {
    return definition.type === ORDER;
  });

  if (orderFields.length > 1) {
    throw new Error("".concat(path, ": type = ORDER\u7684\u5C5E\u6027\u6700\u591A\u6709\u4E00\u4E2A"));
  }

  var hasOrderField = orderFields.length === 1;

  if (hasOrderField && (0, _filter2.default)(schema, function (definition) {
    return !!definition.sort;
  }).length > 0) {
    throw new Error("".concat(path, ": \u5B58\u5728type = ORDER\u7684\u5C5E\u6027\uFF0C\u9ED8\u8BA4\u4E3A\u8BE5\u5C5E\u6027\u5347\u5E8F\u6392\u5E8F\uFF0C\u4E0D\u652F\u6301\u914D\u7F6E\u5176\u4ED6sort\u5C5E\u6027"));
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
          sort = definition.sort,
          defaultSort = definition.defaultSort;
      var type = definition.type;

      if (visibility === 'all' || visibility === true) {
        visibility = {
          create: true,
          edit: true,
          table: true
        };
      } else if (visibility === 'table') {
        visibility = {
          table: true
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

      if (type === ORDER) {
        sort = {
          asc: true
        };
        defaultSort = 'asc';
      } else if (sort === true) {
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
          desc: true
        };
      }

      return (0, _objectSpread2.default)({}, definition, {
        visibility: visibility,
        sort: sort,
        defaultSort: defaultSort
      });
    })
  });
}