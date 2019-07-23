import Table from '../schema/Table';

export default function processSingleConfig({ config, path }) {
  const { table = [] } = config;

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new Table(table)
  };
}
