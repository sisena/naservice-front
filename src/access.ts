/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import { getWithExpiry } from '@/services/NA/utils';

export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canWangguan: () => {
      const role = getWithExpiry('rolename');
      return role == 'staff' || role == 'admin';
    },
    canSystem: () => {
      const role = getWithExpiry('rolename');
      return role == 'admin';
    },
  };
}
