import React, { useRef, useState } from 'react';
import {
  PlusOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tag, Popconfirm, notification } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { getmyhistory, createticket, ticketupdate, cancelticket } from '@/services/NA/basis_ticket';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import TicketDetail from '@/components/TicketDetail';

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false); //创建报修的表单是否显示
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [TicketDetailVisible, handleTicketDetailVisible] = useState<boolean>(false);
  const [TicketDetailVal, setTicketDetailVal] = useState({});

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
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
              您已取消
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
          {record.status == '未完成' ? (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
              style={{ margin: 2 }}
            >
              设置
            </Button>
          ) : (
            <Button type="primary" disabled style={{ margin: 2 }}>
              设置
            </Button>
          )}
          {record.status == '未完成' ? (
            <Popconfirm
              title="确定取消?"
              onConfirm={async () => {
                await cancelticket({ ticketid: record.id }).then((res) => {
                  if (res.code == 204) {
                    notification.success({
                      message: '取消完成',
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
              okText="是"
              cancelText="否"
            >
              <Button danger style={{ margin: 2 }}>
                删除
              </Button>
            </Popconfirm>
          ) : (
            <Button danger disabled style={{ margin: 2 }}>
              删除
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
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => getmyhistory(params)}
        columns={columns}
        search={false}
      />

      <CreateForm
        onSubmit={async (value) => {
          await createticket(value).then((res) => {
            if (res.code == 201) {
              notification.success({
                message: '创建成功',
              });
              handleModalVisible(false);
              setStepFormValues({});
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
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        createModalVisible={createModalVisible}
        values={stepFormValues}
      />

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            await ticketupdate(value).then((res) => {
              if (res.code == 204) {
                notification.success({
                  message: '更新成功',
                });
                handleUpdateModalVisible(false);
                setStepFormValues({});
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
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
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
