import { request } from 'umi';

export async function getuserinfo() {
  return request('/api/v1/user/getmyinfo', {
    method: 'GET',
  });
}

export async function getann(): Promise<any> {
  return request('/api/v1/ann/getann', {
    method: 'GET',
  });
}
