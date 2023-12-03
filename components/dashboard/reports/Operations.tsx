import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import { MoreVertical } from 'lucide-react';
import { useWeeklyTracks } from '@/hooks/use-api-hooks';
import axios from 'axios';
import { toast } from 'sonner';
import Modal from '@/components/ui/Modal';
import { ITimeTrack } from '@/models/time-track';
import styles from '../SharedStyles.module.scss';
import EditForm from './EditForm';
import { useSearchParams } from 'next/navigation';
import { calculateWeekRange } from '@/lib/utils/date';

const Operations = ({ timeTrack }: { timeTrack: ITimeTrack }) => {
  const { startDate: currentStart, endDate: currentEnd } = calculateWeekRange();
  const searchParams = useSearchParams();
  const start = (searchParams.get('start') || currentStart) as string;
  const end = (searchParams.get('end') || currentEnd) as string;
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { mutate } = useWeeklyTracks(start, end);

  const deleteTimeTrack = async () => {
    const response = await axios.delete(
      '/api/user/time-tracks/' + timeTrack._id
    );
    return response.data;
  };

  const deleteTimeTrackHandler = async () => {
    try {
      await deleteTimeTrack();
      mutate();
      toast.success('Time Track deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Button className={styles.operation}>
          <MoreVertical />
        </Dropdown.Button>
        <Dropdown.Menu sideOffset={5} align="end">
          <Dropdown.MenuItem asChild>
            <button
              className={styles.edit}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
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
          title="Are you sure you want to delete this time track?"
          description="This action cannot be undone."
          action="Delete time track"
          onAction={deleteTimeTrackHandler}
        />
      </AlertDialog>
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content title="Edit title">
          <EditForm
            initialTrack={timeTrack}
            afterSave={() => {
              setShowEditModal(false);
              mutate();
            }}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Operations;
