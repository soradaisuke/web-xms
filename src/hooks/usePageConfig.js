import { useContext } from 'react';
import PageConfigContext from '../contexts/PageConfigContext';

export default function usePageConfig() {
  return useContext(PageConfigContext) || {};
}
