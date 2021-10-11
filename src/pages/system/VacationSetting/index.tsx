import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Button, Card, notification, Skeleton, DatePicker } from 'antd';
import { getvacation, updatevacation } from '@/services/NA/system';
import moment from 'moment/moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export interface vacationinfo {
  vacationstart?: string;
  vacationend?: string;
}

const Vacationsetting: React.FC = () => {
  const [DatePickVals, setDatePickVals] = useState<any>([]);

  useEffect(() => {
    getvacation().then((value) => {
      if (value.code === '200') {
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
    await updatevacation({
      vacationstart: DatePickVals[0],
      vacationend: DatePickVals[1],
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
        <br />
        {DatePickVals && Object.keys(DatePickVals).length ? (
          <Form {...layout} form={form}>
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

export default Vacationsetting;
