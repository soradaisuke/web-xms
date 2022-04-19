import { useMemo } from 'react';
import { router } from 'dva';
import { set, get, isFunction } from 'lodash';
import useUser from './useUser';
import usePageConfig from './usePageConfig';

const { useParams } = router;

export default function useFormInitialValues({ record, columns: c }) {
  const { table, formProps = {} } = usePageConfig();
  const user = useUser();
  const matchParams = useParams();

  const columns = useMemo(
    () => c || table.getColumns().filter((column) => column.canShowInForm({ user, record })),
    [table, user, record, c]
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
        if (!isEdit) {
          const initialValue = column.getFormItemInitialValue();
          return set(
            iv,
            column.getFormItemName(),
            isFunction(initialValue) ? initialValue({ matchParams }) : initialValue,
          );
        }

        const editValue = get(record, column.getKey());
        const normalizeInitialValue = column.getFormItemNormalizeInitialValue();
        return set(
          iv,
          column.getFormItemName(),
          isFunction(normalizeInitialValue)
            ? normalizeInitialValue({
              record,
              value: editValue,
              matchParams,
            })
            : editValue,
        );
      }, {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formProps.initialValues, record, columns, matchParams]
  );
}