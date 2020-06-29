import Table from '../schema/Table';

export default function processSingleConfig({ config, path }) {
  const { columns = [], actions = [] } = config;

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new Table(columns, actions)
  };
}
