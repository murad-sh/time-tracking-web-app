import React from 'react';
import styles from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        &copy; {currentYear} by Murad Shahbazov. All rights reserved.
      </div>
    </footer>
  );
}
