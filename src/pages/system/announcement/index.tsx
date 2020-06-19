import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button, Popconfirm} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from './data';
import {getallann,createann,deleteann,updateann} from "@/services/system";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

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
        'true': {text: '开启'},
        'false': {text: '关闭'},
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
              const success = await deleteann({id: record.id});
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
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params) => getallann(params)}
        columns={columns}
        search={false}
      />

      <CreateForm modalVisible={CreateFormVisible}
       onCancel={() => {
          handleCreateFormVisible(false)
        }}
        onSubmit={async (value) => {
          const success = await createann(value)
          if (success) {
           handleCreateFormVisible(false)
           if (actionRef.current) {
              actionRef.current.reload();
              }
            }
        }}
      />

      {FormValues && Object.keys(FormValues).length ? (
        <UpdateForm
          modalVisible={UpdateFormVisible}
          onCancel={() => {
            handleUpdateFormVisible(false)
            setFormValues({})
          }}
          onSubmit={async (value) => {
            const success = await updateann(value)
            if (success) {
              handleUpdateFormVisible(false)
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          values={FormValues}
        />
      ) : null}

    </PageHeaderWrapper>
  )
}

export default TableList;
