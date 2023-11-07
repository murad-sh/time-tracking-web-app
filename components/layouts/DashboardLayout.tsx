import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.scss';

import { SWRConfig } from 'swr';
import { Toaster } from 'sonner';
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header isSticky={true} />
      <div className={styles.container}>
        <aside>
          <Sidebar />
        </aside>
        <SWRConfig
          value={{
            fetcher: (url: string) => axios.get(url).then((res) => res.data),
          }}
        >
          <main>{children}</main>
        </SWRConfig>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default DashboardLayout;
