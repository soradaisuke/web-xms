import {
  isPlainObject, isArray, map, flatten, filter, forEach, join, isNumber,
} from 'lodash';
import ColumnTypes from './ColumnTypes';
import DataType from '../constants/DataType';

export default function processGroupConfig({ config, path }) {
  let { actions = [] } = config;
  const { schema } = config;

  if (!isArray(actions)) {
    throw new Error(`${path}: actions必须是数组`);
  }

  let primaryKey = 'id';
  let orderKey;
  let defaultSort;
  let fixedSort;
  let defaultFilter;
  const searchFileds = [];
  const newSchema = schema.map((definition) => {
    let {
      visibility, sort, defaultSort: ds, mapKey,
    } = definition;
    const {
      type: oldType, filters, key, search, canFilter,
    } = definition;

    let type;

    switch (oldType) {
      case DataType.NUMBER:
        type = ColumnTypes.number;
        break;
      case DataType.STRING:
        type = ColumnTypes.string;
        break;
      case DataType.DATETIME:
        type = ColumnTypes.datetime;
        break;
      case DataType.DATE:
        type = ColumnTypes.date;
        break;
      case DataType.BOOL:
        type = ColumnTypes.bool;
        break;
      case DataType.URL:
        type = ColumnTypes.url;
        break;
      case DataType.ORDER:
        type = ColumnTypes.order;
        break;
      case DataType.IMAGE:
        type = ColumnTypes.image;
        break;
      case DataType.ENUM:
        type = ColumnTypes.enumOf();
        break;
      case DataType.ARRAY:
        type = ColumnTypes.arrayOf(ColumnTypes.string);
        break;
      case DataType.OBJECT:
        type = ColumnTypes.objectOf(ColumnTypes.string);
        break;
      default:
        type = oldType;
        break;
    }

    if (type.mustHasFilters() && !filters) {
      throw new Error(`${path}: ${type.getName()}类型必须设置filters`);
    }

    if (visibility === 'all' || visibility === true) {
      visibility = {
        create: true,
        edit: true,
        table: true,
      };
    } else if (visibility === 'table') {
      visibility = {
        table: true,
      };
    } else if (visibility === 'modal') {
      visibility = {
        create: true,
        edit: true,
      };
    }

    if (!isPlainObject(visibility)) {
      visibility = {};
    }

    if (type === ColumnTypes.order) {
      sort = { asc: true };
      ds = 'asc';
    } else if (sort === true) {
      sort = { asc: true, desc: true };
    } else if (sort === 'asc') {
      sort = { asc: true };
    } else if (sort === 'desc') {
      sort = { desc: true };
    }

    if (isArray(key)) {
      if ((canFilter || search || type === ColumnTypes.order
        || visibility.create || visibility.edit) && !mapKey) {
        throw new Error(`${path}: key为Array且支持排序/筛选/创建/修改/搜索的数据必须设置mapKey`);
      }
    } else {
      mapKey = mapKey || key;
    }

    return {
      ...definition,
      type,
      visibility,
      sort,
      mapKey,
      defaultSort: ds,
      enabledFilters: isArray(filters) ? filter(filters, ({ disabled }) => !disabled) : [],
      key: isArray(key) ? join(key, '.') : key,
    };
  });

  forEach(newSchema, (definition) => {
    if (definition.primaryKey) {
      primaryKey = definition.key;
    }
    if (definition.type === ColumnTypes.order) {
      if (orderKey) {
        throw new Error(`${path}: type = ORDER的属性最多有一个`);
      }
      orderKey = definition.mapKey; // eslint-disable-line prefer-destructuring
      fixedSort = `${orderKey} asc`;
    }
    if (definition.search) {
      searchFileds.push(definition);
    }
    if (definition.sort && definition.defaultSort) {
      defaultSort = `${definition.mapKey} ${definition.defaultSort}`;
    }
    if (isArray(definition.filters)) {
      forEach(definition.filters, ({ value, default: d }) => {
        if (d) {
          defaultFilter = defaultFilter || {};
          defaultFilter[definition.mapKey] = isNumber(value) ? String(value) : value;
        }
      });
    }
  });

  if (!primaryKey) {
    throw new Error(`${path}: 必须指定primary key`);
  }

  if (orderKey && filter(schema, definition => !!definition.sort).length > 0) {
    throw new Error(`${path}: 存在type = ORDER的属性，默认为该属性升序排序，不支持配置其他sort属性`);
  }

  actions = flatten(map(actions, (action) => {
    if (action === 'default') {
      return ['create', 'edit', 'remove'];
    }

    return action;
  }));

  return {
    ...config,
    actions,
    primaryKey,
    orderKey,
    searchFileds,
    defaultSort,
    defaultFilter,
    fixedSort,
    namespace: path.replace(/(\/|:)/g, '@'),
    schema: newSchema,
  };
}
