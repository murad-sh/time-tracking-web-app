import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SWRConfig } from 'swr';
import { Toaster } from 'sonner';
import axios from 'axios';
import styles from './Layout.module.scss';
import Head from 'next/head';
import { useTimerContext } from '@/hooks/use-store-hooks';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { timer, documentTitle } = useTimerContext();

  return (
    <div className={styles.main}>
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
      <Footer />
    </div>
  );
};

export default DashboardLayout;
