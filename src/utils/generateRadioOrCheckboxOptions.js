import { isArray, map } from 'lodash';

export default function generateRadioOrCheckboxOptions(filters) {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text: label }) => ({ value, label }));
}
