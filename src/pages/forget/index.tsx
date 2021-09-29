import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { history } from 'umi';
import { userforget } from '@/services/NA/user';
import styles from './index.less';
import { getcaptcha } from '@/services/NA/other';
import ProForm, { ProFormText } from '@ant-design/pro-form';

interface CapthchaDataProps {
  id?: string;
  b64s?: string;
}

const Forgetpass: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [CapthchaData, setCaptchaData] = useState<CapthchaDataProps>({});

  useEffect(() => {
    getcaptcha().then((res) => {
      if (res.code == 200) {
        setCaptchaData(res.data);
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  }, []);

  const handlesubmit = async (values: any) => {
    setSubmitting(true);
    await userforget({ ...values, CaptchaId: CapthchaData.id }).then((res) => {
      if (res.code === '201') {
        notification.success({
          message: '操作成功',
          description: '已通过邮件方式向您发送修改密码链接,请检查myscse邮箱',
        });
        setSubmitting(false);
        history.push('/user/login');
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <ProForm
            submitter={{
              searchConfig: {
                submitText: '找回',
              },
              render: (_, dom: any) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values: any) => {
              await handlesubmit(values);
            }}
          >
            <ProFormText
              name="uid"
              fieldProps={{
                size: 'large',
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
              name="Captcha"
              fieldProps={{
                size: 'large',
              }}
              placeholder="验证码"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
              ]}
            />

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <img
                src={CapthchaData.b64s}
                onClick={() => {
                  getcaptcha().then((res) => {
                    if (res.code === '200') {
                      setCaptchaData(res.data);
                    } else {
                      notification.error({
                        message: res.message,
                      });
                    }
                  });
                }}
              />
            </div>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
