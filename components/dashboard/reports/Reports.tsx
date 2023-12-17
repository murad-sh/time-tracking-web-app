import React from 'react';
import WeekNavigation from './WeekNavigation';
import styles from './Reports.module.scss';
import { useRouter } from 'next/router';
import WeeklyData from './WeeklyData';

const Reports = () => {
  const router = useRouter();
  const currentView = router.query.view || 'charts';

  const changeView = (query: 'charts' | 'list') => {
    router.replace(
      {
        query: {
          ...router.query,
          view: query,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Reports</h1>
        <div className={styles.controller}>
          <div>
            <button
              className={`${styles.switch} ${
                currentView === 'charts' && styles.active
              }`}
              onClick={() => changeView('charts')}
            >
              Overview
            </button>
            <button
              className={`${styles.switch} ${
                currentView === 'list' && styles.active
              }`}
              onClick={() => changeView('list')}
            >
              Detailed
            </button>
          </div>
          <WeekNavigation />
        </div>
      </div>
      <div className={styles.report}>
        <WeeklyData />
      </div>
    </div>
  );
};

export default Reports;
