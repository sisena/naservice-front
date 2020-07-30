import request from '@/utils/request';

export async function getcaptcha(): Promise<any> {
  return request('/api/other/getcaptcha');
}
