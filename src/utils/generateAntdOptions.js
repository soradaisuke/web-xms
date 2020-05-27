import { isArray, map } from 'lodash';

export default function generateAntdOptions(filters) {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text, ...item }) => ({
    value,
    label: text,
    ...item
  }));
}
