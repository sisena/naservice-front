import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, notification } from 'antd';
import { updatemyinfo, changepassword } from '@/services/NA/user';
import PasswordForm from './PasswordForm';
import { useModel } from '@@/plugin-model/useModel';

interface InfoValsProps {
  currentUser?: NAAPI.CurrentUser;
  nickname?: string;
  email?: string;
  Address?: string;
}
const UserSetting: React.FC<InfoValsProps> = () => {
  const [PwdchangeVisible, handlePwdchangeVisible] = useState(false);
  const [InfoVals, setInfoVals] = useState<NAAPI.CurrentUser | undefined>({});
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    setInfoVals(initialState?.currentUser);
  }, []);

  const [form] = Form.useForm();

  const infosubmit = async () => {
    const fieldsValue = await form.validateFields();

    setInfoVals({ ...InfoVals, ...fieldsValue });

    updatemyinfo({ ...InfoVals, ...fieldsValue }).then((res) => {
      if (res.code === '204') {
        initialState?.fetchUserInfo?.();
        notification.success({
          message: '操作成功',
          description: '更新个人信息成功',
        });
      } else {
        notification.error({
          message: '更新失败',
          description: res.message,
        });
      }
    });
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          {...layout}
          form={form}
          initialValues={{
            nickname: initialState?.currentUser?.nickname,
            email: initialState?.currentUser?.email,
            Address: initialState?.currentUser?.Address,
          }}
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, max: 10, message: '昵称不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, max: 50, type: 'email', message: '邮件不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Address"
            label="宿舍号"
            rules={[{ required: true, max: 30, message: '宿舍号不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} label="" colon={false}>
            <Button type="primary" onClick={infosubmit}>
              更新
            </Button>
            <Button
              onClick={() => {
                handlePwdchangeVisible(true);
              }}
              style={{ marginLeft: 10 }}
            >
              更改密码？
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <PasswordForm
        modalVisible={PwdchangeVisible}
        onCancel={() => {
          handlePwdchangeVisible(false);
        }}
        onSubmit={async (value) => {
          await changepassword(value).then((res) => {
            if (res.code === '204') {
              notification.success({
                message: '操作成功',
                description: '密码更新成功',
              });
            } else {
              notification.error({
                message: '更新失败',
                description: res.message,
              });
            }
          });
          handlePwdchangeVisible(false);
        }}
      />
    </PageHeaderWrapper>
  );
};

export default UserSetting;
