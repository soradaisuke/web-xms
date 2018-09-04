import {
  isPlainObject, isArray, map, flatten, filter,
} from 'lodash';
import DataType from '../constants/DataType';

const { ORDER } = DataType;

export default function processGroupConfig({ config, path }) {
  let { actions } = config;
  const { schema } = config;

  if (!isArray(actions)) {
    throw new Error(`${path}: actions必须是数组`);
  }

  const orderFields = filter(schema, definition => definition.type === ORDER);
  if (orderFields.length > 1) {
    throw new Error(`${path}: type = ORDER的属性最多有一个`);
  }

  const hasOrderField = orderFields.length === 1;
  if (hasOrderField && filter(schema, definition => !!definition.sort).length > 0) {
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
    namespace: path.replace(/(\/|:)/g, '@'),
    schema: schema.map((definition) => {
      let { visibility, sort, defaultSort } = definition;
      const { type } = definition;

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
        defaultSort = 'asc';
      } else if (sort === true) {
        sort = { asc: true, desc: true };
      } else if (sort === 'asc') {
        sort = { asc: true };
      } else if (sort === 'desc') {
        sort = { desc: true };
      }

      return {
        ...definition, visibility, sort, defaultSort,
      };
    }),
  };
}
