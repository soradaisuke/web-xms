import shortId from 'shortid';
import Table from '../schema/Table';

export default function processSingleConfig({ config }) {
  const { columns = [], actions = [] } = config;

  return {
    ...config,
    namespace: shortId.generate(),
    table: new Table(columns, actions)
  };
}
