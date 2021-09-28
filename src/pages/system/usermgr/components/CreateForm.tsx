import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { TableListItem } from '../data';

const FormItem = Form.Item;
const { Option } = Select;

export interface FormValueType extends Partial<TableListItem> {}

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({});

  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    // console.log(str)
    setFormVals({ ...formVals, ...fieldsValue });
    //console.log({ ...formVals,  ...fieldsValue,date: DateVals });
    onSubmit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="新增用户"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form
        preserve={false}
        form={form}
        initialValues={{
          type: 'student',
        }}
      >
        <FormItem
          name="uid"
          label="学号/工号"
          rules={[{ required: true, max: 20, message: '请输入正确的学号/工号！' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="name"
          label="真实姓名"
          rules={[{ required: true, max: 10, message: '请输入真实名字！' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="nickname"
          label="昵称"
          rules={[{ required: true, max: 10, message: '可以同上！' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="gender" label="性别" rules={[{ required: true, message: '请选择性别！' }]}>
          <Select>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </FormItem>
        <FormItem
          name="email"
          label="email"
          rules={[{ required: true, type: 'email', max: 50, message: '请输入邮箱！' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="Address"
          label="宿舍号"
          rules={[{ required: true, max: 30, message: '请输入宿舍号！' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
