import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import { login } from '@/services/NA/login';

import styles from './index.less';
import { setWithExpiry } from '@/services/NA/utils';
import jwt_decode from 'jwt-decode';
import { getuserinfo } from '@/services/NA/user';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.code === 200) {
        message.success('登录成功！');
        const decode = jwt_decode(msg.token);
        const { rolename = '' } = decode;

        if (values.autoLogin) {
          setWithExpiry('rolename', rolename, 604800000); // 7天
          // 存储token
          setWithExpiry('token', msg.token, 604800000);
        } else {
          setWithExpiry('rolename', rolename, 900000); // 15分钟
          setWithExpiry('token', msg.token, 900000);
        }

        const userInfo = await getuserinfo();
        await setInitialState({ currentUser: userInfo.data });
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/NA-white.svg" />
              <span className={styles.title}>NA 网络报修</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: false,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <ProFormText
              name="uid"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="学号"
              rules={[
                {
                  required: true,
                  message: '请输入学号',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              {/*<a*/}
              {/*  style={{*/}
              {/*    float: 'right',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  忘记密码*/}
              {/*</a>*/}
            </div>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
