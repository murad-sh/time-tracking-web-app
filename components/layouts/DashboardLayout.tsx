import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header isDashboard={true} />
      <div className={styles.container}>
        <aside>
          <Sidebar />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
