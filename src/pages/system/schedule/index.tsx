import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Popconfirm, Alert, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data';
import {
  getallschedule,
  addschedule,
  updateschedule,
  deleteschedule,
  refreshschedule,
} from '@/services/NA/system';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import PreviewSchedule from '@/pages/system/schedule/components/PreviewSchedules';

const TableList: React.FC<{}> = () => {
  const [FormValues, setFormValues] = useState({});
  const [UpdateFormVisible, handleUpdateFormVisible] = useState<boolean>(false);
  const [CreateFormVisible, handleCreateFormVisible] = useState<boolean>(false);
  const [PreviewVisible, handlePreviewVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '班次id',
      dataIndex: 'class',
      hideInSearch: true,
    },
    {
      title: '细节',
      dataIndex: 'descript',
      ellipsis: true,
    },
    {
      title: '最大容纳单数',
      dataIndex: 'maxticket',
      hideInSearch: true,
    },
    {
      title: '已经报单数',
      dataIndex: 'hasticket',
      hideInSearch: true,
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
            onClick={() => {
              handleUpdateFormVisible(true);
              setFormValues(record);
            }}
          >
            设置
          </Button>
          <Popconfirm
            title="此操作只是为了删除错误的手动新建，该日未到达依然会自动创建，确认删除?"
            onConfirm={async () => {
              await deleteschedule({ id: record.id }).then((res) => {
                if (res.code === '204') {
                  notification.success({
                    message: '删除完成',
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
        </>
      ),
    },
  ];

  const refreshschedulehandle = async () => {
    await refreshschedule().then((msg) => {
      if (msg.code === '200') {
        notification.success({
          message: '刷新成功',
        });
      }
    });
  };

  return (
    <PageHeaderWrapper>
      <Alert
        message="使用提示: 如果某一天不提供报修服务,可以将这天最大容纳量设置为0"
        type="warning"
        showIcon
        closable
      />
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => refreshschedulehandle()}>
            刷新报修时间段
          </Button>,
          <Button type="primary" onClick={() => handlePreviewVisible(true)}>
            预览报修时间段
          </Button>,
        ]}
        request={(params) => getallschedule(params)}
        columns={columns}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {
          handleCreateFormVisible(false);
        }}
        onSubmit={async (value) => {
          await addschedule(value).then((res) => {
            if (res.code === '201') {
              notification.success({
                message: '添加成功',
              });
              handleCreateFormVisible(false);
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
      />

      <PreviewSchedule
        modalVisible={PreviewVisible}
        onCancel={() => {
          handlePreviewVisible(false);
        }}
      />

      {FormValues && Object.keys(FormValues).length ? (
        <UpdateForm
          modalVisible={UpdateFormVisible}
          onCancel={() => {
            handleUpdateFormVisible(false);
            setFormValues({});
          }}
          onSubmit={async (value) => {
            await updateschedule(value).then((res) => {
              if (res.code === '204') {
                notification.success({
                  message: '更新成功',
                });
                handleUpdateFormVisible(false);
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
    </PageHeaderWrapper>
  );
};

export default TableList;
