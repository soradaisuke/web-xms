import { useContext } from 'react';
import RouterContext from '../contexts/RouterContext';

export default function useRouter() {
  return useContext(RouterContext) || {};
}
