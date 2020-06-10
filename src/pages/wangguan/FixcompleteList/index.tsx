import React, {useRef, useState} from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Tag} from 'antd';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from '../data';
import {getcompletetickets} from "@/services/handle_ticket";
import UserDetail from "@/components/UserDetail";

const TableList: React.FC<{}> = () => {
  const [UserDrawVisible, handleUserDrawVisible] = useState<boolean>(false);
  const [DetailVal, setDetailVal] = useState({});

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '预约时间',
      width: 300,
      dataIndex: 'schedule',
    },
    {
      title: '联系人',
      dataIndex: 'name',
      ellipsis: true,
      render: (name,record) => <a onClick={() => {
        handleUserDrawVisible(true)
        setDetailVal(record)
      }}
      >
        {name}
      </a>
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      valueEnum: {
        'student': { text: '学生'},
        'teacher': { text: '老师'},
      },
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
            <Tag icon={<ClockCircleOutlined/>} color="default">
              等待维修
            </Tag>
          )
        }
        if (record.status === '维修完成') {
          return (
            <Tag icon={<CheckCircleOutlined/>} color="success">
              维修完成
            </Tag>
          )
        }
        if (record.status === '正在维修') {
          return (
            <Tag icon={<SyncOutlined spin/>} color="processing">
              正在维修
            </Tag>
          )
        }
        if (record.status === '机主取消') {
          return (
            <Tag icon={<ExclamationCircleOutlined/>} color="warning">
              您已取消
            </Tag>
          )
        }
        return (
          <Tag icon={<CloseCircleOutlined/>} color="error">
            未知
          </Tag>
        )
      }
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        request={(params) => getcompletetickets(params)}
        columns={columns}
        search={false}
      />

      {DetailVal && Object.keys(DetailVal). length ? (<UserDetail
        onClose={() => {
          handleUserDrawVisible(false);
          setDetailVal({});
        }}
        UserDrawVisible={UserDrawVisible}
        value={DetailVal}
      />): null }

    </PageHeaderWrapper>
  )
}

export default TableList;
