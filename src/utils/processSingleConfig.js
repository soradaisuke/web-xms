import crc from 'crc-32';
import Table from '../schema/Table';

export default function processSingleConfig({ config, path }) {
  const { columns = [], actions = [] } = config;

  return {
    ...config,
    namespace: crc.str(path),
    table: new Table(columns, actions),
  };
}
