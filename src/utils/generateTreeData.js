import { isArray, map } from 'lodash';

export default function generateTreeData(filters) {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text, children, ...item }) => ({
    value,
    key: value,
    title: text,
    label: text,
    children: generateTreeData(children),
    ...item
  }));
}
