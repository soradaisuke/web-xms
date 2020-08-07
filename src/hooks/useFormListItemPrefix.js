import { useContext } from 'react';
import FormListItemContext from '../contexts/FormListItemContext';

export default function useFormListItemPrefix() {
  return useContext(FormListItemContext);
}
