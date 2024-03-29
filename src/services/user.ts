import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

// export async function queryCurrent(): Promise<any> {
//   return request('/api/currentUser');
// }

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCurrent(): Promise<any> {
  // return request('/api/currentUser');
  return request('/api/v1/user/getmyinfo');
}

export async function getuserinfo(params:any): Promise<any> {
  return request('/api/v1/user/getuserinfo', {
    params
  })
}

export async function updatemyinfo(params:any): Promise<any> {
  return request('/api/v1/user/updatemyinfo', {
    method: 'PUT',
    data: {
      ...params,
    }
  })
}

export async function changepassword(params:any): Promise<any> {
  return request('/api/v1/user/changepassword', {
    method: 'PUT',
    data: {
      ...params,
    }
  })
}

export async function getann(): Promise<any> {
  return request('/api/v1/ann/getann')
}

export async function userforget(params:any):Promise<any> {
  return request('/api/newforget',{
    params
  })
}

export async function checkforget(params:any):Promise<any> {
  return request('/api/checkforget',{
    params
  })
}

export async function resetpassword(params:any):Promise<any> {
  return request('/api/resetpasswd',{
    method: 'POST',
    data: {
      ...params,
  }})
}
