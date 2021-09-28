import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import type { TableListItem } from '../data';

const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {
  uid?: string;
  password?: string;
  password_again?: string;
}

interface PasswordFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
  values: FormValueType;
}

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    uid: props.values.uid,
  });

  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    onSubmit({ ...formVals, ...fieldsValue });

    form.resetFields();
  };

  return (
    <Modal
      destroyOnClose
      title="更新密码"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form form={form}>
        <FormItem
          label="新密码"
          name="password"
          rules={[{ required: true, max: 100, message: '新密码不为空!' }]}
        >
          <Input.Password />
        </FormItem>
        <FormItem
          label="再一次新密码"
          name="password_again"
          rules={[{ required: true, max: 100, message: '两次密码不一致!' }]}
        >
          <Input.Password />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default PasswordForm;
