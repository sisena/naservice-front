import React, { useRef, useState } from 'react';
import { ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tag, notification } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from '../data';
import { getuncompletetickets, acceptticket } from '@/services/NA/handle_ticket';
import UserDetail from '@/components/UserDetail';
import TicketDetail from '@/components/TicketDetail';

const TableList: React.FC<{}> = () => {
  const [UserDrawVisible, handleUserDrawVisible] = useState<boolean>(false);
  const [DetailVal, setDetailVal] = useState({});
  const [TicketDetailVisible, handleTicketDetailVisible] = useState<boolean>(false);
  const [TicketDetailVal, setTicketDetailVal] = useState({});

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
      render: (name, record) => (
        <a
          onClick={() => {
            handleUserDrawVisible(true);
            setDetailVal(record);
          }}
        >
          {name}
        </a>
      ),
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
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            未知
          </Tag>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ margin: 2 }}
            onClick={async () => {
              acceptticket({ ticketid: record.id }).then((res) => {
                if (res.code === '204') {
                  notification.success({
                    message: '接单成功',
                  });
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                } else {
                  notification.error({
                    message: '发生错误',
                    description: res.message,
                  });
                }
              });
            }}
          >
            接单
          </Button>
          <Button
            style={{ margin: 2 }}
            onClick={() => {
              handleTicketDetailVisible(true);
              setTicketDetailVal(record);
            }}
          >
            详细信息
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        request={(params) => getuncompletetickets(params)}
        columns={columns}
      />

      {DetailVal && Object.keys(DetailVal).length ? (
        <UserDetail
          onClose={() => {
            handleUserDrawVisible(false);
            setDetailVal({});
          }}
          UserDrawVisible={UserDrawVisible}
          value={DetailVal}
        />
      ) : null}

      {TicketDetailVal && Object.keys(TicketDetailVal).length ? (
        <TicketDetail
          value={TicketDetailVal}
          TicketDetailVisible={TicketDetailVisible}
          onClose={() => {
            handleTicketDetailVisible(false);
            setTicketDetailVal({});
          }}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
