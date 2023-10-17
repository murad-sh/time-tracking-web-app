import React, { useState, useRef, FormEvent } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { ITimeTrack } from '@/models/time-track';
import { getUserTimeTracks } from '@/lib/db';
import mongoose from 'mongoose';

// ! EVERYTHING HERE IS TEMPORARY FOR DEMO PURPOSES ONLY
type Props = {
  timeTracks: ITimeTrack[];
};

const DashboardPage = (props: Props) => {
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
    const res = await fetch('/api/create-time-track', {
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
    <section>
      <h1>{`Welcome back ${session?.user?.name}!`}</h1>
      <div>
        <h3>Your latest tracks</h3>
        {props.timeTracks.length === 0 && <p>No time tracks yet</p>}
        <ul>
          {props.timeTracks.map((track) => (
            <li key={track._id?.toString()}>
              <p>{track.title}</p>
              <p>{track.start.toString()}</p>
              <p>{track.end.toString()}</p>
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
    </section>
  );
};

export default DashboardPage;

// ! TEMPORARY
export const getServerSideProps = (async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const userId = new mongoose.Types.ObjectId(session.user.id);
  const timeTracks = await getUserTimeTracks(userId);

  if (!timeTracks) {
    return { props: { timeTracks: [] } };
  }

  return {
    props: { timeTracks },
  };
}) satisfies GetServerSideProps;
