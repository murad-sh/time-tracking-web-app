import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import { MoreVertical } from 'lucide-react';
import { useTodayTracks, useWeeklyTracks } from '@/hooks/use-api-hooks';
import { deleteTimeTrack } from '@/lib/utils/services';
import { toast } from 'sonner';
import Modal from '@/components/ui/Modal';
import { ITimeTrack } from '@/models/time-track';
import EditForm from './reports/EditForm';
import { useSearchParams } from 'next/navigation';
import { getISOWeekDateRange } from '@/lib/utils/date';
import styles from './SharedStyles.module.scss';

const TrackOperations = ({
  timeTrack,
  dateType,
}: {
  timeTrack: ITimeTrack;
  dateType: 'weekly' | 'daily';
}) => {
  const { startDate: currentStart, endDate: currentEnd } =
    getISOWeekDateRange();
  const searchParams = useSearchParams();
  const start = (searchParams.get('start') || currentStart) as string;
  const end = (searchParams.get('end') || currentEnd) as string;
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { mutate } = useWeeklyTracks(start, end);
  const { mutate: mutateToday } = useTodayTracks();

  const deleteTimeTrackHandler = async () => {
    try {
      await deleteTimeTrack(timeTrack._id.toString());
      dateType === 'weekly' ? mutate() : mutateToday();
      toast.success('Time Track deleted successfully');
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
          title="Are you sure you want to delete this time track?"
          description="This action can&#39;t be undone."
          action="Delete time track"
          onAction={deleteTimeTrackHandler}
        />
      </AlertDialog>
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content title="Edit title" className={styles.modal}>
          <EditForm
            initialTrack={timeTrack}
            afterSave={() => {
              setShowEditModal(false);
              dateType === 'weekly' ? mutate() : mutateToday();
            }}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TrackOperations;
