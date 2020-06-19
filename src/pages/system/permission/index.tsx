import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button, Popconfirm} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from './data';
import {getallpermission, addpermission, deletepermission, updatepermission} from "@/services/system";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

const TableList: React.FC<{}> = () => {
  const [FormValues, setFormValues] = useState({});
  const [UpdateFormVisible, handleUpdateFormVisible] = useState<boolean>(false);
  const [CreateFormVisible, handleCreateFormVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'uid',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        'admin': { text: '管理员'},
        'staff': { text: '网管'},
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
                setFormValues(record)
                handleUpdateFormVisible(true)
              }}
            >
              设置
            </Button>
            <Popconfirm
              title="确定删除?"
              onConfirm={async () => {
                const success = await deletepermission({id: record.uid})
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
                style={{ margin: 2 }}
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
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="uid"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params) => getallpermission(params)}
        columns={columns}
        search={false}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {handleCreateFormVisible(false)}}
        onSubmit={async (value) => {
          const success = await addpermission(value);
        if (success) {
          handleCreateFormVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }} />

      {FormValues &&  Object.keys(FormValues).length ? (
        <UpdateForm
          modalVisible={UpdateFormVisible}
          onCancel={() => {
            handleUpdateFormVisible(false)
            setFormValues({})
          }}
          onSubmit={async (value) => {
            const success = await updatepermission(value);
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
      ):null}
    </PageHeaderWrapper>
  )
}

export default TableList;
