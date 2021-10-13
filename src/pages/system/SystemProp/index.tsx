import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Button, Card, notification, Skeleton, DatePicker, Input } from 'antd';
import { getsystemprop, updatesystemprop } from '@/services/NA/system';
import moment from 'moment/moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export interface SystemPropsParams {
  vacationstart?: string;
  vacationend?: string;
  regexDestination?: string;
  default_max_ticket?: string;
}

const SystemProp: React.FC = () => {
  const [DatePickVals, setDatePickVals] = useState<any>([]);
  const [PropVals, setPropVals] = useState<any>({});

  useEffect(() => {
    getsystemprop().then((value) => {
      if (value.code === '200') {
        setDatePickVals({
          vacationstart: value.data.vacationstart,
          vacationend: value.data.vacationend,
        });
        setPropVals({
          regexDestination: value.data.regexDestination,
          default_max_ticket: value.data.default_max_ticket,
        });
      } else {
        notification.error({
          message: '发生错误',
          description: value.message,
        });
      }
    });
  }, []);

  const [form] = Form.useForm();

  const infosubmit = async () => {
    const fieldsValue = await form.getFieldsValue(true);

    await updatesystemprop({
      vacationstart: DatePickVals.vacationstart,
      vacationend: DatePickVals.vacationend,
      regexDestination: fieldsValue.regexDestination,
      default_max_ticket: fieldsValue.default_max_ticket,
    }).then((res) => {
      if (res.code === '204') {
        notification.success({
          message: '更新成功',
        });
      } else {
        notification.error({
          message: '更新失败',
          description: res.message,
        });
      }
    });
  };

  const handleDataPick = (date: any, dataString: any) => {
    setDatePickVals({
      vacationstart: dataString[0],
      vacationend: dataString[1],
    });
  };

  const dateFormat = 'YYYY-MM-DD';

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
        <br />
        {PropVals &&
        Object.keys(PropVals).length &&
        DatePickVals &&
        Object.keys(DatePickVals).length ? (
          <Form
            {...layout}
            form={form}
            initialValues={{
              default_max_ticket: PropVals.default_max_ticket,
              regexDestination: PropVals.regexDestination,
            }}
          >
            <Form.Item
              name="default_max_ticket"
              label="默认班次最大报修数"
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="regexDestination" label="宿舍限制正则(留空表示不做检测)">
              <Input />
            </Form.Item>
            <FormItem label="选择时间">
              <RangePicker
                defaultValue={[
                  moment(DatePickVals.vacationstart, dateFormat),
                  moment(DatePickVals.vacationend, dateFormat),
                ]}
                format={dateFormat}
                onChange={handleDataPick}
              />
            </FormItem>
            <FormItem {...tailLayout} label="" colon={false}>
              <Button type="primary" onClick={infosubmit}>
                更新
              </Button>
            </FormItem>
          </Form>
        ) : (
          <Skeleton />
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default SystemProp;
