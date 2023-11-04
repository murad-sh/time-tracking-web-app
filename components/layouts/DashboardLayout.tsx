import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.scss';

import { Toaster } from 'sonner';

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
        <main>{children}</main>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default DashboardLayout;
