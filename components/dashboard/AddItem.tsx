import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TagForm from './tags/TagForm';
import ProjectForm from './projects/ProjectForm';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { PlusIcon } from 'lucide-react';
import styles from './AddItem.module.scss';

const AddItem = ({ itemType }: { itemType: 'tag' | 'project' }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <PrimaryButton className={styles.modal__btn}>
            <PlusIcon />
            {itemType === 'tag' ? 'New tag' : 'New project'}
          </PrimaryButton>
        </Modal.Button>
        <Modal.Content title="Add new tag">
          {itemType === 'tag' ? (
            <TagForm operationType="create" afterSave={closeModal} />
          ) : (
            <ProjectForm afterSave={closeModal} />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddItem;
