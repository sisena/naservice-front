import React from 'react';
import {Tabs, Spin, Result, Form, Input,Button,notification} from 'antd';
import { history } from 'umi';
import {checkforget,resetpassword} from "@/services/user";
import styles from "@/pages/forget/index.less";

class Resetpasswd extends React.Component<any> {
  state = {
    valid: {
      valid: ''
    },
    token: this.props.location.query
  };

  componentDidMount() {
    checkforget({token: this.state.token.token}).then(value => {
      this.setState({
        valid: value
      })
    })
  }

  onFinish = values => {
    const success = resetpassword({...values,token: this.state.token.token});
    if (success) {
      notification.success({
        message: '操作成功',
        description:
          '密码重置成功',
      });
      history.push('/user/login');
    }
  };

  render() {
    const {valid} = this.state;
    const FormItem = Form.Item;
    const {TabPane} = Tabs;

    if (valid.valid == 'false') {
      return <Result status="warning" title="重置链接已过期，请重新使用忘记密码"/>
    }

    if (valid.valid == 'true') {
      return (
        <div className={styles.main}>
          <Tabs className={styles.tab}>
            <TabPane tab="重置密码" key="reset">
              <Form
                onFinish={this.onFinish}
              >
                <FormItem
                  label=""
                  name="password"
                  className={styles.input}
                  rules={[{required: true, max: 100,message: '新密码不为空!'}]}
                >
                  <Input.Password placeholder="新密码"/>
                </FormItem>
                <FormItem
                  label=""
                  name="password_again"
                  className={styles.input}
                  rules={[{required: true, max: 100 ,message: '两次密码不一致!'}]}
                >
                  <Input.Password placeholder="再一次新密码"/>
                </FormItem>
                <FormItem>
                  <Button className={styles.submit} size="large" type="primary" htmlType="submit">确定</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      )
    }

    if (valid.valid == 'invalid') {
      return (
        <Result status="error" title="无效重置链接"/>
      )
    }

    return <Spin/>;
  }
}

export default Resetpasswd;
