import { request } from 'umi';

export async function gettodayticket(): Promise<any> {
  return request('/api/v1/statistics/gettodayticket');
}

export async function getdayticket(): Promise<any> {
  return request('/api/v1/statistics/getdayticket');
}

export async function getmonthticket(): Promise<any> {
  return request('/api/v1/statistics/getmonthticket');
}

export async function gettodaydestination(): Promise<any> {
  return request('/api/v1/statistics/gettodaydestination');
}

export async function getdaydestination(): Promise<any> {
  return request('/api/v1/statistics/getdaydestination');
}

export async function getmonthdestination(): Promise<any> {
  return request('/api/v1/statistics/getmonthdestination');
}
