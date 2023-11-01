import React from 'react';
import { getUserTags } from '@/lib/db';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import { ITag } from '@/models/tag';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AddTag from '@/components/dashboard/tags/AddTag';
import Modal from '@/components/ui/Modal';

interface Props {
  tags: ITag[];
}

const TagsPage: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <div>
      {/* <AddTag /> */}
      <Modal>
        <Modal.Button asChild>
          <button>Test</button>
        </Modal.Button>
        <Modal.Content
          title="Testing modal"
          description="Test add tags adding functionality"
        >
          <div>
            <Modal.Close>Close</Modal.Close>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

TagsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TagsPage;
