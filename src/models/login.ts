import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
// @ts-ignore
import jwt_decode from 'jwt-decode'
import { notification } from 'antd';
import { setWithExpiry } from "@/utils/authority";

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // *login({ payload }, { call, put }) {
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   // Login successfully
    //   if (response.status === 'ok') {
    //     const urlParams = new URL(window.location.href);
    //     const params = getPageQuery();
    //
    //     let { redirect } = params as { redirect: string };
    //     if (redirect) {
    //       const redirectUrlParams = new URL(redirect);
    //        if (redirectUrlParams.origin === urlParams.origin) {
    //         redirect = redirect.substr(urlParams.origin.length);
    //          if (redirect.match(/^\/.*#/)) {
    //           redirect = redirect.substr(redirect.indexOf('#') + 1);
    //         }
    //       } else {
    //         window.location.href = '/';
    //         return;
    //       }
    //     }
    //     history.replace(redirect || '/');
    //   }
    // },

    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 200) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();

        // 解析token抽出rolename
        const decode = jwt_decode(response.token);
        const {rolename = ''} = decode;

        if (payload.autoLogin) {
          // 更新Authority
          setAuthority(rolename,10080000); // 7天
          // 存储token
          setWithExpiry("token", response.token,10080000);
        } else {
          setAuthority(rolename,900000); // 15分钟
          setWithExpiry("token", response.token,900000);
        }

        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
      // Login failed
      if (response.status == 401) {
        notification.error({
          message: '登陆失败',
          description:
            '用户名或密码错误',
        })
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      localStorage.removeItem('rolename');
      localStorage.removeItem('token');
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
