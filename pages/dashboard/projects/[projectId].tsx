import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import type { NextPageWithLayout } from '../../_app';
import type { ReactElement } from 'react';

const ProjectPage: NextPageWithLayout = () => {
  return <div>ProjectPage</div>;
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProjectPage;
