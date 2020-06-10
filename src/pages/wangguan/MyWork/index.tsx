import React, {useRef, useState} from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button, Tag} from 'antd';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from '../data';
import {getmyticket, abortticket, finishticket} from "@/services/handle_ticket";
import CompleteForm from '@/pages/wangguan/MyWork/components/CompleteForm'
import UserDetail from "@/components/UserDetail";

const TableList: React.FC<{}> = () => {
  const [ModalVisible, handleModalVisible] = useState<boolean>(false);
  const [UserDrawVisible, handleUserDrawVisible] = useState<boolean>(false);
  const [FormValues, setFormValues] = useState({});
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
          {(record.status == '正在维修') ?
            <Button
              type="primary"
              onClick={() => {
                setFormValues(record);
                handleModalVisible(true);
                console.log(FormValues);
              }}
            >
              消单
            </Button>
            :
            <Button
              type="primary"
              disabled
            >
              消单
            </Button>
          }
          {(record.status == '正在维修') ?
            <Button
              type="primary"
              onClick={async () => {
                // @ts-ignore
                const success = await abortticket({ticketid: record.id})
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
            >
              取消
            </Button>
            :
            <Button
              danger
              disabled
            >
              取消
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
            const success = await finishticket(value)
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          values={FormValues}
        />
      ) : null}

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
