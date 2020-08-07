import { isArray } from 'lodash';

export default function getFullFormItemName({ prefix, column }) {
  const parentName = column?.getFormItemName();
  return prefix && parentName
    ? [...prefix, ...(isArray(parentName) ? parentName : [parentName])]
    : parentName;
}
