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
