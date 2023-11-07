import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TagForm from './TagForm';
import PrimaryButton from '@/components/ui/PrimaryButton';

import { PlusIcon } from 'lucide-react';

import styles from './AddTag.module.scss';

const AddTag = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <PrimaryButton className={styles.modal__btn}>
            {<PlusIcon />}
            <span>New tag</span>
          </PrimaryButton>
        </Modal.Button>
        <Modal.Content title="Add new tag">
          <TagForm afterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddTag;
