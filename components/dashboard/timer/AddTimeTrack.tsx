import React, { useRef, useState, FormEvent } from 'react';
import { getSession } from 'next-auth/react';
import styles from './AddTimeTrack.module.scss';
import { useForm } from 'react-hook-form';
import { timeTrackSchema } from '@/lib/validations/time-track';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import axios from 'axios';
import { Tag } from 'lucide-react';

// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';
import TagSelect from './TagSelect';

// TODO: Add validation for tracks and later a way to attach projects and tags
const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(false);
  const [tag, setTag] = useState('');

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
    setTimer(true);
  }

  async function sendTrack(event: FormEvent) {
    event.preventDefault();
    const endDate = new Date();
    setTimer(false);

    try {
      await axios.post('/api/user/time-tracks/', {
        title: titleRef.current!.value,
        start: startTime,
        end: endDate,
      });

      toast.success('Successfully added!');
    } catch (error) {
      toast.error('Failed to add!');
    }
    setBtnStop(false);
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
      </div>
    </div>
  );
};

export default AddTimeTrack;
