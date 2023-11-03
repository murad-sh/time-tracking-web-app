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
    setToggle(false);
    const session = await getSession();
    if (!session) {
      console.error('No session found');
      return;
    }
    const res = await fetch('/api/time-tracks', {
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
      {!timer && <p>Start recording now!</p>}
      {timer && <Stopwatch timer={timer} />}
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
