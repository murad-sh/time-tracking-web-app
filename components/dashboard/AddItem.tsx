import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TagForm from './tags/TagForm';
import ProjectForm from './projects/ProjectForm';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { PlusIcon } from 'lucide-react';
import styles from './SharedStyles.module.scss';

const AddItem = ({
  itemType,
  btnText,
}: {
  itemType: 'tag' | 'project';
  btnText?: string;
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const title = `Add new ${itemType}`;
  const defaultButtonText = (
    <>
      <PlusIcon />
      {itemType === 'tag' ? 'New tag' : 'New project'}
    </>
  );
  const buttonText = btnText || defaultButtonText;

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <PrimaryButton className={styles.modal__btn}>
            {buttonText}
          </PrimaryButton>
        </Modal.Button>
        <Modal.Content title={title} className={styles.modal}>
          {itemType === 'tag' ? (
            <TagForm operationType="create" afterSave={closeModal} />
          ) : (
            <ProjectForm operationType="create" afterSave={closeModal} />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddItem;
