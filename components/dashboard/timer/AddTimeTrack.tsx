import React, { useRef, useState, FormEvent } from 'react';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import TagSelect from './TagSelect';
import { sendTimeTrack, TimeTrackRecording } from '@/lib/utils/services';

import { isSameDay, endOfDay, startOfDay, differenceInHours } from 'date-fns';

import styles from './AddTimeTrack.module.scss';
// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';
import ProjectSelect from './ProjectSelect';
import SendDummyDataButton from './DummyDataTest';
import { ITimeTrack } from '@/models/time-track';
import CurrentTracks from './CurrentTracks';

const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(false);
  const [tag, setTag] = useState('');
  const [project, setProject] = useState('');
  const MAX_DURATION = 48;

  const startTimer = () => {
    setStartTime(new Date());
    setBtnStop(true);
    setTimer(true);
  };

  const createTimeTrack = (startDate: Date, endDate: Date) => {
    let requestData: TimeTrackRecording = {
      title: titleRef.current!.value,
      start: startDate,
      end: endDate,
    };
    if (tag) {
      requestData = { ...requestData, tag: tag };
    }
    if (project) {
      requestData = { ...requestData, projectId: project };
    }
    return requestData;
  };

  async function sendTrack(event: FormEvent) {
    event.preventDefault();
    let startDate = startTime || new Date();
    const endDate = new Date();
    setTimer(false);
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
      toast.success('Time track recorded successfully!');
    } catch (error) {
      toast.error(
        'Oops! There was a problem recording the time track. Please try again.'
      );
    }
    resetForm();
  }

  const resetForm = () => {
    setBtnStop(false);
    setTag('');
    setProject('');
    setStartTime(null);
    titleRef.current!.value = '';
  };

  return (
    <div>
      <Stopwatch timer={timer} />
      <form onSubmit={sendTrack}>
        <input
          name="title"
          type="text"
          placeholder="title"
          ref={titleRef}
        ></input>

        {!btnStop && (
          <button onClick={startTimer} type="button">
            <span>
              <Play />
            </span>
          </button>
        )}
        {btnStop && (
          <button type="submit">
            <span>
              <Pause />
            </span>
          </button>
        )}
      </form>
      <div>
        <TagSelect tag={tag} setTag={setTag} />
        <ProjectSelect projectId={project} setProjectId={setProject} />
      </div>
      {/* <SendDummyDataButton /> */}
      <div>
        <CurrentTracks />
      </div>
    </div>
  );
};

export default AddTimeTrack;
