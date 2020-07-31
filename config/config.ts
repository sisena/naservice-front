// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './login/index',
        },
        {
          name: 'forget',
          path: '/user/forget',
          component: './forget/index'
        },
        {
          name: 'resetpasswd',
          path: '/user/resetpasswd',
          component: './forget/resetpasswd'
        }
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'staff',''],
          routes: [
            {
              path: '/',
              redirect: '/Hello',
            },
            {
              path: '/Hello',
              name: 'hello',
              icon: 'smile',
              component: './Hello',
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            {
              name: 'list.ticket-list',
              icon: 'ToolOutlined',
              path: '/ticket',
              component: './TicketList',
            },
            {
              path: '/service',
              name: 'service',
              icon: 'HomeOutlined',
              authority: ['admin','staff'],
              routes: [
                {
                  path: '/service/unfix',
                  name: 'unfix',
                  icon: 'ClockCircleOutlined',
                  component: './wangguan/UnfixList',
                  authority: ['admin','staff'],
                },
                {
                  path: '/service/fixing',
                  name: 'fixing',
                  icon: 'LoadingOutlined',
                  component: './wangguan/FixingList',
                  authority: ['admin','staff'],
                },
                {
                  path: '/service/fixcomplete',
                  name: 'fixcomplete',
                  icon: 'CheckCircleOutlined',
                  component: './wangguan/FixcompleteList',
                  authority: ['admin','staff'],
                },
                {
                  path: '/service/allticket',
                  name: 'allticket',
                  icon: 'UnorderedListOutlined',
                  component: './wangguan/AllticketList',
                  authority: ['admin','staff'],
                },
                {
                  path: '/service/mywork',
                  name: 'mywork',
                  icon: 'IssuesCloseOutlined',
                  component: './wangguan/MyWork',
                  authority: ['admin','staff'],
                },
              ],
            },
            {
              path: '/system',
              name: 'system',
              icon: 'SettingOutlined',
              authority: ['admin'],
              routes: [
                {
                  path: '/system/permission',
                  name: 'permission',
                  icon: 'SafetyCertificateOutlined',
                  component: './system/permission',
                  authority: ['admin'],
                },
                {
                  path: '/system/class',
                  name: 'class',
                  icon: 'FieldTimeOutlined',
                  component: './system/class',
                  authority: ['admin'],
                },
                {
                  path: '/system/schedule',
                  name: 'schedule',
                  icon: 'ScheduleOutlined',
                  component: './system/schedule',
                  authority: ['admin'],
                },
                {
                  path: '/system/ann',
                  name: 'announcement',
                  icon: 'NotificationOutlined',
                  component: './system/announcement',
                  authority: ['admin'],
                },
                {
                  path: '/system/vacation',
                  name: 'vacation',
                  icon: 'HourglassOutlined',
                  component: './system/vacationSetting',
                  authority: ['admin'],
                },
                {
                  path: '/system/usermgr',
                  name: 'usermgr',
                  icon: 'TeamOutlined',
                  component: './system/usermgr',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'usersetting',
              icon: 'UserOutlined',
              path: '/usersetting',
              component: './UserSetting',
            },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
