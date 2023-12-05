import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

import TimeTrackList from '@/components/dashboard/reports/TimeTrackList';

// !TEMP
import Weekly from '@/components/dashboard/reports/Weekly';

interface Props {
  timeTracks: ITimeTrack[];
}

const ReportsPage: NextPageWithLayout = () => {
  return (
    <section>
      {/* <TimeTrackList timeTracks={props.timeTracks}></TimeTrackList> */}
      {/*  !TEMP */}
      <div
        style={{
          width: '70rem',
          border: '1px solid black',
          padding: '2rem',
        }}
      >
        <Weekly />
      </div>
    </section>
  );
};

ReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ReportsPage;

// export const getServerSideProps = (async (context) => {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     };
//   }

//   const userId = new mongoose.Types.ObjectId(session.user.id);
//   const timeTracks = await getUserTimeTracks(userId);

//   if (!timeTracks) {
//     return { props: { timeTracks: [] } };
//   }

//   return {
//     props: { timeTracks },
//   };
// }) satisfies GetServerSideProps;
