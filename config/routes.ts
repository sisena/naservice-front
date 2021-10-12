export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '忘记密码',
    path: '/forget',
    component: './forget/index',
    hideInMenu: true,
    layout: false,
  },
  {
    name: '重置密码',
    path: '/resetpasswd',
    component: './forget/resetpasswd',
    hideInMenu: true,
    layout: false,
  },
  {
    path: '/Hello',
    name: '你好',
    icon: 'smile',
    component: './Hello',
  },
  {
    path: '/Statistics',
    name: '数据统计',
    icon: 'smile',
    access: 'canWangguan',
    component: './Statistics',
  },
  {
    path: '/ticket',
    name: '我的报修',
    icon: 'smile',
    component: './TicketList',
  },
  {
    path: '/service',
    name: '网管页',
    icon: 'HomeOutlined',
    access: 'canWangguan',
    routes: [
      {
        path: '/service/unfix',
        name: '未维修',
        component: './wangguan/UnfixList',
      },
      {
        path: '/service/fixing',
        name: '正在维修',
        component: './wangguan/FixingList',
      },
      {
        path: '/service/fixcomplete',
        name: '维修完成',
        component: './wangguan/FixcompleteList',
      },
      {
        path: '/service/allticket',
        name: '所有维修单',
        component: './wangguan/AllTicketList',
      },
      {
        path: '/service/mywork',
        name: '我的工作',
        component: './wangguan/MyWork',
      },
    ],
  },
  {
    path: '/system',
    name: '管理页',
    icon: 'SettingOutlined',
    access: 'canSystem',
    routes: [
      {
        path: '/system/permission',
        name: '权限',
        component: './system/permission',
      },
      {
        path: '/system/class',
        name: '班次',
        component: './system/class',
      },
      {
        path: '/system/schedule',
        name: '计划班次',
        component: './system/schedule',
      },
      {
        path: '/system/ann',
        name: '公告',
        component: './system/announcement',
      },
      {
        path: '/system/systemprop',
        name: '杂项设置',
        component: './system/SystemProp',
      },
      {
        path: '/system/usermgr',
        name: '用户管理',
        component: './system/usermgr',
      },
    ],
  },
  {
    name: '用户设置',
    icon: 'UserOutlined',
    path: '/usersetting',
    component: './UserSetting',
  },
  {
    path: '/',
    redirect: '/Hello',
  },
  {
    component: './404',
  },
];
