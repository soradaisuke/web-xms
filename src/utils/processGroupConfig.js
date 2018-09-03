import {
  isPlainObject, isArray, map, flatten,
} from 'lodash';

export default function processGroupConfig({ config, path }) {
  let { actions } = config;
  const { schema } = config;

  if (!isArray(actions)) {
    throw new Error(`action of path ${path} must be array`);
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
      let { visibility, sort } = definition;

      if (visibility === 'all' || visibility === true) {
        visibility = {
          create: true,
          edit: true,
          tabel: true,
        };
      } else if (visibility === 'tabel') {
        visibility = {
          tabel: true,
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

      if (sort === true) {
        sort = { asc: true, desc: true };
      } else if (sort === 'asc') {
        sort = { asc: true };
      } else if (sort === 'desc') {
        sort = { asdesc: true };
      }

      return { ...definition, visibility, sort };
    }),
  };
}
