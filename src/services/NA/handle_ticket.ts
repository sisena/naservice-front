import { request } from 'umi';
import { TableListParams } from '@/pages/wangguan/data';

export async function getuncompletetickets(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getuncompletetickets', {
    params,
  });
}

export async function getfixingtickets(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getfixingtickets', {
    params,
  });
}

export async function getcompletetickets(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getcompletetickets', {
    params,
  });
}

export async function getalltickets(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getalltickets', {
    params,
  });
}

export async function getmyticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getmywork', {
    params,
  });
}

export async function acceptticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/acceptticket', {
    method: 'PUT',
    params,
  });
}

export async function finishticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/finishticket', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function abortticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/abortticket', {
    method: 'DELETE',
    params,
  });
}

export async function getpeoplehistory(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getpeoplehistory', {
    params,
  });
}
