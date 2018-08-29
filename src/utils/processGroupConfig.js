import { isPlainObject } from 'lodash';

export default function processGroupConfig({ config, path }) {
  let { action } = config;
  const { schema } = config;

  if (action === 'all' || action === true) {
    action = {
      create: true,
      edit: true,
      remove: true,
      order: true,
    };
  }

  if (!isPlainObject(action)) {
    action = {};
  }

  return {
    ...config,
    action,
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
      }

      return { ...definition, visibility };
    }),
  };
}
