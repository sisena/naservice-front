import React, { useState } from 'react';
import { Modal, Form, DatePicker } from 'antd';
import type { TableListItem } from '../data';
import ClassOption from './ClassOption';

const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {}

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({});
  const [DateVals, setDateVals] = useState('');

  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.getFieldsValue();

    setFormVals({ ...formVals, ...fieldsValue });

    onSubmit({ ...formVals, ...fieldsValue, date: DateVals });
  };

  const formatDate = (date: any, dateString: any) => {
    setDateVals(dateString);
  };

  return (
    <Modal
      destroyOnClose
      title="新增计划班次"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form preserve={false} form={form}>
        <ClassOption />
        <FormItem name="date" label="日期">
          <DatePicker onChange={formatDate} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
