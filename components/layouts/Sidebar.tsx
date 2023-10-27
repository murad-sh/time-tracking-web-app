import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  // TODO : ACTIVE CLASS SCSS
  console.log(router.pathname);

  return (
    <nav className={styles['side-nav']}>
      <h1>SIDEBAR</h1>
      <ul>
        <li>
          <Link href={''}>Timer</Link>
        </li>
        <li>
          <Link href={''}>Reports</Link>
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
