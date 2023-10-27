import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AddTimeTrack from '@/components/dashboard/timer/AddTimeTrack';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <section>
      <AddTimeTrack />
    </section>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
