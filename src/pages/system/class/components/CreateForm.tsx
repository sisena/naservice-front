import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { TableListItem } from '../data';

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

    setFormVals({ ...formVals, ...fieldsValue });

    onSubmit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="新增班次"
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
          type: 'student',
        }}
      >
        <FormItem
          name="start_time"
          label="开始时间"
          rules={[{ required: true, message: '请输入开始时间！' }]}
        >
          <Input placeholder="xx:xx:xx 确保格式正确" />
        </FormItem>
        <FormItem
          name="end_time"
          label="结束时间"
          rules={[{ required: true, message: '请输入结束时间！' }]}
        >
          <Input placeholder="xx:xx:xx 确保格式正确" />
        </FormItem>
        <FormItem
          name="zone"
          label="区域"
          rules={[{ required: true, max: 30, message: '请输入区域！' }]}
        >
          <Input placeholder="xx:xx:xx 确保格式正确" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
