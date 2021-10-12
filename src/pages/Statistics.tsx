import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  getdaydestination,
  getdayticket,
  getmonthdestination, getmonthticket,
  gettodaydestination,
  gettodayticket,
} from '@/services/NA/statistics';
import { Rose, Column, Line} from '@ant-design/charts';
import { Card } from 'antd';

const Statistics: React.FC = () => {
  const [Todayticket, setTodayticket] = useState([]);
  const [Dayticket, setDayticket] = useState([]);
  const [Monthticket, setMonthticket] = useState([]);
  const [Todaydestination, setTodaydestination] = useState([]);
  const [Daydestination, setDaydestination] = useState([]);
  const [Monthdestination, setMonthdestination] = useState([]);
  useEffect(() => {
    gettodayticket().then((value) => {
      setTodayticket(value.data);
    });
    getdayticket().then((value) => {
      setDayticket(value.data);
    });
    getmonthticket().then((value) => {
      setMonthticket(value.data);
    })
    gettodaydestination().then((value) => {
      setTodaydestination(value.data);
    });
    getdaydestination().then((value) => {
      setDaydestination(value.data);
    });
    getmonthdestination().then((value) => {
      setMonthdestination(value.data);
    });
  }, []);

  var TodayticketPieconfig = {
    data: Todayticket,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: { position: 'bottom' },
  };

  var Dayticketconfig = {
    data: Dayticket,
    xField: 'type',
    yField: 'value',
    xAxis: { label: { autoRotate: false } },
    scrollbar: { type: 'horizontal' },
  };

  var Monthticketconfig = {
    data: Monthticket,
    padding: 'auto',
    xField: 'type',
    yField: 'value',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.6,
      end: 1,
    },
  };

  var Todaydestinationconfig = {
    data: Todaydestination,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    label: { offset: -15 },
  };

  var Daydestinationconfig = {
    data: Daydestination,
    xField: 'type',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    slider: {
      start: 0.6,
      end: 1,
    },
  };

  var Monthdestinationconfig = {
    data: Monthdestination,
    xField: 'type',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function(s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    slider: {
      start: 0.6,
      end: 1,
    },
  };

  return (
    <PageHeaderWrapper>
      <Card title="今日报修" bordered={false}>
        <Rose {...TodayticketPieconfig} />
      </Card>
      <Card title="日报修总量" bordered={false}>
        <Column {...Dayticketconfig} />
      </Card>
      <Card title="月报修总量" bordered={false}>
        <Line {...Monthticketconfig} />
      </Card>
      <Card title="今日宿舍分布" bordered={false}>
        <Rose {... Todaydestinationconfig} />
      </Card>
      <Card title="日宿舍分布" bordered={false}>
        <Line {... Daydestinationconfig} />
      </Card>
      <Card title="月宿舍分布" bordered={false}>
        <Line {... Monthdestinationconfig} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Statistics;
