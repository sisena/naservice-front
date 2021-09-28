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

export async function updatemyinfo(params: any): Promise<any> {
  return request('/api/v1/user/updatemyinfo', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function changepassword(params: any): Promise<any> {
  return request('/api/v1/user/changepassword', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function userforget(params: any): Promise<any> {
  return request('/api/newforget', {
    params,
  });
}

export async function checkforget(params: any): Promise<any> {
  return request('/api/checkforget', {
    params,
  });
}

export async function resetpassword(params: any): Promise<any> {
  return request('/api/resetpasswd', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
