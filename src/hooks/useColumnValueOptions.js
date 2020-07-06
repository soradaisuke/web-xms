import { useEffect, useState, useMemo } from 'react';
import { makeCancelablePromise } from '@qt/web-common';
import { useEventCallback } from '@qt/react';
import useParentFilterValue from './useParentFilterValue';

export default function useColumnValueOptions(
  column,
  generateFunc,
  forForm,
  value
) {
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
                  forForm ? 'disableInForm' : 'disableInFilter'
                )
              )
            ),
          () => {}
        );

        return () => request.cancel();
      } else if (column.getValueOptionsInitialValueRequest()) {
        const request = makeCancelablePromise(
          column.getValueOptionsInitialValueRequest()(value)
        );
        request.then(
          data => setOptions(generateFunc(data)),
          e => {
            console.log(e);
          }
        );

        return () => request.cancel();
      }
    }
    return () => {};
  }, [
    column,
    options,
    parentFilterValue,
    filters,
    generateFunc,
    forForm,
    value
  ]);

  const onSearch = useEventCallback(async v => {
    const searchRequest = column.getValueOptionsSearchRequest();

    if (searchRequest) {
      const data = await searchRequest(v);
      setOptions(generateFunc(data));
    }
  });

  return [options, onSearch];
}
