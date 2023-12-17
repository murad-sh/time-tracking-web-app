import React from 'react';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Reports from '@/components/dashboard/reports/Reports';

const ReportsPage: NextPageWithLayout = () => {
  return (
    <section>
      <Reports />
    </section>
  );
};

ReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ReportsPage;
