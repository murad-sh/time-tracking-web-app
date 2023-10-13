import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
// import { useSession } from 'next-auth/react';

const Header = () => {
  const temp = false;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        Time Tracker
      </Link>
      <nav>
        <ul className={styles.nav__list}>
          <li className={styles.list__item}>
            <Link href={'/login'} className={styles['list__item--link']}>
              Login
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link href={'/sign-up'} className={styles['list__item--btn']}>
              Get Started
            </Link>
          </li>
          {temp && (
            <li className={styles.list__item}>
              <button className={styles['list__item--btn']}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
