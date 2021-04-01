import { useMemo } from 'react';
import useUser from './useUser';
import usePageData from './usePageData';
import useRouter from './useRouter';

export default function useActionParams({ record, records } = {}) {
  const { parentPageData, ...pageData } = usePageData();
  const user = useUser();
  const { useParams } = useRouter();
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
