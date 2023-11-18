import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ProjectForm from './ProjectForm';
import PrimaryButton from '@/components/ui/PrimaryButton';

import { PlusIcon } from 'lucide-react';

import styles from './AddProject.module.scss';

const AddProject = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <PrimaryButton className={styles.modal__btn}>
            <PlusIcon />
            New project
          </PrimaryButton>
        </Modal.Button>
        <Modal.Content title="Add new project">
          <ProjectForm afterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddProject;
