import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.legal}>
          <p>&copy; 2023 by Murad Shahbazov. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
