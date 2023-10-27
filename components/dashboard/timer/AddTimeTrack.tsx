import React, { useRef, useState, FormEvent } from 'react';
import { getSession } from 'next-auth/react';

// TODO: Add validation for tracks and later a way to attach projects and tags
const AddTimeTrack = () => {
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
  }

  // TODO: move this function to lib folder
  async function sendTrack(event: FormEvent) {
    event.preventDefault();
    const endDate = new Date();
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
