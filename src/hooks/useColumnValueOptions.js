import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-common';
import { useEventCallback } from '@qt/react';
import useParentFilterValue from './useParentFilterValue';

export default function useColumnValueOptions(column, generateFunc, forForm) {
  const parentFilterValue = useParentFilterValue(column);
  const filters = useMemo(
    () =>
      column.getFilters(
        parentFilterValue,
        forForm ? 'disableInForm' : 'disableInFilter'
      ),
    [column, forForm, parentFilterValue]
  );

  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions(filters ? generateFunc(filters) : null);
  }, [filters, generateFunc]);

  useEffect(() => {
    if ((!options || !filters) && column.getValueOptionsRequest()) {
      const request = makeCancelablePromise(
        column.fetchValueOptions(parentFilterValue)
      );
      request.then(
        () =>
          setOptions(
            generateFunc(
              column.getFilters(
                parentFilterValue,
                forForm ? 'disableInForm' : 'disableInFilter'
              )
            )
          ),
        () => {}
      );

      return () => request.cancel();
    }
    return () => {};
  }, [column, options, parentFilterValue, filters, generateFunc, forForm]);

  const onSearch = useEventCallback(async value => {
    const searchRequest = column.getValueOptionsSearchRequest();

    if (searchRequest) {
      const data = await searchRequest(value);
      setOptions(generateFunc(data));
    }
  });

  return [options, onSearch];
}
