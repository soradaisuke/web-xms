import { useSelector } from 'dva';

export default function useUser() {
  return useSelector(state => state.user);
}
