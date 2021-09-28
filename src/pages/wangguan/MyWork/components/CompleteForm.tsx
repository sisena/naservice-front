import React, { useState } from 'react';
import { Modal, Form, Select } from 'antd';
import type { TableListItem } from '../../data';

const { Option } = Select;
const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  reply?: string;
}

interface CompleteFormProps {
  values: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
}

const CompleteForm: React.FC<CompleteFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
  });

  const { modalVisible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    let str = '';
    for (const v of fieldsValue.reply) {
      str = str + v + '';
    }

    setFormVals({ ...formVals, reply: str });

    onSubmit({ ...formVals, reply: str });
  };

  return (
    <Modal
      destroyOnClose
      title="填写问题"
      okText="确定"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => submit()}
    >
      <Form preserve={false} form={form}>
        <FormItem
          name="reply"
          label="回复"
          rules={[{ required: true, message: '请输入回复内容！' }]}
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Option value="您的问题已经处理完成，感谢您对NA的支持，祝您生活愉快！O(∩_∩)O">
              您的问题已经处理完成，感谢您对NA的支持，祝您生活愉快！O(∩_∩)O
            </Option>
            <Option value="您好，此问题不在我们服务范围之内，感谢您使用报修网，祝您生活愉快！">
              您好，此问题不在我们服务范围之内，感谢您使用报修网，祝您生活愉快！
            </Option>
            <Option value="您好，网管已上门维修，由于宿舍无人，请您重新报修。">
              您好，网管已上门维修，由于宿舍无人，请您重新报修。
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CompleteForm;
