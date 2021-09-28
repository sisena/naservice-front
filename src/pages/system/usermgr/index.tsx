import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Popconfirm, Alert, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data';
import { getusers, createuser, updateuser, deleteuser, userresetpwd } from '@/services/NA/system';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import PasswordForm from './components/PasswordForm';

const TableList: React.FC<{}> = () => {
  const [FormValues, setFormValues] = useState({});
  const [UpdateFormVisible, handleUpdateFormVisible] = useState<boolean>(false);
  const [CreateFormVisible, handleCreateFormVisible] = useState<boolean>(false);
  const [PwdchangeVisible, handlePwdchangeVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'uid',
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      ellipsis: true,
    },
    {
      title: '宿舍号',
      dataIndex: 'Address',
      ellipsis: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
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
          <Button
            type="primary"
            style={{ margin: 2 }}
            onClick={() => {
              handlePwdchangeVisible(true);
              setFormValues(record);
            }}
          >
            重设密码
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={async () => {
              await deleteuser({ uid: record.uid }).then((res) => {
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
      <Alert
        message="使用提示: 批量修改请到数据库进行，配合事务工具更安全可靠"
        type="warning"
        showIcon
        closable
      />
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="uid"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => getusers(params)}
        columns={columns}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {
          handleCreateFormVisible(false);
        }}
        onSubmit={async (value) => {
          await createuser(value).then((res) => {
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
            await updateuser(value).then((res) => {
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

      {FormValues && Object.keys(FormValues).length ? (
        <PasswordForm
          modalVisible={PwdchangeVisible}
          onCancel={() => {
            handlePwdchangeVisible(false);
            setFormValues({});
          }}
          onSubmit={async (value) => {
            await userresetpwd(value).then((res) => {
              if (res.code === '204') {
                notification.success({
                  message: '更新成功',
                });
                setFormValues({});
              }
              handlePwdchangeVisible(false);
            });
          }}
          values={FormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
