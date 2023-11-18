import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import { MoreVertical } from 'lucide-react';
import { useProjects } from '@/hooks/use-api-hooks';
import axios from 'axios';
import { toast } from 'sonner';

import styles from '../Operations.module.scss';

const ProjectOperations = ({ projectId }: { projectId: string }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { mutate } = useProjects();

  const deleteProject = async () => {
    const response = await axios.delete('/api/user/projects/' + projectId);
    return response.data;
  };

  const deleteProjectHandler = async () => {
    try {
      await deleteProject();
      mutate();
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <div>
      <Dropdown>
        <Dropdown.Button className={styles.operation}>
          <MoreVertical />
        </Dropdown.Button>
        <Dropdown.Menu sideOffset={5} align="end">
          <Dropdown.MenuItem asChild>
            <button className={styles.edit}>Edit</button>
          </Dropdown.MenuItem>
          <Dropdown.Separator className={styles.separator} />
          <Dropdown.MenuItem asChild>
            <button
              className={styles.delete}
              onClick={() => setShowDeleteAlert(true)}
            >
              Delete
            </button>
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
      <AlertDialog open={showDeleteAlert} setOpen={setShowDeleteAlert}>
        <AlertDialog.Content
          title="Are you sure you want to delete this project?"
          description="This action cannot be undone."
          action="Delete project"
          onAction={deleteProjectHandler}
        />
      </AlertDialog>
    </div>
  );
};

export default ProjectOperations;
