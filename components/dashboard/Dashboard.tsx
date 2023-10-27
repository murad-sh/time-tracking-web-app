import React, { useState, useRef, FormEvent } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { ITimeTrack } from '@/models/time-track';
import styles from './Dashboard.module.scss';
import { calculateDifference } from './timer/TimeTrackItem';
// ! EVERYTHING HERE IS TEMPORARY FOR DEMO PURPOSES ONLY
interface Props {
  timeTracks: ITimeTrack[];
}

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  const [btnStop, setBtnStop] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);

  function startTimer() {
    setStartTime(new Date());
    setBtnStop(true);
  }

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
    <div className={styles.content}>
      <h1>{`Welcome back ${session?.user?.name}!`}</h1>
      <h3>Your latest tracks</h3>
      {props.timeTracks.length === 0 && <p>No time tracks yet</p>}
      <div>
        <ul>
          {props.timeTracks.map((track) => (
            <li key={track._id?.toString()}>
              <p>Title: {track.title}</p>
              <p>Date: {new Date(track.start).toLocaleDateString()}</p>
              <p>Duration: {calculateDifference(track.start, track.end)}</p>
            </li>
          ))}
        </ul>
      </div>
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
    </div>
  );
};

export default Dashboard;
