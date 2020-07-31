import React, { useState } from 'react';
import { Form, Button,  Input, Modal, Steps } from 'antd';

import { TableListItem } from '../data';
import ScheduleOption from "@/pages/TicketList/components/ScheduleOption";

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  description?: string;
  destination?: string;
  name?: string;
  phone?: string;
  schedule?: string;
  title?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    description: props.values.description,
    destination: props.values.destination,
    name: props.values.name,
    phone: props.values.phone,
    schedule: props.values.schedule,
    title: props.values.title,
  });
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue })
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem
            name="title"
            label="问题概述"
            rules={[{ required: true, max: 30, message: '请输入问题概述！' }]}
          >
            <Input placeholder="请输入概述" />
          </FormItem>
          <FormItem
            name="description"
            label="问题描述"
          >
            <TextArea rows={4}/>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
            <ScheduleOption/>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="姓名"
          rules={[{ required: true, max: 10,message: '请输入需要维修者姓名！' }]}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
          rules={[{ required: true, max: 30,message: '请输入手机号！' }]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
        <FormItem
          name="destination"
          label="维修地点"
          rules={[{ required: true, max: 100, message: '请输入维修地点！' }]}
        >
          <Input placeholder="请输入维修地点" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="更新我的报修"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="问题描述" />
        <Step title="选择时间" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          description: formVals.description,
          destination: formVals.destination,
          name: formVals.name,
          phone: formVals.phone,
          title: formVals.title,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
