import React from 'react';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TagBoard from '@/components/dashboard/tags/TagBoard';

const TagsPage: NextPageWithLayout = () => {
  return <TagBoard />;
};

TagsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TagsPage;
