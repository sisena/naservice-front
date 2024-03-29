import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { getmyinfo } from '@/services/NA/user';
import type { RequestConfig } from '@@/plugin-request/request';
import { getWithExpiry } from '@/services/NA/utils';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: NAAPI.CurrentUser;
  fetchUserInfo?: () => Promise<NAAPI.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getmyinfo();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    if (history.location.pathname != '/forget') {
      if (history.location.pathname != '/resetpasswd') {
        try {
          const msg = await getmyinfo();
          const currentUser = msg.data;
          return {
            fetchUserInfo,
            currentUser,
            settings: {},
          };
        } catch {
          return {
            fetchUserInfo,
            settings: {},
          };
        }
      }
    }
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        location.pathname !== loginPath &&
        location.pathname != '/forget' &&
        location.pathname != '/resetpasswd'
      ) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

// 拦截器,加上jwt的token
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const token = getWithExpiry('token');
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}` };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  }

  return {
    url: url,
    options: options,
  };
};

export const request: RequestConfig = {
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};
