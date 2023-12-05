import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SWRConfig } from 'swr';
import { Toaster } from 'sonner';
import axios from 'axios';
import styles from './DashboardLayout.module.scss';
import Head from 'next/head';
import { useTimerContext } from '@/hooks/use-store-hooks';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { timer, documentTitle } = useTimerContext();

  return (
    <>
      <Head>
        <title>{timer ? documentTitle : 'Time Tracker'}</title>
      </Head>
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
