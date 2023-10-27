import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { ITimeTrack } from '@/models/time-track';
import { getUserTimeTracks } from '@/lib/db';
import mongoose from 'mongoose';
import Dashboard from '@/components/dashboard/Dashboard';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// ! EVERYTHING HERE IS TEMPORARY FOR DEMO PURPOSES ONLY
interface Props {
  timeTracks: ITimeTrack[];
}

const DashboardPage: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <section>
      <Dashboard timeTracks={props.timeTracks} />
    </section>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
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
