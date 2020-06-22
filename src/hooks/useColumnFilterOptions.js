import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-core';
import { useEventCallback } from '@qt/react';
import useParentFilterValue from './useParentFilterValue';

export default function useColumnFilterOptions(column, generateFunc) {
  const parentFilterValue = useParentFilterValue(column);
  const filters = useMemo(
    () => column.getFilters(parentFilterValue, 'disableInFilter'),
    [column, parentFilterValue]
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
              column.getFilters(parentFilterValue, 'disableInFilter')
            )
          ),
        () => {}
      );

      return () => request.cancel();
    }
    return () => {};
  }, [column, options, parentFilterValue, filters, generateFunc]);

  const onSearch = useEventCallback(async value => {
    const tableFilterSearchRequest = column.getFilterSearchRequest();

    if (tableFilterSearchRequest) {
      await column.fetchSearchValueOptions(value);
      setOptions(generateFunc(column.getFilters(null, 'search')));
    }
  });

  return [options, onSearch];
}
