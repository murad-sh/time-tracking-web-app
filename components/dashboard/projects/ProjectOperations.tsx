import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import { MoreVertical } from 'lucide-react';
import { useProjects } from '@/hooks/use-api-hooks';
import { deleteProject } from '@/lib/utils/services';
import { toast } from 'sonner';
import Modal from '@/components/ui/Modal';
import ProjectForm from './ProjectForm';
import { IProject } from '@/models/project';
import styles from '../SharedStyles.module.scss';

const ProjectOperations = ({ project }: { project: IProject }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { mutate } = useProjects();

  const deleteProjectHandler = async () => {
    try {
      await deleteProject(project._id!.toString());
      mutate();
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Button className={styles.operation} aria-label="Operations">
          <MoreVertical />
        </Dropdown.Button>
        <Dropdown.Menu sideOffset={5} align="end">
          <Dropdown.MenuItem
            className={styles.edit}
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </Dropdown.MenuItem>
          <Dropdown.Separator className={styles.separator} />
          <Dropdown.MenuItem
            className={styles.delete}
            onClick={() => setShowDeleteAlert(true)}
          >
            Delete
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
      <AlertDialog open={showDeleteAlert} setOpen={setShowDeleteAlert}>
        <AlertDialog.Content
          title="Are you sure you want to delete this project?"
          description="This action can&#39;t be undone."
          action="Delete project"
          onAction={deleteProjectHandler}
        />
      </AlertDialog>
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content title="Edit project" className={styles.modal}>
          <ProjectForm
            operationType="edit"
            initialProject={project}
            afterSave={() => setShowEditModal(false)}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProjectOperations;
