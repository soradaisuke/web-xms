"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processListConfig;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _migrate = require("./migrate");

var _ColumnTypes = _interopRequireDefault(require("./ColumnTypes"));

var _DataType = _interopRequireDefault(require("../constants/DataType"));

function processListConfig(_ref) {
  var config = _ref.config,
      path = _ref.path;
  var _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions;
  var _config$table = config.table,
      table = _config$table === void 0 ? [] : _config$table;

  if (!(0, _isArray2.default)(actions)) {
    throw new Error("".concat(path, ": actions\u5FC5\u987B\u662F\u6570\u7EC4"));
  }

  var primaryKey = 'id';
  var orderKey;
  var defaultSort;
  var fixedSort;
  var defaultFilter;
  var hasInlineEdit = false;
  var searchFields = [];
  var newTable = table.map(function (column) {
    return (0, _migrate.migrateColumn)(column);
  }).map(function (column) {
    var sort = column.sort,
        ds = column.defaultSort;
    var oldType = column.type,
        filters = column.filters,
        key = column.key,
        search = column.search,
        canFilter = column.canFilter,
        inlineEdit = column.inlineEdit,
        mapKey = column.mapKey,
        creatable = column.creatable,
        editable = column.editable;
    var type;

    if (inlineEdit && !hasInlineEdit) {
      hasInlineEdit = true;
    }

    switch (oldType) {
      case _DataType.default.NUMBER:
        type = _ColumnTypes.default.number;
        break;

      case _DataType.default.STRING:
        type = _ColumnTypes.default.string;
        break;

      case _DataType.default.DATETIME:
        type = _ColumnTypes.default.datetime;
        break;

      case _DataType.default.DATE:
        type = _ColumnTypes.default.date;
        break;

      case _DataType.default.BOOL:
        type = _ColumnTypes.default.bool;
        break;

      case _DataType.default.URL:
        type = _ColumnTypes.default.url;
        break;

      case _DataType.default.ORDER:
        type = _ColumnTypes.default.order;
        break;

      case _DataType.default.IMAGE:
        type = _ColumnTypes.default.image;
        break;

      case _DataType.default.ENUM:
        type = _ColumnTypes.default.enumOf();
        break;

      case _DataType.default.ARRAY:
        type = _ColumnTypes.default.arrayOf(_ColumnTypes.default.string);
        break;

      case _DataType.default.OBJECT:
        type = _ColumnTypes.default.objectOf(_ColumnTypes.default.string);
        break;

      default:
        type = oldType;
        break;
    }

    if (type.mustHasFilters() && !filters) {
      throw new Error("".concat(path, ": ").concat(type.getName(), "\u7C7B\u578B\u5FC5\u987B\u8BBE\u7F6Efilters"));
    }

    if (type === _ColumnTypes.default.order) {
      sort = {
        asc: true
      };
      ds = 'asc';
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

    if ((0, _isArray2.default)(key) && !mapKey && (canFilter || search || type === _ColumnTypes.default.order || creatable || editable)) {
      throw new Error("".concat(path, ": key\u4E3AArray\u4E14\u652F\u6301\u6392\u5E8F/\u7B5B\u9009/\u521B\u5EFA/\u4FEE\u6539/\u641C\u7D22\u7684\u6570\u636E\u5FC5\u987B\u8BBE\u7F6EmapKey"));
    }

    return (0, _objectSpread2.default)({}, column, {
      type: type,
      sort: sort,
      mapKey: mapKey || key,
      defaultSort: ds,
      enabledFilters: (0, _isArray2.default)(filters) ? (0, _filter2.default)(filters, function (_ref2) {
        var disabled = _ref2.disabled;
        return !disabled;
      }) : [],
      key: (0, _isArray2.default)(key) ? (0, _join2.default)(key, '.') : key
    });
  });
  (0, _forEach2.default)(newTable, function (definition) {
    if (definition.primaryKey) {
      primaryKey = definition.key;
    }

    if (definition.type === _ColumnTypes.default.order) {
      if (orderKey) {
        throw new Error("".concat(path, ": type = ORDER\u7684\u5C5E\u6027\u6700\u591A\u6709\u4E00\u4E2A"));
      }

      orderKey = definition.mapKey;
      fixedSort = "".concat(orderKey, " asc");
    }

    if (definition.search) {
      searchFields.push(definition);
    }

    if (definition.sort && definition.defaultSort) {
      defaultSort = "".concat(definition.mapKey, " ").concat(definition.defaultSort);
    }

    if ((0, _isArray2.default)(definition.filters)) {
      if (definition.multiple) {
        (0, _forEach2.default)(definition.filters, function (_ref3) {
          var value = _ref3.value,
              d = _ref3.default;

          if (d) {
            defaultFilter = defaultFilter || {};
            defaultFilter[definition.mapKey] = defaultFilter[definition.mapKey] || [];
            defaultFilter[definition.mapKey].push(value);
          }
        });
      } else {
        (0, _forEach2.default)(definition.filters, function (_ref4) {
          var value = _ref4.value,
              d = _ref4.default;

          if (d) {
            defaultFilter = defaultFilter || {};
            defaultFilter[definition.mapKey] = value;
          }
        });
      }
    }
  });

  if (!primaryKey) {
    throw new Error("".concat(path, ": \u5FC5\u987B\u6307\u5B9Aprimary key"));
  }

  if (orderKey && (0, _filter2.default)(table, function (definition) {
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

  if (hasInlineEdit) {
    actions.push('inlineEdit');
  }

  return (0, _objectSpread2.default)({}, config, {
    actions: actions,
    primaryKey: primaryKey,
    orderKey: orderKey,
    searchFields: searchFields,
    defaultSort: defaultSort,
    defaultFilter: defaultFilter,
    fixedSort: fixedSort,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: newTable
  });
}