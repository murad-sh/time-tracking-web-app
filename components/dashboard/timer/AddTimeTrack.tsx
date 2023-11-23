import React, { useRef, useState, FormEvent } from 'react';
import { timeTrackSchema } from '@/lib/validations/time-track';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import axios from 'axios';
import TagSelect from './TagSelect';

import styles from './AddTimeTrack.module.scss';
// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';
import ProjectSelect from './ProjectSelect';
import SendDummyDataButton from './DummyDataTest';

const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(false);
  const [tag, setTag] = useState('');
  const [project, setProject] = useState('');

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
    setTimer(true);
  }

  // !REFACTOR THIS
  async function sendTrack(event: FormEvent) {
    event.preventDefault();
    const endDate = new Date();
    setTimer(false);
    let requestData: any = {
      title: titleRef.current!.value,
      start: startTime,
      end: endDate,
    };

    if (tag) {
      requestData = { ...requestData, tag: tag };
    }
    if (project) {
      requestData = { ...requestData, projectId: project };
    }
    const validatedData = timeTrackSchema.safeParse(requestData);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    try {
      await axios.post('/api/user/time-tracks/', validatedData.data);

      toast.success('Successfully added!');
    } catch (error) {
      toast.error('Failed to add!');
    }
    setBtnStop(false);
    setTag('');
    setProject('');
    titleRef.current!.value = '';
  }

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
        <ProjectSelect projectId={project} setProjectId={setProject} />\
      </div>
      {/* <SendDummyDataButton /> */}
    </div>
  );
};

export default AddTimeTrack;
