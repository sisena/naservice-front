import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
// export function getAuthority(str?: string): string | string[] {
//   const authorityString =
//     typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
//   // authorityString could be admin, "admin", ["admin"]
//   let authority;
//   try {
//     if (authorityString) {
//       authority = JSON.parse(authorityString);
//     }
//   } catch (e) {
//     authority = authorityString;
//   }
//   if (typeof authority === 'string') {
//     return [authority];
//   }
//   // preview.pro.ant.design only do not use in your production.
//   // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
//   if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
//     return ['admin'];
//   }
//   return authority;
// }

export function getAuthority(): string | string[] {
  const authorityString = getWithExpiry('rolename');
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}

// export function setAuthority(authority: string | string[]): void {
//   const proAuthority = typeof authority === 'string' ? [authority] : authority;
//   localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
//   // auto reload
//   reloadAuthorized();
// }

export function setAuthority(authority: string | string[],ttl: number): void {

  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  setWithExpiry('rolename', JSON.stringify(proAuthority),ttl);
  // auto reload
  reloadAuthorized();
}

export function setWithExpiry(key:string, value:string, ttl:number) { // 设置一个过期时间为ttl的localstorage
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key:string) { // 获取一个没有过期的localstorage
  const itemStr = localStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}
