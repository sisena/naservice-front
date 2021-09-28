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

    setFormVals({ ...formVals, ...fieldsValue });

    onSubmit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="新增公告"
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
          is_vaild: 'true',
        }}
      >
        <FormItem
          name="title"
          label="标题"
          rules={[{ required: true, max: 100, message: '请输入标题！' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="text"
          label="内容"
          rules={[{ required: true, max: 100, message: '请输入公告内容！' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="is_vaild" label="是否开启">
          <Select>
            <Option value="true">开启</Option>
            <Option value="false">关闭</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
