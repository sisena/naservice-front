import { request } from 'umi';
import { TableListParams } from '@/pages/TicketList/data';

export async function getmyhistory(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/getmyhistory', {
    params,
  });
}

export async function createticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/createticket', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function ticketupdate(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/ticketupdate', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function cancelticket(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/cancelticket', {
    method: 'DELETE',
    params,
  });
}

export async function getavailschedules(): Promise<any> {
  return request('/api/v1/schedule/getavailschedules');
}

export async function ticketdetail(params?: TableListParams): Promise<any> {
  return request('/api/v1/ticket/ticketdetail', {
    params,
  });
}
