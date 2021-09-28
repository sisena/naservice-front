import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { getann } from '@/services/NA/user';

interface item {
  id?: string;
  text?: string;
  title?: string;
}

const Hello: React.FC<{}> = () => {
  const [Announcement, setAnnouncement] = useState([]);
  useEffect(() => {
    getann().then((value) => {
      setAnnouncement(value.data);
    });
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <Alert
          message="公告"
          type="success"
          icon={<PushpinOutlined />}
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        {Announcement.length > 0 ? (
          Announcement.map((item: item) => {
            return (
              <>
                <Card type="inner" title={item.title} style={{ marginTop: 16 }}>
                  {item.text}
                </Card>
              </>
            );
          })
        ) : (
          <Card type="inner" title="">
            暂无公告
          </Card>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Hello;
