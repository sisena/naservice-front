import React, {useState} from 'react';
import {Button, Form, Input, Tabs,notification} from 'antd';
import { history } from 'umi';
import {userforget} from "@/services/user";
import styles from "@/pages/forget/index.less";

const {TabPane} = Tabs;
const FormItem = Form.Item;

const Forgetpass: React.FC<{}> = () => {
  const [formVals, setFormVals] = useState({});
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  const submit = async () => {
    const fieldValue = await form.getFieldsValue();
    setFormVals({...fieldValue})
    setloading(true)
    const success = await userforget({...formVals,...fieldValue})
    if (success) {
      notification.success({
        message: '操作成功',
        description:
          '已通过邮件方式向您发送修改密码链接,请检查myscse邮箱',
      });
      setloading(false)
      history.push('/user/login');
    }
    setloading(false)
  }

  return (
    <div className={styles.main}>
      <Tabs className={styles.tab}>
        <TabPane tab="忘记密码" key="forget">
          <Form
            form={form}
          >
            <FormItem
              name="uid"
              label=""
              className={styles.input}
              rules={[{required: true, message: '学号/工号不能为空'}]}
            >
              <Input placeholder="学号/工号"/>
            </FormItem>
            <FormItem>
              <Button
                className={styles.submit}
                onClick={submit}
                size="large"
                type="primary"
                loading={loading}
              >
                确定
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Forgetpass;
