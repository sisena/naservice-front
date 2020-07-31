import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Tabs, notification } from 'antd';
import { history } from 'umi';
import { userforget } from '@/services/user';
import styles from './index.less';
import { getcaptcha } from '@/services/other';

const { TabPane } = Tabs;
const FormItem = Form.Item;

interface CapthchaDataProps {
  id?: string;
  b64s?: string;
}

const Forgetpass: React.FC<{}> = () => {
  const [formVals, setFormVals] = useState({});
  const [loading, setloading] = useState(false);
  const [CapthchaData, setCaptchaData] = useState<CapthchaDataProps>({});
  const [form] = Form.useForm();

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

  const submit = async () => {
    const fieldValue = await form.validateFields();
    setFormVals({ ...fieldValue });
    setloading(true);
    await userforget({ ...formVals, ...fieldValue, CaptchaId: CapthchaData.id }).then((res) => {
      if (res.code == 201) {
        notification.success({
          message: '操作成功',
          description: '已通过邮件方式向您发送修改密码链接,请检查myscse邮箱',
        });
        setloading(false);
        history.push('/user/login');
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
    setloading(false);
  };

  return (
    <div className={styles.main}>
      <Tabs className={styles.tab}>
        <TabPane tab="忘记密码" key="forget">
          <Form form={form}>
            <FormItem
              name="uid"
              label=""
              className={styles.input}
              rules={[{ required: true, max: 20, message: '学号/工号不能为空' }]}
            >
              <Input placeholder="学号/工号" />
            </FormItem>

            <FormItem
              name="Captcha"
              label=""
              className={styles.captchaInput}
              rules={[{ required: true, message: '验证码不能为空' }]}
            >
              <Input placeholder="验证码" />
            </FormItem>

            <div className={styles.captchaImg}>
              <img
                src={CapthchaData.b64s}
                onClick={() => {
                  getcaptcha().then((res) => {
                    if (res.code == 200) {
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
          </Form>
        </TabPane>
      </Tabs>
      <Button
        className={styles.submit}
        onClick={submit}
        size="large"
        type="primary"
        loading={loading}
      >
        确定
      </Button>
    </div>
  );
};

export default Forgetpass;
