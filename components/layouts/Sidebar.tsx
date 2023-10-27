import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  // TODO : ACTIVE CLASS SCSS
  const activeLink = router.pathname;

  return (
    <nav className={styles['side-nav']}>
      <ul>
        <li>
          <Link href={'/dashboard'}>Timer</Link>
        </li>
        <li>
          <Link href={'/dashboard/reports'}>Reports</Link>
        </li>
        <li>
          <Link href={'/dashboard/projects'}>Projects</Link>
        </li>
        <li>
          <Link href={'/dashboard/tags'}>Tags</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
