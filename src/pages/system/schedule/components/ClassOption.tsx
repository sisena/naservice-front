import React, {useEffect, useState} from 'react';
import {getallclass} from '@/services/system';
import { Form,Select } from 'antd';

const {Option} = Select;

const FormItem = Form.Item;

const ClassOption: React.FC<{}> = () => {
  const [data, setdata] = useState([]);

  // @ts-ignore
  useEffect(() => {
    getallclass().then(value => {
      setdata(value.data)
    })
  }, [])
  // console.log(data)

  return (
    <>
      <FormItem
        name="class"
        label="选择班次"
      >
        <Select size="large">
          {data.length > 0 ? data.map((item) => {
            // @ts-ignore
            return (
              <>
                // @ts-ignore
                <Option value={item.id}>{item.start_time}-{item.end_time} {item.type} </Option>
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

export default ClassOption
