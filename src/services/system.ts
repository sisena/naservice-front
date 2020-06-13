import request from "@/utils/request";
import {TableListParams} from "@/pages/wangguan/data";

export async function getallpermission(params?: TableListParams):Promise<any> {
  return request('/api/v1/permission/getpermission',{
    params,
  });
}

export async function addpermission(params?: TableListParams):Promise<any> {
  return request('/api/v1/permission/addpermission', {
    method: 'POST',
    data: {
      ...params,
    }
  })
}

export async function updatepermission(params?: TableListParams):Promise<any> {
  return request('/api/v1/permission/updatepermission', {
    method: 'POST',
    data: {
      ...params,
    }
  })
}

export async function deletepermission(params?: TableListParams):Promise<any> {
  return request('/api/v1/permission/deletepermission',{
    method: 'DELETE',
    params,
  });
}

export async function getallclass(params?: TableListParams):Promise<any> {
  return request('/api/v1/class/getclasses',{
    params,
  });
}

export async function addclass(params?: TableListParams):Promise<any> {
  return request('/api/v1/class/addclass', {
    method: 'POST',
    data: {
      ...params,
    }
  })
}

export async function updateclass(params?: TableListParams):Promise<any> {
  return request('/api/v1/class/updateclass', {
    method: 'POST',
    data: {
      ...params,
    }
  })
}

export async function deleteclass(params?: TableListParams):Promise<any> {
  return request('/api/v1/class/deleteclass',{
    method: 'DELETE',
    params,
  });
}

export async function addschedule(params?: TableListParams):Promise<any> {
  return request('/api/v1/schedule/addschedule',{
    params,
  });
}

export async function updateschedule(params?: TableListParams):Promise<any> {
  return request('/api/v1/schedule/updateschedule', {
    method: 'POST',
    data: {
      ...params,
    }
  })
}

export async function deleteschedule(params?: TableListParams):Promise<any> {
  return request('/api/v1/schedule/deleteschedule',{
    method: 'DELETE',
    params,
  });
}

export async function getallschedule(params?: TableListParams):Promise<any> {
  return request('/api/v1/schedule/getallschedules',{
    params,
  });
}

export async function updatevacation(params?: TableListParams):Promise<any> {
  return request('/api/v1/system/updatevacation',{
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getvacation(params?: TableListParams):Promise<any> {
  return request('/api/v1/system/getvacation',{
    params,
  });
}

export async function createann(params?: TableListParams):Promise<any> {
  return request('/api/v1/ann/createann',{
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function updateann(params?: TableListParams):Promise<any> {
  return request('/api/v1/ann/updateann',{
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getallann(params?: TableListParams):Promise<any> {
  return request('/api/v1/ann/getallann');
}

export async function deleteann(params?: TableListParams):Promise<any> {
  return request('/api/v1/ann/deleteann',{
    method: 'DELETE',
    params,
  });
}
