import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button, Popconfirm, Alert, notification} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from './data';
import {getusers,createuser,updateuser,deleteuser,userresetpwd} from "@/services/system";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import PasswordForm from "./components/PasswordForm";

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
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      valueEnum: {
        'student': { text: '学生'},
        'teacher': { text: '老师'},
      },
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
              onClick={() => {
                handleUpdateFormVisible(true)
                setFormValues(record)
              }}
            >
              设置
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handlePwdchangeVisible(true)
                setFormValues(record)
              }}
            >
              重设密码
            </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={async () => {
              // @ts-ignore
              const success = await deleteuser({uid: record.uid})
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
        </>
      )
    }
  ];

  return (
    <PageHeaderWrapper>
      <Alert message="使用提示: 批量修改请到数据库进行，配合事务工具更安全可靠" type="warning" showIcon closable />
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="uid"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params) => getusers(params)}
        columns={columns}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {
          handleCreateFormVisible(false)
        }}
        onSubmit={async (value) => {
          // @ts-ignore
          const success = await createuser(value)
          if (success) {
            handleCreateFormVisible(false)
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      {FormValues &&  Object.keys(FormValues).length ? (
        <UpdateForm
          modalVisible={UpdateFormVisible}
          onCancel={() => {
            handleUpdateFormVisible(false)
            setFormValues({})
          }}
          onSubmit={async (value) => {
            // @ts-ignore
            const success = await updateuser(value)
            if (success) {
              handleUpdateFormVisible(false)
              if (actionRef.current) {
                actionRef.current.reload();
              }
              setFormValues({})
            }
          }}
          values={FormValues}
          />
      ): null}

      {FormValues &&  Object.keys(FormValues).length ? (
      <PasswordForm
        modalVisible={PwdchangeVisible}
        onCancel={() => {
          handlePwdchangeVisible(false)
          setFormValues({})
        }}
        onSubmit={async (value) => {
          // @ts-ignore
          const success = await userresetpwd(value)
          if (success) {
            notification.success({
              message: '操作成功',
              description:
                '密码更新成功',
            });
            setFormValues({})
          }
          handlePwdchangeVisible(false)
        }}
        values={FormValues}
      />
      ): null}

    </PageHeaderWrapper>
  )
}

export default TableList;
