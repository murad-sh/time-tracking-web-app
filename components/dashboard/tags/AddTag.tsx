import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TagForm from './TagForm';
import PrimaryButton from '@/components/ui/PrimaryButton';

// !TEMP
import TagList from './TagList';

const AddTag = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <PrimaryButton>+ New tag</PrimaryButton>
        </Modal.Button>
        <Modal.Content title="Add new tag">
          <TagForm afterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
      <TagList />
    </div>
  );
};

export default AddTag;
