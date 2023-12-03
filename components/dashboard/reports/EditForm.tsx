import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { editTimeTrack } from '@/lib/utils/services';
import { toast } from 'sonner';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import { ITimeTrack } from '@/models/time-track';
import styles from '../SharedStyles.module.scss';
import {
  timeTrackUpdateSchema,
  TimeTrackUpdateType,
} from '@/lib/validations/time-track';

interface EditFormProps {
  afterSave: () => void;
  initialTrack: ITimeTrack;
}

const EditForm = ({ afterSave, initialTrack }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TimeTrackUpdateType>({
    resolver: zodResolver(timeTrackUpdateSchema),
    mode: 'all',
    defaultValues: { newTitle: initialTrack.title },
  });

  async function onSubmit(enteredData: TimeTrackUpdateType) {
    const { newTitle } = enteredData;
    if (newTitle === initialTrack.title) {
      afterSave();
      return;
    }
    try {
      await editTimeTrack(initialTrack._id.toString(), newTitle);
      toast.success('Title updated successfully');
      reset();
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.control}>
        <input {...register('newTitle')} type="text" placeholder="Title" />
      </div>
      {errors.newTitle && (
        <p className={styles.error}>{`${errors.newTitle.message}`}</p>
      )}
      <div className={styles.action}>
        <PrimaryButton
          type="submit"
          className={isSubmitting ? styles.submitting : ''}
          disabled={errors.newTitle && true}
        >
          Update
        </PrimaryButton>
        {errors.root?.serverError && (
          <span className={styles.error}>
            {errors.root.serverError.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default EditForm;
