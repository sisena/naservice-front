import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { ticketdetail } from '@/services/NA/basis_ticket';

interface TicketDetailProps {
  value: any;
  TicketDetailVisible: boolean;
  onClose: () => void;
}

interface TicketDetailData {
  id?: string;
  owner?: string;
  name?: string;
  type?: string;
  staff?: string;
  schedule?: string;
  title?: string;
  description?: string;
  destination?: string;
  phone?: string;
  status?: string;
  reply?: string;
}

const TicketDetail: React.FC<TicketDetailProps> = (props) => {
  const { TicketDetailVisible, onClose, value } = props;
  const [Userdata, setUserdata] = useState<TicketDetailData>({
    id: '',
    owner: '',
    name: '',
    staff: '',
    schedule: '',
    title: '',
    description: '',
    destination: '',
    phone: '',
    status: '',
    reply: '',
  });

  useEffect(() => {
    ticketdetail({ ticketid: value.id }).then((msg) => {
      if (msg.code == 200) {
        setUserdata(msg.data);
      }
    });
  }, []);

  return (
    <Modal
      title="详细信息"
      visible={TicketDetailVisible}
      onCancel={() => onClose()}
      onOk={() => onClose()}
      destroyOnClose={true}
    >
      <p>所有者:{Userdata.owner}</p>
      <p>联系人:{Userdata.name}</p>
      <p>上门时间:{Userdata.schedule}</p>
      <p>标题:{Userdata.title}</p>
      <p>描述:{Userdata.description}</p>
      <p>维修地点:{Userdata.destination}</p>
      <p>联系电话:{Userdata.phone}</p>
      <p>状态:{Userdata.status}</p>
      <p>维修者:{Userdata.staff}</p>
      <p>回复:{Userdata.reply}</p>
    </Modal>
  );
};

export default TicketDetail;
