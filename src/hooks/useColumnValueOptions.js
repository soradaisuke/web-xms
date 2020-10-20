import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-common';
import { useEventCallback } from '@qt/react';
import { debounce } from 'lodash';
import useParentFilterValue from './useParentFilterValue';
import useParentFormValue from './useParentFormValue';

export default function useColumnValueOptions(
  column,
  generateFunc,
  forForm,
  initialValueOptions
) {
  const parentFilterValue = useParentFilterValue(column);
  const parentFormValue = useParentFormValue(column);
  const parentValue = forForm ? parentFormValue : parentFilterValue;
  const filters = useMemo(
    () =>
      column.getFilters(
        parentValue,
        forForm ? 'disabledInForm' : 'disabledInFilter'
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
          () =>
            setOptions(
              generateFunc(
                column.getFilters(
                  parentValue,
                  forForm ? 'disabledInForm' : 'disabledInFilter'
                )
              )
            ),
          () => {}
        );

        return () => request.cancel();
      }
    }
    return () => {};
  }, [column, options, parentValue, filters, generateFunc, forForm]);

  const onSearch = useEventCallback(debounce(async (v) => {
    const searchRequest = column.getValueOptionsSearchRequest();

    if (searchRequest) {
      const data = await searchRequest({ value: v, parentValue });
      setOptions(generateFunc(data));
    }
  }, 400));

  return [options, onSearch];
}
