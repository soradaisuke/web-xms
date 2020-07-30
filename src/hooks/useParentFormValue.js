import useForm from './useForm';

export default function useParentFormValue(column) {
  const form = useForm();
  const parentKey = column?.parentColumn?.getFormItemName();

  return parentKey ? form?.getFieldValue(parentKey) : null;
}
