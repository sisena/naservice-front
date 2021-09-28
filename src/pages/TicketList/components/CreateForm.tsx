import React from 'react';
import { Modal } from 'antd';
import { TableListItem } from '../data';
import { useModel } from '@@/plugin-model/useModel';
import { ProFormText, ProFormTextArea, StepsForm } from '@ant-design/pro-form';
import ScheduleOption from '@/pages/TicketList/components/ScheduleOption';

export interface FormValueType extends Partial<TableListItem> {
  description?: string;
  destination?: string;
  name?: string;
  phone?: string;
  schedule?: string;
  title?: string;
}

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  createModalVisible: boolean;
  values: Partial<TableListItem>;
  currentUser?: NAAPI.CurrentUser;
}

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { initialState } = useModel('@@initialState');

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
            visible={props.createModalVisible}
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
          name: initialState?.currentUser?.name,
          destination: initialState?.currentUser?.Address,
        }}
        title="基本信息"
      >
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

      <StepsForm.StepForm title="问题描述">
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

export default CreateForm;
