import React, { useRef, useState, FormEvent } from 'react';
import { getSession } from 'next-auth/react';
import styles from './AddTimeTrack.module.scss';
import { useForm } from 'react-hook-form';
import { timeTrackSchema } from '@/lib/validations/time-track';
import Stopwatch from './Stopwatch';

// TODO: Add validation for tracks and later a way to attach projects and tags
const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(false);

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
    setToggle(true);
  }

  // TODO: move this function to lib folder
  async function sendTrack(event: FormEvent) {
    event.preventDefault();
    const endDate = new Date();
    setToggle(false);
    const session = await getSession();
    if (!session) {
      console.error('No session found');
      return;
    }
    const res = await fetch('/api/user/create-time-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleRef.current!.value,
        start: startTime,
        end: endDate,
      }),
    });

    if (res.ok) {
      console.log(res);
      setBtnStop(false);
    }
  }

  return (
    <div>
      {!toggle && <p>Start recording now!</p>}
      {toggle && <Stopwatch toggle={toggle} />}
      <form onSubmit={sendTrack}>
        <input
          name="title"
          type="text"
          placeholder="title"
          ref={titleRef}
        ></input>

        {!btnStop && (
          <button onClick={startTimer} type="button">
            {'Start'}
          </button>
        )}
        {btnStop && <button type="submit">{'Stop'}</button>}
      </form>
    </div>
  );
};

export default AddTimeTrack;
