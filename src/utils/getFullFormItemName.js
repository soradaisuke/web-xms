import { isArray } from 'lodash';

export default function getFullFormItemName({ prefix, column, name }) {
  const parentName = column?.getFormItemName() || name;
  return prefix && parentName
    ? [...prefix, ...(isArray(parentName) ? parentName : [parentName])]
    : parentName;
}
