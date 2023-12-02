import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import type { NextPageWithLayout } from '../../_app';
import type { ReactElement } from 'react';
import Project from '@/components/dashboard/projects/project/Project';

const ProjectPage: NextPageWithLayout = () => {
  return (
    <section>
      <Project />
    </section>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ProjectPage;
