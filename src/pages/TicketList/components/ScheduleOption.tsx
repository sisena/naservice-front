import React, { useEffect, useState } from 'react';
import { getavailschedules } from '@/services/NA/basis_ticket';
import { Form, Select } from 'antd';

const { Option } = Select;

const FormItem = Form.Item;

interface itemVal {
  id: string;
  description: string;
}

const ScheduleOption: React.FC<{}> = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getavailschedules().then((value) => {
      if (value.code == 200) {
        setdata(value.data);
      }
    });
  }, []);
  // console.log(data)

  return (
    <>
      <FormItem
        name="schedule"
        label="选择上门时间"
        rules={[{ required: true, message: '请选择时间' }]}
      >
        <Select size="large">
          {data.length > 0
            ? data.map((item: itemVal) => {
                if (item.description == '当前为假期暂不开放') {
                  return (
                    <Option value={item.id} disabled>
                      {item.description}
                    </Option>
                  );
                }
                return (
                  <>
                    <Option value={item.id}>{item.description}</Option>
                  </>
                );
              })
            : () => {
                return <Option value="">正在获取数据</Option>;
              }}
        </Select>
      </FormItem>
    </>
  );
};

export default ScheduleOption;
