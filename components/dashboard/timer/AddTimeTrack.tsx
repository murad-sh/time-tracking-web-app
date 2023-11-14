import React, { useRef, useState, FormEvent } from 'react';
import { getSession } from 'next-auth/react';
import styles from './AddTimeTrack.module.scss';
import { useForm } from 'react-hook-form';
import { timeTrackSchema } from '@/lib/validations/time-track';
import Stopwatch from './Stopwatch';
import { toast } from 'sonner';
import axios from 'axios';

// !TEST ALL
import { Play, PlayCircle, Pause, PauseCircle } from 'lucide-react';

//!TEMP
import Dropdown from '@/components/ui/Dropdown';
import Select from '@/components/ui/Select';

// TODO: Add validation for tracks and later a way to attach projects and tags
const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(false);

  //!temp
  const [value, setValue] = useState('');

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

  console.log(value);
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
            <Dropdown.MenuItem asChild>
              <button className={styles.edit}>Edit</button>
            </Dropdown.MenuItem>
            <Dropdown.Separator className={styles.separator} />
            <Dropdown.MenuItem asChild>
              <button className={styles.delete}>Delete</button>
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
      {/* <div>
        <Select value={value} setValue={setValue}>
          <Select.Button>Add Tag</Select.Button>
          <Select.Content>
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="work">Work</Select.Item>
            <Select.Item value="personal">Personal</Select.Item>
          </Select.Content>
        </Select>
      </div> */}
    </div>
  );
};

export default AddTimeTrack;
