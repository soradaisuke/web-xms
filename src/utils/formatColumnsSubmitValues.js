import {
  forEach,
  isEqual,
  set,
  get,
  isPlainObject,
  keys,
  reduce,
  concat,
  map,
  isFunction,
  isArray
} from 'lodash';

const generatePaths = object => {
  const paths = keys(object);
  return reduce(
    paths,
    (result, key) => {
      const keyArray = isArray(key) ? key : [key];
      const value = get(object, keyArray);
      if (isPlainObject(value)) {
        return concat(
          result,
          map(generatePaths(value), k => concat(keyArray, k))
        );
      }
      return concat(result, [keyArray]);
    },
    []
  );
};

export default function formatColumnsSubmitValues({ columns, values }) {
  const newValues = {};
  forEach(generatePaths(values), key => {
    const value = get(values, key);
    const column = columns.find(c => {
      const k = isArray(c.getFormItemName())
        ? c.getFormItemName()
        : [c.getFormItemName()];
      return isEqual(k, key);
    });
    if (column) {
      const generateSubmitValue = column.getFormGenerateSubmitValue();
      if (generateSubmitValue && isFunction(generateSubmitValue)) {
        set(newValues, key, generateSubmitValue(value));
      } else {
        set(newValues, key, column.formatFormSubmitValue(value));
      }
    }
  });
  return newValues;
}
