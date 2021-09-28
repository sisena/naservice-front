import React from 'react';

import { TableListItem } from '../data';
import { ProFormText, ProFormTextArea, StepsForm } from '@ant-design/pro-form';
import ScheduleOption from '@/pages/TicketList/components/ScheduleOption';
import { Modal } from 'antd';

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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="报修单"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          id: props.values.id,
          destination: props.values.destination,
          name: props.values.name,
          phone: props.values.phone,
        }}
        title="基本信息"
      >
        <ProFormText name="id" hidden />
        <ProFormText
          name="name"
          label="姓名"
          width="md"
          rules={[{ required: true, max: 10, message: '请输入需要维修者姓名！' }]}
        />
        <ProFormText
          name="phone"
          label="手机号"
          width="md"
          rules={[{ required: true, max: 30, message: '请输入手机号！' }]}
        />
        <ProFormText
          name="destination"
          label="宿舍号"
          width="md"
          rules={[{ required: true, max: 100, message: '请输入维修地点！' }]}
        />
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          description: props.values.description,
          title: props.values.title,
        }}
        title="问题描述"
      >
        <ProFormText
          name="title"
          label="问题概述"
          width="md"
          rules={[{ required: true, max: 30, message: '请输入不多于30字问题概述！' }]}
        />
        <ProFormTextArea
          name="description"
          width="md"
          label="问题描述"
          placeholder="请输入不多于30字问题概述"
          rules={[{ required: true, max: 30, message: '请输入不多于30字问题概述！' }]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm title="选择时间段">
        <ScheduleOption />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
