import React, { useRef, useState, FormEvent } from 'react';
import { getSession } from 'next-auth/react';
import styles from './AddTimeTrack.module.scss';
import { useForm } from 'react-hook-form';
import { timeTrackSchema } from '@/lib/validations/time-track';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';

// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';
//!TEMP
import Dropdown from '@/components/ui/Dropdown';
import axios from 'axios';

// TODO: Add validation for tracks and later a way to attach projects and tags
const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(false);

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
    setTimer(true);
  }

  // TODO: move this function to lib folder
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
      {/* <div>
        <Dropdown>
          <Dropdown.Button>open</Dropdown.Button>
          <Dropdown.Menu>
            <Dropdown.MenuItem onClick={() => console.log('edit')}>
              Edit
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onSelect={() => console.log('delete')}>
              Delete
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
    </div>
  );
};

export default AddTimeTrack;
