import React, {useState} from 'react';
import { Modal,Form,Input,Select } from 'antd';
import {TableListItem} from '../data';

const { Option } = Select;
const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  start_time?: string;
  end_time?: string;
  type?: string;
  zone?: string;
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
    start_time: props.values.start_time,
    end_time: props.values.end_time,
    type: props.values.type,
    zone: props.values.zone,
  });

  // @ts-ignore
  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.getFieldsValue();

    setFormVals({...formVals , ...fieldsValue });

    onSubmit({ ...formVals, ...fieldsValue });
  }

  return (
    <Modal
      destroyOnClose
      title="更新班次"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form
        form={form}
        initialValues={{
          id: formVals.id,
          start_time: formVals.start_time,
          end_time: formVals.end_time,
          type: formVals.type,
          zone: formVals.zone,
        }}
      >
        <FormItem name="start_time" label="开始时间" rules={[{ required: true, message: '请输入开始时间！' }]}>
          <Input placeholder="xx:xx:xx 确保格式正确"/>
        </FormItem>
        <FormItem name="end_time" label="结束时间" rules={[{ required: true, message: '请输入结束时间！' }]}>
          <Input placeholder="xx:xx:xx 确保格式正确"/>
        </FormItem>
        <FormItem name="type" label="类型">
          <Select>
            <Option value="student">学生</Option>
            <Option value="teacher">老师</Option>
          </Select>
        </FormItem>
        <FormItem name="zone" label="区域" rules={[{ required: true, message: '请输入区域！' }]}>
          <Input placeholder="xx:xx:xx 确保格式正确"/>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
