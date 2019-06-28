import { isArray } from 'lodash';
import Table from '../schema/Table';

export default function processListConfig({ config, path }) {
  let { actions = [] } = config;
  const { table = [] } = config;

  if (!isArray(actions)) {
    throw new Error(`${path}: actions必须是数组`);
  }
  if (!isArray(table)) {
    throw new Error(`${path}: description必须是数组`);
  }

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new Table(table)
  };
}
