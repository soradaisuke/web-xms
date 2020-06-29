import Table from '../schema/Table';

export default function processFormConfig({ config, path }) {
  const { columns = [], actions = [] } = config;

  return {
    ...config,
    table: new Table(columns, actions),
    namespace: path.replace(/(\/|:)/g, '@')
  };
}
