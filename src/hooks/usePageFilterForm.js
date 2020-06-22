import { useContext } from 'react';
import PageFilterFormContext from '../contexts/PageFilterFormContext';

export default function usePageFilterForm() {
  return useContext(PageFilterFormContext)?.current;
}
