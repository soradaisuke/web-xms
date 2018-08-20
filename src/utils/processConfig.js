import { startsWith, isPlainObject } from 'lodash';

export default function processConfig({ config, path }) {
  let { action, schema } = config;

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
      let { visibility } = definition;

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

      return { ...definition, visibility };
    }),
  };
}
