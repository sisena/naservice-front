import { request } from 'umi';
import { TableListParams as annListParams } from '@/pages/system/announcement/data';
import { TableListParams as classListParams } from '@/pages/system/class/data';
import { TableListParams as permissionListParams } from '@/pages/system/permission/data';
import { TableListParams as scheduleListParams } from '@/pages/system/schedule/data';
import { TableListParams as usermgrListParams } from '@/pages/system/usermgr/data';
import { SystemPropsParams } from '@/pages/system/SystemProp';

export async function getallpermission(params?: permissionListParams): Promise<any> {
  return request('/api/v1/permission/getpermission', {
    params,
  });
}

export async function addpermission(params?: permissionListParams): Promise<any> {
  return request('/api/v1/permission/addpermission', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatepermission(params?: permissionListParams): Promise<any> {
  return request('/api/v1/permission/updatepermission', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deletepermission(params?: permissionListParams): Promise<any> {
  return request('/api/v1/permission/deletepermission', {
    method: 'DELETE',
    params,
  });
}

export async function getallclass(params?: classListParams): Promise<any> {
  return request('/api/v1/class/getclasses', {
    params,
  });
}

export async function addclass(params?: classListParams): Promise<any> {
  return request('/api/v1/class/addclass', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateclass(params?: classListParams): Promise<any> {
  return request('/api/v1/class/updateclass', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteclass(params?: classListParams): Promise<any> {
  return request('/api/v1/class/deleteclass', {
    method: 'DELETE',
    params,
  });
}

export async function addschedule(params?: scheduleListParams): Promise<any> {
  return request('/api/v1/schedule/addschedule', {
    method: 'PUT',
    params,
  });
}

export async function updateschedule(params?: scheduleListParams): Promise<any> {
  return request('/api/v1/schedule/updateschedule', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteschedule(params?: scheduleListParams): Promise<any> {
  return request('/api/v1/schedule/deleteschedule', {
    method: 'DELETE',
    params,
  });
}

export async function getallschedule(params?: scheduleListParams): Promise<any> {
  return request('/api/v1/schedule/getallschedules', {
    params,
  });
}

export async function updatesystemprop(params?: SystemPropsParams): Promise<any> {
  return request('/api/v1/system/updatesystemprop', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function getsystemprop(params?: SystemPropsParams): Promise<any> {
  return request('/api/v1/system/getsystemprop', {
    params,
  });
}

export async function createann(params?: annListParams): Promise<any> {
  return request('/api/v1/ann/createann', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateann(params?: annListParams): Promise<any> {
  return request('/api/v1/ann/updateann', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function getallann(): Promise<any> {
  return request('/api/v1/ann/getallann');
}

export async function deleteann(params?: annListParams): Promise<any> {
  return request('/api/v1/ann/deleteann', {
    method: 'DELETE',
    params,
  });
}

export async function getusers(params?: usermgrListParams): Promise<any> {
  return request('/api/v1/usermgr/getusers', {
    params,
  });
}

export async function createuser(params?: usermgrListParams): Promise<any> {
  return request('/api/v1/usermgr/createuser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateuser(params?: usermgrListParams): Promise<any> {
  return request('/api/v1/usermgr/updateuser', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteuser(params?: usermgrListParams): Promise<any> {
  return request('/api/v1/usermgr/deleteuser', {
    method: 'DELETE',
    params,
  });
}

export async function userresetpwd(params?: usermgrListParams): Promise<any> {
  return request('/api/v1/usermgr/userresetpwd', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function refreshschedule(): Promise<any> {
  return request('/api/v1/schedule/refreshschedules', {
    method: 'GET',
  });
}
