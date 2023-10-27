import React from 'react';
import { getUserTags } from '@/lib/db';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import { ITag } from '@/models/tag';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface Props {
  tags: ITag[];
}

const TagsPage: NextPageWithLayout<Props> = (props: Props) => {
  return <div>TagsPage</div>;
};

TagsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TagsPage;
