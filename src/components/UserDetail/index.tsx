import React, { useEffect, useState } from 'react';
import { Drawer, Tag } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { getuserinfo } from '@/services/NA/user';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getpeoplehistory } from '@/services/NA/handle_ticket';
import { TableListItem } from '@/pages/wangguan/data';

interface UserDetailProps {
  value: any;
  UserDrawVisible: boolean;
  onClose: () => void;
}

interface UserDetailData {
  Address: string;
  email: string;
  gender: string;
  name: string;
  nickname: string;
  type: string;
  uid: string;
}

const UserDetail: React.FC<UserDetailProps> = (props) => {
  const { UserDrawVisible, onClose, value } = props;
  const [Userdata, setUserdata] = useState<UserDetailData>({
    Address: '',
    email: '',
    gender: '',
    name: '',
    nickname: '',
    type: '',
    uid: '',
  });
  const columns: ProColumns<any>[] = [
    {
      title: '上门时间',
      width: 300,
      dataIndex: 'schedule',
    },
    {
      title: '联系人',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '宿舍号',
      dataIndex: 'destination',
      ellipsis: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 120,
      ellipsis: true,
    },
    {
      title: '详细描述',
      dataIndex: 'description',
      width: 170,
      ellipsis: true,
    },
    {
      title: '维修人',
      dataIndex: 'staff',
      ellipsis: true,
    },
    {
      title: '回复',
      dataIndex: 'reply',
      width: 150,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        if (record.status === '未完成') {
          return (
            <Tag icon={<ClockCircleOutlined />} color="default">
              等待维修
            </Tag>
          );
        }
        if (record.status === '维修完成') {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              维修完成
            </Tag>
          );
        }
        if (record.status === '正在维修') {
          return (
            <Tag icon={<SyncOutlined spin />} color="processing">
              正在维修
            </Tag>
          );
        }
        if (record.status === '机主取消') {
          return (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              机主取消
            </Tag>
          );
        }
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            未知
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    getuserinfo({ id: value.owner }).then((msg) => {
      if (msg.code == 200) {
        setUserdata(msg.data);
      }
    });
  }, []);

  return (
    <>
      <Drawer
        title="用户信息"
        width={1100}
        placement="right"
        closable={false}
        onClose={() => onClose()}
        visible={UserDrawVisible}
        destroyOnClose
      >
        <p>学号:{Userdata.uid}</p>
        <p>姓名:{Userdata.name}</p>
        <p>昵称:{Userdata.nickname}</p>
        <p>性别:{Userdata.gender}</p>
        <p>地址:{Userdata.Address}</p>
        <p>email:{Userdata.email}</p>

        <ProTable<TableListItem>
          rowKey="key"
          request={() => getpeoplehistory({ uid: value.owner })}
          columns={columns}
          search={false}
        />
      </Drawer>
    </>
  );
};

export default UserDetail;
