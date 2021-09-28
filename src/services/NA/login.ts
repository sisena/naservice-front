import { request } from 'umi';

export async function login(data: NAAPI.LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: data,
  });
}
