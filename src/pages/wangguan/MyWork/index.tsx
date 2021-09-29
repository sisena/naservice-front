import React, { useRef, useState } from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tag, notification } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from '../data';
import { getmyticket, abortticket, finishticket } from '@/services/NA/handle_ticket';
import CompleteForm from './components/CompleteForm';
import UserDetail from '@/components/UserDetail';
import TicketDetail from '@/components/TicketDetail';

const TableList: React.FC<{}> = () => {
  const [ModalVisible, handleModalVisible] = useState<boolean>(false);
  const [UserDrawVisible, handleUserDrawVisible] = useState<boolean>(false);
  const [FormValues, setFormValues] = useState({});
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
      width: 120,
      dataIndex: 'title',
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {record.status === '正在维修' ? (
            <Button
              type="primary"
              style={{ margin: 2 }}
              onClick={() => {
                setFormValues(record);
                handleModalVisible(true);
              }}
            >
              消单
            </Button>
          ) : (
            <Button type="primary" disabled style={{ margin: 2 }}>
              消单
            </Button>
          )}
          {record.status === '正在维修' ? (
            <Button
              type="dashed"
              style={{ margin: 2 }}
              onClick={async () => {
                await abortticket({ ticketid: record.id }).then((res) => {
                  if (res.code === '204') {
                    notification.success({
                      message: '成功取消',
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
              取消
            </Button>
          ) : (
            <Button danger disabled style={{ margin: 2 }}>
              取消
            </Button>
          )}
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
        request={(params) => getmyticket(params)}
        columns={columns}
        search={false}
      />

      {FormValues && Object.keys(FormValues).length ? (
        <CompleteForm
          modalVisible={ModalVisible}
          onCancel={() => {
            handleModalVisible(false);
            setFormValues({});
          }}
          onSubmit={async (value) => {
            await finishticket(value).then((res) => {
              if (res.code === '204') {
                notification.success({
                  message: '消单完成',
                });
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
                setFormValues({});
              } else {
                notification.error({
                  message: '发生错误',
                  description: res.message,
                });
              }
            });
          }}
          values={FormValues}
        />
      ) : null}

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
