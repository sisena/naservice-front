import React, { useState } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { TableListItem } from '../data';

const { Option } = Select;
const FormItem = Form.Item;

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
    // console.log({ ...formVals, reply: str });
    onSubmit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="新增权限"
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
          role: 'staff',
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

export default CreateForm;
