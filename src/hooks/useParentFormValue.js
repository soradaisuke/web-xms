import useForm from './useForm';
import useFormListItemPrefix from './useFormListItemPrefix';
import getFullFormItemName from '../utils/getFullFormItemName';

export default function useParentFormValue(column) {
  const form = useForm();
  const prefix = useFormListItemPrefix();
  const parentKey = getFullFormItemName({ prefix, column: column?.parentColumn });

  return parentKey ? form?.getFieldValue(parentKey) : null;
}
