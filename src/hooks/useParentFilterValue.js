import usePageFilterForm from './usePageFilterForm';

export default function useParentFilterValue(column) {
  const form = usePageFilterForm();
  const parentKey = column.parentColumn?.getFilterKey();

  return parentKey ? form?.getFieldValue(parentKey) : null;
}
