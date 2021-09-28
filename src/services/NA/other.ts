import { request } from 'umi';

export async function getcaptcha(): Promise<any> {
  return request('/api/other/getcaptcha');
}
