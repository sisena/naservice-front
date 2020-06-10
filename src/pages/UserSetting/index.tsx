import React, {useEffect, useState} from 'react'
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Form, Input, Button,Card,notification} from 'antd';
import { connect} from 'umi';
import {UserModelState} from "@/models/user";
import {ConnectState} from "@/models/connect";
import {updatemyinfo,changepassword} from "@/services/user";
import PasswordForm from "./PasswordForm";

const UserSetting: React.FC<UserModelState> = (props) => {
  // @ts-ignore
  const { currentUser,dispatch } = props
  const [PwdchangeVisible, handlePwdchangeVisible] = useState(false);
  const [InfoVals, setInfoVals] = useState<UserModelState>({
    // @ts-ignore
    nickname: currentUser?.nickname,
    email: currentUser?.email,
    Address: currentUser?.Address,
  });

  useEffect(() => {
    // @ts-ignore
    setInfoVals(currentUser)
  },[])

  const [form] = Form.useForm();

  const infosubmit = async () => {
    const fieldsValue = await form.getFieldsValue();

    setInfoVals({...InfoVals , ...fieldsValue});

    const success =await updatemyinfo({ ...InfoVals, ...fieldsValue });
    if (success) {
      if (dispatch) {
        dispatch({
          type: 'user/fetchCurrent',
        });
      }
      notification.success({
        message: '操作成功',
        description:
          '更新个人信息成功',
      });
    }
  }

  const layout = {
    labelCol: {span: 7},
    wrapperCol: {span: 8},
  };

  const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
  };

  // @ts-ignore
  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          {...layout}
          form={form}
          initialValues={{
            nickname: currentUser?.nickname,
            email: currentUser?.email,
            Address: currentUser?.Address
          }}
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{required: true, message: '昵称不能为空'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{required: true,type: 'email', message: '邮件不能为空'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="Address"
            label="宿舍号"
            rules={[{required: true, message: '宿舍号不能为空'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item {...tailLayout} label="" colon={false}>
            <Button type="primary" onClick={infosubmit}>
              更新
            </Button>
            <Button onClick={() => {handlePwdchangeVisible(true)}} style={{marginLeft: 10,}}>
              更改密码？
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <PasswordForm
        modalVisible={PwdchangeVisible}
        onCancel={() => {
          handlePwdchangeVisible(false)
        }}
        onSubmit={async (value) => {
          const success = await changepassword(value)
          if (success) {
            notification.success({
              message: '操作成功',
              description:
                '密码更新成功',
            });
          }
          handlePwdchangeVisible(false)
        }}
        />
    </PageHeaderWrapper>
  );
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(UserSetting);
