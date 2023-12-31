import React from 'react';
import styles from './Footer.module.scss';

export function Footer({ homePage }: { homePage?: boolean }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${homePage && styles['bg-white']}`}>
      <div className={styles.content}>
        &copy; {currentYear} by{' '}
        <a href="https://github.com/murad-sh">Murad Shahbazov</a>. All rights
        reserved.
      </div>
    </footer>
  );
}
