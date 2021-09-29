import React from 'react';
import { Spin, Result, notification } from 'antd';
import { history } from 'umi';
import { checkforget, resetpassword } from '@/services/NA/user';
import styles from './index.less';
import ProForm, { ProFormText } from '@ant-design/pro-form';

class Resetpasswd extends React.Component<any> {
  state = {
    valid: {
      valid: '',
    },
    token: this.props.location.query,
  };

  componentDidMount() {
    checkforget({ token: this.state.token.token }).then((res) => {
      if (res.code === '200') {
        this.setState({
          valid: res.data,
        });
      }
    });
  }

  onFinish = (values: any) => {
    resetpassword({ ...values, token: this.state.token.token }).then((res) => {
      if (res.code === '200') {
        notification.success({
          message: '操作成功',
          description: '密码重置成功',
        });
        history.push('/user/login');
      } else {
        notification.error({
          message: '重置失败，请联系客服',
        });
      }
    });
  };

  render() {
    const { valid } = this.state;

    if (valid.valid === 'false') {
      return <Result status="warning" title="重置链接已过期，请重新发起忘记密码" />;
    }

    if (valid.valid === 'true') {
      return (
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.main}>
              <ProForm
                submitter={{
                  searchConfig: {
                    submitText: '修改',
                  },
                  render: (_, dom: any) => dom.pop(),
                  submitButtonProps: {
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values: any) => {
                  await this.onFinish(values);
                }}
              >
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                  }}
                  placeholder="新密码"
                  rules={[{ required: true, max: 100, message: '新密码不为空!' }]}
                />
                <ProFormText.Password
                  name="password_again"
                  fieldProps={{
                    size: 'large',
                  }}
                  placeholder="再一次新密码"
                  rules={[{ required: true, max: 100, message: '两次密码不一致!' }]}
                />
              </ProForm>
            </div>
          </div>
        </div>
      );
    }

    if (valid.valid === 'invalid') {
      return <Result status="error" title="无效重置链接" />;
    }

    return <Spin />;
  }
}

export default Resetpasswd;
