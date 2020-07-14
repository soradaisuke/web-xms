import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-common';
import { useEventCallback } from '@qt/react';
import useParentFilterValue from './useParentFilterValue';

export default function useColumnValueOptions(
  column,
  generateFunc,
  forForm,
  initialValueOptions
) {
  const parentFilterValue = useParentFilterValue(column);
  const filters = useMemo(
    () =>
      column.getFilters(
        parentFilterValue,
        forForm ? 'disabledInForm' : 'disabledInFilter'
      ),
    [column, forForm, parentFilterValue]
  );

  const [options, setOptions] = useState(generateFunc(initialValueOptions));

  useEffect(() => {
    if (!options) {
      if (filters) {
        setOptions(generateFunc(filters));
      } else if (column.getValueOptionsRequest()) {
        const request = makeCancelablePromise(
          column.fetchValueOptions(parentFilterValue)
        );
        request.then(
          () =>
            setOptions(
              generateFunc(
                column.getFilters(
                  parentFilterValue,
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
  }, [column, options, parentFilterValue, filters, generateFunc, forForm]);

  const onSearch = useEventCallback(async (v) => {
    const searchRequest = column.getValueOptionsSearchRequest();

    if (searchRequest) {
      const data = await searchRequest(v);
      setOptions(generateFunc(data));
    }
  });

  return [options, onSearch];
}
