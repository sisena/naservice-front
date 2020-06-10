import React, {useRef, useState} from 'react';
import {
  PlusOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button, Tag, Popconfirm} from 'antd';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from './data';
import {getmyhistory, createticket, ticketupdate, cancelticket} from "@/services/basis_ticket";
import CreateForm from "@/pages/TicketList/components/CreateForm";
import UpdateForm from "@/pages/TicketList/components/UpdateForm";

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false); //创建报修的表单是否显示
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
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
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {(record.status == '未完成') ?
            <Button
              type="primary"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              设置
            </Button>
            :
            <Button
              type="primary"
              disabled
            >
              设置
            </Button>
          }
          {(record.status == '未完成') ?
            <Popconfirm
              title="确定删除?"
              onConfirm={async () => {
                // @ts-ignore //这里因为后端的query是ticketid,为了不搞乱data.d.ts就不写进去了
                const success = await cancelticket({ticketid: record.id})
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
              okText="是"
              cancelText="否"
            >
              <Button
                danger
              >
                删除
              </Button>
            </Popconfirm>
            :
            <Button
              danger
              disabled
            >
              删除
            </Button>
          }
        </>
      )
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params) => getmyhistory(params)}
        columns={columns}
        search={false}
      />

      <CreateForm
        onSubmit={async (value) => {
          const success = await createticket(value);
          if (success) {
            handleModalVisible(false);
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({})
        }}
        createModalVisible={createModalVisible}
        values={stepFormValues}
      />

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await ticketupdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  )
}

export default TableList;
