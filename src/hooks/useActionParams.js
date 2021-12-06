import { useMemo } from 'react';
import { router } from 'dva';
import useUser from './useUser';
import usePageData from './usePageData';
import useForm from './useForm';

const { useParams } = router;

export default function useActionParams({ record, records, action } = {}) {
  const { parentPageData, ...pageData } = usePageData();
  const user = useUser();
  const matchParams = useParams();
  const form = useForm();

  return useMemo(() => {
    let params = {
      record,
      records,
      user,
      matchParams,
      pageData,
      parentPageData,
    };

    if (action.isFormAction()) {
      params = { ...params, form };
    }

    return params;
  }, [
    record,
    records,
    user,
    matchParams,
    pageData,
    parentPageData,
    action,
    form,
  ]);
}
