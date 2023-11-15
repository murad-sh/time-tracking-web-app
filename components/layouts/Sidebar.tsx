import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Clock, BarChart3, FileText, Tag } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();
  const activeLink = router.pathname;

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link
            className={activeLink === '/dashboard' ? styles.active : ''}
            href={'/dashboard'}
          >
            <span className={styles.nav}>
              <Clock />
              Timer
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/reports' ? styles.active : ''}
            href={'/dashboard/reports'}
          >
            <span className={styles.nav}>
              <BarChart3 />
              Reports
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={
              activeLink === '/dashboard/projects' ? styles.active : ''
            }
            href={'/dashboard/projects'}
          >
            <span className={styles.nav}>
              <FileText />
              Projects
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/tags' ? styles.active : ''}
            href={'/dashboard/tags'}
          >
            <span className={styles.nav}>
              <Tag />
              Tags
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
