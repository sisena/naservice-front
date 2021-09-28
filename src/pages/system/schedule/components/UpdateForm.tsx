import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { TableListItem } from '../data';

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
    id: props.values.id,
    date: props.values.date,
    class: props.values.class,
    descript: props.values.descript,
    maxticket: props.values.maxticket,
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
      title="更新计划班次"
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
          descript: formVals.descript,
          maxticket: formVals.maxticket,
        }}
      >
        <FormItem
          name="descript"
          label="描述"
          rules={[{ required: true, max: 100, message: '请输入描述！' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="maxticket"
          label="最大班数"
          rules={[{ required: true, message: '请输入描述！' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
