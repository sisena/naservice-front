import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { TableListItem } from '../data';

const { Option } = Select;
const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {}

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    title: props.values.title,
    text: props.values.text,
    is_vaild: props.values.is_vaild,
  });

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
      title="更新公告"
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
          id: formVals.id,
          title: formVals.title,
          text: formVals.text,
          is_vaild: formVals.is_vaild,
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

export default UpdateForm;
