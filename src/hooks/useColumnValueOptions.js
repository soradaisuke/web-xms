import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-common';
import { useEventCallback } from '@qt/react';
import { debounce } from 'lodash';
import useParentFilterValue from './useParentFilterValue';
import useParentFormValue from './useParentFormValue';
import Column from '../schema/Column';

export default function useColumnValueOptions(
  column,
  generateFunc,
  forForm,
  initialValueOptions,
  isEdit,
  onLoadOptions
) {
  const parentFilterValue = useParentFilterValue(column);
  const parentFormValue = useParentFormValue(column);
  const parentValue = forForm ? parentFormValue : parentFilterValue;
  const filters = useMemo(
    () =>
      column.getFilters(
        parentValue,
        forForm
          ? Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM
          : Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER
      ),
    [column, forForm, parentValue]
  );

  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions(generateFunc(initialValueOptions));
  }, [generateFunc, initialValueOptions]);

  useEffect(() => {
    if (!options) {
      if (filters) {
        setOptions(generateFunc(filters));
      } else if (column.getValueOptionsRequest()) {
        const request = makeCancelablePromise(
          column.fetchValueOptions(parentValue)
        );
        request.then(
          () => {
            const os = generateFunc(
              column.getFilters(
                parentValue,
                forForm
                  ? Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM
                  : Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER
              )
            );
            setOptions(os);
            onLoadOptions?.(os);
          },
          () => {}
        );

        return () => request.cancel();
      }
    }
    return () => {};
  }, [
    column,
    options,
    onLoadOptions,
    parentValue,
    filters,
    generateFunc,
    forForm,
  ]);

  const onSearch = useEventCallback(
    debounce(async (v) => {
      const searchRequest = column.getValueOptionsSearchRequest();

      if (searchRequest) {
        const data = await searchRequest({ value: v, parentValue, isEdit });
        setOptions(generateFunc(data));
      }
    }, 400)
  );

  return [options, onSearch];
}
