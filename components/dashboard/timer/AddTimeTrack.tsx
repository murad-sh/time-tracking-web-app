import React, { FormEvent } from 'react';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import TagSelect from './TagSelect';
import { sendTimeTrack, TimeTrackRecording } from '@/lib/utils/services';

import { isSameDay, endOfDay, startOfDay, differenceInHours } from 'date-fns';

import styles from './AddTimeTrack.module.scss';
// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';
import ProjectSelect from './ProjectSelect';

import CurrentTracks from './CurrentTracks';
import { useTodayTracks } from '@/hooks/use-api-hooks';
import { useTimerContext, useTimeTrackContext } from '@/hooks/use-store-hooks';

const AddTimeTrack = () => {
  const { mutate } = useTodayTracks();
  const timerContext = useTimerContext();
  const currentTrack = useTimeTrackContext();
  const MAX_DURATION = 48;

  const startTimer = () => {
    timerContext.setTimer(true);
    currentTrack.setStartTime(new Date());
  };

  const createTimeTrack = (startDate: Date, endDate: Date) => {
    let requestData: TimeTrackRecording = {
      title: currentTrack.title.trim() || '(no description)',
      start: startDate,
      end: endDate,
    };
    if (currentTrack.tag) {
      requestData = { ...requestData, tag: currentTrack.tag };
    }
    if (currentTrack.projectId) {
      requestData = { ...requestData, projectId: currentTrack.projectId };
    }
    return requestData;
  };

  async function sendTrack(event: FormEvent) {
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
    let tracks: TimeTrackRecording[] = [];
    if (!isSameDay(startDate, endDate)) {
      const end = endOfDay(startDate);
      tracks.push(createTimeTrack(startDate, end));
      startDate = startOfDay(end);
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
  }

  const resetForm = () => {
    currentTrack.setTitle('');
    currentTrack.setTag('');
    currentTrack.setProjectId('');
    currentTrack.setStartTime(null);
  };

  return (
    <div>
      <Stopwatch />
      <form onSubmit={sendTrack}>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={currentTrack.title}
          onChange={(event) => currentTrack.setTitle(event.target.value)}
        ></input>

        {!timerContext.timer && (
          <button onClick={startTimer} type="button">
            <span>
              <Play />
            </span>
          </button>
        )}
        {timerContext.timer && (
          <button type="submit">
            <span>
              <Pause />
            </span>
          </button>
        )}
      </form>
      <div>
        <TagSelect tag={currentTrack.tag} setTag={currentTrack.setTag} />
        <ProjectSelect
          projectId={currentTrack.projectId}
          setProjectId={currentTrack.setProjectId}
        />
      </div>
      <div>
        <CurrentTracks />
      </div>
    </div>
  );
};

export default AddTimeTrack;
