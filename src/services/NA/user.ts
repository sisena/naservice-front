import { request } from 'umi';

export async function getuserinfo() {
  return request('/api/v1/user/getmyinfo', {
    method: 'GET',
  });
}
