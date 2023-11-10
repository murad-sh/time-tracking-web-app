import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Timer, Clock, BarChart3, PieChart, FileText, Tag } from 'lucide-react';

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
            <span className={styles.nav}>
              <span className={styles.icon}>
                <Clock />
              </span>
              <span>Timer</span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/reports' ? styles.active : ''}
            href={'/dashboard/reports'}
          >
            <span className={styles.nav}>
              <span className={styles.icon}>
                {/* <PieChart /> */}
                {<BarChart3 />}
              </span>
              <span>Reports</span>
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
              <span className={styles.logo}>
                <FileText />
              </span>
              <span>Projects</span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink === '/dashboard/tags' ? styles.active : ''}
            href={'/dashboard/tags'}
          >
            <span className={styles.nav}>
              <span className={styles.logo}>
                <Tag />
              </span>
              <span>Tags</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
