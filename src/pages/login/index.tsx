import React, {  useState } from 'react';
import {Button, Checkbox, Form, Input, Tabs} from 'antd';
import {connect, Link} from 'umi';
import styles from './index.less';
import {ConnectState} from "@/models/connect";
import {Dispatch} from "@@/plugin-dva/connect";

const { TabPane } = Tabs;
const FormItem = Form.Item;

interface LoginProps {
  dispatch: Dispatch;
}

const UserLogin: React.FC<LoginProps> = (props) => {
  const [autoLogin, setAutoLogin] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async() => {
    const fieldValue = await form.validateFields();
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...fieldValue, autoLogin },
    });
  };

  return (
    <div className={styles.main}>
      <Tabs className={styles.tab}>
        <TabPane tab="账户密码登录" key="account">
          <Form form={form}>
            <FormItem
              name="uid"
              label=""
              className={styles.input}
              rules={[{ required: true, message: '学号/工号不能为空' }]}
            >
              <Input placeholder="学号/工号" />
            </FormItem>

            <FormItem
              name="password"
              label=""
              className={styles.input}
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password placeholder="密码" />
            </FormItem>

          </Form>
        </TabPane>
      </Tabs>

      <div>
        <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
          7天免登陆
        </Checkbox>
        <Link
          style={{
            float: 'right',
          }}
          to="/user/forget">
          忘记密码
        </Link>
      </div>

      <Button
        className={styles.submit}
        onClick={handleSubmit}
        size="large"
        type="primary"
      >
        登陆
      </Button>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
})) (UserLogin);
