import { useMemo } from 'react';
import { router } from 'dva';
import { set, get, isFunction } from 'lodash';
import useUser from './useUser';
import usePageConfig from './usePageConfig';

const { useParams } = router;

export default function useFormInitialValues({ record }) {
  const { table, formProps } = usePageConfig();
  const user = useUser();
  const matchParams = useParams();

  const columns = useMemo(
    () => table.getColumns().filter((column) => column.canShowInForm({ user, record })),
    [table, user, record]
  );

  return useMemo(
    () => {
      if (formProps.initialValues) {
        if (isFunction(formProps.initialValues)) {
          return formProps.initialValues({ record, matchParams });
        }
        return formProps.initialValues;
      }
      const isEdit = !!record;
      return columns?.reduce((iv, column) => {
        if (isEdit && column.getFormItemNormalizeInitialValue()) {
          return set(
            iv,
            column.getFormItemName(),
            column.getFormItemNormalizeInitialValue()({
              record,
              value: get(record, column.getKey()),
              matchParams,
            }),
          );
        }
        if (!isEdit && column.getFormItemInitialValue()) {
          const initialValue = column.getFormItemInitialValue();
          return set(
            iv,
            column.getFormItemName(),
            isFunction(initialValue) ? initialValue({ matchParams }) : initialValue,
          );
        }
        return set(
          iv,
          column.getFormItemName(),
          get(record, column.getKey()),
        );
      }, {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formProps.initialValues, record, columns, matchParams]
  );
}
