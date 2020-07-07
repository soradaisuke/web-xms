import { useMemo } from 'react';
import { router } from 'dva';
import useUser from './useUser';
import usePageData from './usePageData';

const { useParams } = router;

export default function useActionParams({ record, records } = {}) {
  const { parentPageData, ...pageData } = usePageData();
  const user = useUser();
  const matchParams = useParams();

  return useMemo(
    () => ({
      record,
      records,
      user,
      matchParams,
      pageData,
      parentPageData
    }),
    [record, records, user, matchParams, pageData, parentPageData]
  );
}
