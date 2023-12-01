import React from 'react';
import ProjectBoard from '@/components/dashboard/projects/ProjectBoard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import type { NextPageWithLayout } from '../../_app';
import type { ReactElement } from 'react';

const ProjectsPage: NextPageWithLayout = () => {
  return (
    <section>
      <ProjectBoard />
    </section>
  );
};

ProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProjectsPage;
