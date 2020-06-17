import React, {useEffect, useState} from 'react'
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Form, Input, Button,Card,notification,Select,Skeleton,Alert} from 'antd';
import {getvacation,updatevacation} from "@/services/system";

const { Option } = Select;
const FormItem = Form.Item;

interface vacationinfo {
  vacation?: string,
  vacationstart?: string;
  vacationend?: string;
}

const vacationsetting: React.FC<{}> = () => {
  const [InfoVals, setInfoVals] = useState<vacationinfo>({});

  useEffect(() => {
    getvacation().then(value => {
      setInfoVals(value)
    })
  },[])

  const [form] = Form.useForm();

  const infosubmit = async () => {
    const fieldsValue = await form.validateFields();

    setInfoVals({...InfoVals , ...fieldsValue});

    // @ts-ignore
    const success =await updatevacation({ ...InfoVals, ...fieldsValue });
    if (success) {
      notification.success({
        message: '操作成功',
        description:
          '更新假期设置成功',
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
        <Alert message="如果当前日期距离假期结束时间少于三天时,假期模式会处于失效状态,以方便用户提前报修" type="warning" showIcon closable />
        <br/>
        {InfoVals && Object.keys(InfoVals).length ? (
        <Form
          {...layout}
          form={form}
          initialValues={{
            vacation: InfoVals.vacation,
            vacationstart: InfoVals.vacationstart,
            vacationend: InfoVals.vacationend,
          }}
        >
          <FormItem name="vacation" label="假期模式是否开启">
            <Select>
              <Option value="true">开启</Option>
              <Option value="false">关闭</Option>
            </Select>
          </FormItem>
          <FormItem name="vacationstart" rules={[{ required: true, max: 20,message: '请输入正确格式！' }]} label="开始时间">
            <Input placeholder="eg: 2020-03-13"/>
          </FormItem>
          <FormItem name="vacationend" rules={[{ required: true, max: 20,message: '请输入正确格式！' }]} label="结束时间">
            <Input placeholder="eg: 2020-06-20"/>
          </FormItem>
          <FormItem {...tailLayout} label="" colon={false}>
            <Button type="primary" onClick={infosubmit}>
              更新
            </Button>
          </FormItem>
        </Form>
        ): <Skeleton />}
      </Card>

    </PageHeaderWrapper>
  );
}

export default vacationsetting;
