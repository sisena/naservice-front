import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Popconfirm, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data';
import { getallann, createann, deleteann, updateann } from '@/services/NA/system';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const TableList: React.FC<{}> = () => {
  const [FormValues, setFormValues] = useState({});
  const [UpdateFormVisible, handleUpdateFormVisible] = useState<boolean>(false);
  const [CreateFormVisible, handleCreateFormVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'text',
    },
    {
      title: '状态',
      dataIndex: 'is_vaild',
      ellipsis: true,
      valueEnum: {
        true: { text: '开启' },
        false: { text: '关闭' },
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
            onClick={() => {
              setFormValues(record);
              handleUpdateFormVisible(true);
            }}
          >
            设置
          </Button>
          <Popconfirm
            title="确定删除?"
            onConfirm={async () => {
              await deleteann({ id: record.id }).then((res) => {
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
            <Button style={{ margin: 2 }} danger>
              删除
            </Button>
          </Popconfirm>
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
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => getallann(params)}
        columns={columns}
        search={false}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {
          handleCreateFormVisible(false);
        }}
        onSubmit={async (value) => {
          await createann(value).then((res) => {
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

      {FormValues && Object.keys(FormValues).length ? (
        <UpdateForm
          modalVisible={UpdateFormVisible}
          onCancel={() => {
            handleUpdateFormVisible(false);
            setFormValues({});
          }}
          onSubmit={async (value) => {
            await updateann(value).then((res) => {
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
