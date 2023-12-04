import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className={styles.container}>
        <Link href="/dashboard/projects" className={styles.link}>
          <span className={styles.icon}>
            <ChevronLeftIcon />
          </span>
          Back
        </Link>
      </nav>
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default Layout;
