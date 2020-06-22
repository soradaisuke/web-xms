import { useContext } from 'react';
import PageFilterContext from '../contexts/PageFilterContext';

export default function usePageFilter() {
  return useContext(PageFilterContext);
}
