import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Button, Card, notification, Select, Skeleton, Alert, DatePicker } from 'antd';
import { getvacation, updatevacation } from '@/services/NA/system';
import moment from 'moment/moment';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export interface vacationinfo {
  vacation?: string;
  vacationstart?: string;
  vacationend?: string;
}

const Vacationsetting: React.FC<{}> = () => {
  const [InfoVals, setInfoVals] = useState<vacationinfo>({});
  const [DatePickVals, setDatePickVals] = useState<any>({});

  useEffect(() => {
    getvacation().then((value) => {
      if (value.code === '200') {
        setInfoVals(value.data);
        setDatePickVals({
          vacationstart: value.data.vacationstart,
          vacationend: value.data.vacationend,
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
    const fieldsValue = await form.validateFields();

    setInfoVals({
      vacationstart: DatePickVals[0],
      vacationend: DatePickVals[1],
      ...InfoVals,
      ...fieldsValue,
    });

    await updatevacation({
      vacationstart: DatePickVals[0],
      vacationend: DatePickVals[1],
      ...InfoVals,
      ...fieldsValue,
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
    setDatePickVals(dataString);
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
        <Alert
          message="如果当前日期距离假期结束时间少于三天时,假期模式会处于失效状态,以方便用户提前报修"
          type="warning"
          showIcon
          closable
        />
        <br />
        {InfoVals && Object.keys(InfoVals).length ? (
          <Form
            {...layout}
            form={form}
            initialValues={{
              vacation: InfoVals.vacation,
            }}
          >
            <FormItem name="vacation" label="假期模式是否开启">
              <Select>
                <Option value="true">开启</Option>
                <Option value="false">关闭</Option>
              </Select>
            </FormItem>
            <FormItem label="选择时间">
              <RangePicker
                defaultValue={[
                  moment(InfoVals.vacationstart, dateFormat),
                  moment(InfoVals.vacationend, dateFormat),
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

export default Vacationsetting;
