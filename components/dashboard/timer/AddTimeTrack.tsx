import React, { FormEvent } from 'react';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import TagSelect from './TagSelect';
import { sendTimeTrack, TimeTrackRecording } from '@/lib/utils/services';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { endOfDay, startOfDay, differenceInHours, isSameDay } from 'date-fns';
import ProjectSelect from './ProjectSelect';
import CurrentTracks from './CurrentTracks';
import { useTodayTracks } from '@/hooks/use-api-hooks';
import { useTimerContext, useTimeTrackContext } from '@/hooks/use-store-hooks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import styles from './AddTimeTrack.module.scss';

const AddTimeTrack = () => {
  const { mutate } = useTodayTracks();
  const timerContext = useTimerContext();
  const currentTrack = useTimeTrackContext();
  const MAX_DURATION = 24;

  const createTimeTrack = (startDate: Date, endDate: Date) => {
    let requestData: TimeTrackRecording = {
      title: currentTrack.title.trim() || '(no description)',
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    if (currentTrack.tag) {
      requestData = { ...requestData, tag: currentTrack.tag };
    }
    if (currentTrack.projectId) {
      requestData = { ...requestData, projectId: currentTrack.projectId };
    }
    return requestData;
  };

  const startTimer = () => {
    timerContext.setTimer(true);
    currentTrack.setStartTime(new Date());
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    let startDate = currentTrack.startTime || new Date();
    const endDate = new Date();
    timerContext.setTimer(false);

    if (differenceInHours(endDate, startDate) > MAX_DURATION) {
      toast.error(
        `Recording failed: The maximum allowed duration of ${MAX_DURATION} hours has been exceeded.`
      );
      resetForm();
      return;
    }

    let tracks = [];
    if (!isSameDay(startDate, endDate)) {
      const endOfLocalDay = endOfDay(startDate);
      const startOfNextLocalDay = startOfDay(endDate);

      tracks.push(createTimeTrack(startDate, endOfLocalDay));
      startDate = startOfNextLocalDay;
    }
    tracks.push(createTimeTrack(startDate, endDate));

    try {
      for (const track of tracks) {
        await sendTimeTrack(track);
      }
      mutate();
      toast.success('Time track recorded successfully!');
    } catch (error) {
      toast.error(
        'Oops! There was a problem recording the time track. Please try again.'
      );
    }
    resetForm();
  };

  const resetForm = () => {
    currentTrack.setTitle('');
    currentTrack.setTag('');
    currentTrack.setProjectId('');
    currentTrack.setStartTime(null);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.control}>
        <input
          name="title"
          type="text"
          placeholder="What are you working on?"
          value={currentTrack.title}
          onChange={(event) => currentTrack.setTitle(event.target.value)}
          className={styles['form-input']}
        />
        <div className={styles.settings}>
          <ProjectSelect
            projectId={currentTrack.projectId}
            setProjectId={currentTrack.setProjectId}
          />
          <TagSelect tag={currentTrack.tag} setTag={currentTrack.setTag} />
          <div className={styles.stopwatch}>
            <Stopwatch />
          </div>

          {!timerContext.timer && (
            <PrimaryButton
              onClick={startTimer}
              type="button"
              className={styles.btn}
              ariaLabel="Start timer"
            >
              <PlayIcon />
            </PrimaryButton>
          )}
          {timerContext.timer && (
            <PrimaryButton
              type="submit"
              className={styles.btn}
              ariaLabel="Stop timer"
            >
              <PauseIcon />
            </PrimaryButton>
          )}
        </div>
      </form>

      <div className={styles.tracks}>
        <CurrentTracks />
      </div>
    </div>
  );
};

export default AddTimeTrack;
