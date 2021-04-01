import { useCallback } from 'react';
import { useAsync } from 'react-async';

export default function useFetchRecords(f) {
  const fetch = useCallback(async (args) => f(...(args || [])), [f]);

  const { data, isPending, error, run } = useAsync({
    deferFn: fetch,
  });

  return {
    fetch: run,
    records: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading: isPending,
    error,
  };
}
