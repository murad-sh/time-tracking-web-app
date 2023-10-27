import React from 'react';
import AddProject from '@/components/dashboard/projects/AddProject';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import { getUserProjects } from '@/lib/db';
import { IProject } from '@/models/project';

interface Props {
  projects: IProject[];
}

const ProjectsPage: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <section>
      <AddProject />
    </section>
  );
};

ProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProjectsPage;
