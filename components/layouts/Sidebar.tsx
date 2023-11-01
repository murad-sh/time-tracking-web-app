import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const activeLink = router.pathname;

  return (
    <nav className={styles['side-nav']}>
      <ul>
        <li>
          <Link
            className={activeLink === '/dashboard' ? styles.active : ''}
            href={'/dashboard'}
          >
            Timer
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/reports' ? styles.active : ''}
            href={'/dashboard/reports'}
          >
            Reports
          </Link>
        </li>
        <li>
          <Link
            className={
              activeLink === '/dashboard/projects' ? styles.active : ''
            }
            href={'/dashboard/projects'}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/tags' ? styles.active : ''}
            href={'/dashboard/tags'}
          >
            Tags
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
