import React from 'react';
import styles from './Layout.module.scss';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <Link href="/dashboard/projects">Back</Link>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default Layout;
