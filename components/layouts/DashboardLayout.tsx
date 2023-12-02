import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SWRConfig } from 'swr';
import { Toaster } from 'sonner';
import axios from 'axios';
import styles from './DashboardLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
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
    </>
  );
};

export default DashboardLayout;
