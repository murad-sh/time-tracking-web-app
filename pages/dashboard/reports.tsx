import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import type { GetServerSideProps } from 'next';
import { getUserTimeTracks } from '@/lib/db';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

import TimeTrackList from '@/components/dashboard/reports/TimeTrackList';

// !TEMP
import WeeklyChart from '@/components/dashboard/reports/WeeklyChart';

interface Props {
  timeTracks: ITimeTrack[];
}

const ReportsPage: NextPageWithLayout = () => {
  return (
    <section>
      {/* <TimeTrackList timeTracks={props.timeTracks}></TimeTrackList> */}
      <WeeklyChart />
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
