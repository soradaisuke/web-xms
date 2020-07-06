import { isPlainObject, toString } from 'lodash';

export default function toKey(v) {
  if (isPlainObject(v)) {
    return JSON.stringify(v);
  }

  return toString(v);
}
