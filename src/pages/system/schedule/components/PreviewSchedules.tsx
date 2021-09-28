import React from 'react';
import { Modal } from 'antd';
import type { TableListItem } from '../data';
import ScheduleOption from '@/pages/TicketList/components/ScheduleOption';

export interface FormValueType extends Partial<TableListItem> {}

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const PreviewSchedule: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="预览"
      cancelText="取消"
      visible={modalVisible}
      onCancel={() => onCancel()}
    >
      <ScheduleOption />
    </Modal>
  );
};

export default PreviewSchedule;
