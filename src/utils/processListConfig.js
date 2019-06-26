import Table from '../schema/Table';
import TableActions from '../actions/TableActions';

export default function processListConfig({ config, path }) {
  const { table = [], actions = [] } = config;

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new Table(table),
    actions: new TableActions(actions)
  };
}
