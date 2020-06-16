import { useContext } from 'react';
import PageDataContext from '../contexts/PageDataContext';

export default function usePageData() {
  return useContext(PageDataContext);
}
