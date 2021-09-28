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
    path: '/Hello',
    name: '你好',
    icon: 'smile',
    component: './Hello',
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
        path: '/system/vacation',
        name: '假期设置',
        component: './system/VacationSetting',
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
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/Hello',
  },
  {
    component: './404',
  },
];
