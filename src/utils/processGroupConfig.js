import {
  isPlainObject, isArray, map, flatten, filter, forEach, join,
} from 'lodash';
import DataType from '../constants/DataType';

const { ORDER, ENUM } = DataType;

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
      type, filters, key, search, canFilter,
    } = definition;

    if (type === ENUM && !filters) {
      throw new Error(`${path}: ENUM类型必须设置filters`);
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

    if (type === ORDER) {
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
      if ((canFilter || search || type === ORDER || visibility.create || visibility.edit)
        && !mapKey) {
        throw new Error(`${path}: key为Array且支持排序/筛选/创建/修改/搜索的数据必须设置mapKey`);
      }
    } else {
      mapKey = mapKey || key;
    }

    return {
      ...definition,
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
    if (definition.type === ORDER) {
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
          defaultFilter[definition.mapKey] = value;
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
