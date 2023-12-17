import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ClockIcon, BarChart3Icon, FileTextIcon, TagIcon } from 'lucide-react';
import { formatDuration } from '@/lib/utils/date';
import { useTimerContext } from '@/hooks/use-store-hooks';

const Sidebar = () => {
  const router = useRouter();
  const activeLink = router.pathname;
  const { timer, time } = useTimerContext();

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link
            className={activeLink === '/dashboard' ? styles.active : ''}
            href={'/dashboard'}
          >
            <span className={styles.nav}>
              <ClockIcon />
              {timer ? formatDuration(time) : 'Timer'}
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink.includes('reports') ? styles.active : ''}
            href={'/dashboard/reports'}
          >
            <span className={styles.nav}>
              <BarChart3Icon />
              Reports
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink.includes('projects') ? styles.active : ''}
            href={'/dashboard/projects'}
          >
            <span className={styles.nav}>
              <FileTextIcon />
              Projects
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={activeLink.includes('tags') ? styles.active : ''}
            href={'/dashboard/tags'}
          >
            <span className={styles.nav}>
              <TagIcon />
              Tags
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
