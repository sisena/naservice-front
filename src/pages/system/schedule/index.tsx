import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Button,Popconfirm} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {TableListItem} from './data';
import {getallschedule, addschedule, updateschedule, deleteschedule} from "@/services/system";
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
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '班次id',
      dataIndex: 'class',
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
      title: '细节',
      dataIndex: 'descript',
      ellipsis: true,
    },
    {
      title: '最大容纳单数',
      dataIndex: 'maxticket',
    },
    {
      title: '已经报单数',
      dataIndex: 'hasticket',
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
          <Popconfirm
            title="此操作只是为了删除错误的手动新建，该日未到达依然会自动创建，确认删除?"
            onConfirm={async () => {
              // @ts-ignore
              const success = await deleteschedule({id: record.id})
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
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params) => getallschedule(params)}
        columns={columns}
        search={false}
      />

      <CreateForm
        modalVisible={CreateFormVisible}
        onCancel={() => {
          handleCreateFormVisible(false)
        }}
        onSubmit={async (value) => {
          // @ts-ignore
          const success = await addschedule(value)
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
            const success = await updateschedule(value)
            if (success) {
              handleUpdateFormVisible(false)
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          values={FormValues}
          />
      ): null}
    </PageHeaderWrapper>
  )
}

export default TableList;
