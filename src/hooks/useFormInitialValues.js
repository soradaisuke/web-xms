import { useMemo } from 'react';
import { set, get, isFunction } from 'lodash';
import useUser from './useUser';
import usePageConfig from './usePageConfig';
import useRouter from './useRouter';

export default function useFormInitialValues({ record }) {
  const { table, formProps } = usePageConfig();
  const user = useUser();
  const { useParams } = useRouter();
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
