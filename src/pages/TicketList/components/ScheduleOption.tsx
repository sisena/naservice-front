import React, {useEffect, useState} from 'react';
import {getavailschedules} from '@/services/basis_ticket';
import { Form,Select } from 'antd';

const {Option} = Select;

const FormItem = Form.Item;

const ScheduleOption: React.FC<{}> = () => {
  const [data, setdata] = useState([]);

  // @ts-ignore
  useEffect(() => {
    getavailschedules().then(value => {
      setdata(value)
    })
  }, [])
  // console.log(data)

  return (
    <>
      <FormItem
        name="schedule"
        label="选择时间"
      >
        <Select size="large">
          {data.length > 0 ? data.map((item) => {
            // @ts-ignore
            return (
              <>
                // @ts-ignore
                <Option value={item.id}>{item.description}</Option>
              </>
            )
          }) : () => {
            return (
              <Option value=''>正在获取数据</Option>
            )
          }}
        </Select>
      </FormItem>
    </>
  )

}

export default ScheduleOption
