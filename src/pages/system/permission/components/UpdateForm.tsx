import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { TableListItem } from '../data';

const { Option } = Select;
const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {
  uid?: string;
  role?: string;
}

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    uid: props.values.uid,
    role: props.values.role,
  });

  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    // console.log(str)
    setFormVals({ ...formVals, ...fieldsValue });
    // console.log({ ...formVals, reply: str });
    onSubmit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="更新权限"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form
        form={form}
        preserve={false}
        initialValues={{
          uid: formVals.uid,
          role: formVals.role,
        }}
      >
        <FormItem
          name="uid"
          label="学号"
          rules={[{ required: true, max: 20, message: '请输入学号！' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="role" label="权限">
          <Select>
            <Option value="staff">网管</Option>
            <Option value="admin">管理员</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
