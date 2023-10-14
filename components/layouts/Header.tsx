import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  function logoutHandler() {
    signOut();
    router.replace('/');
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        Time Tracker
      </Link>
      <nav>
        <ul className={styles.nav__list}>
          {status === 'unauthenticated' && (
            <li className={styles.list__item}>
              <Link href={'/login'} className={styles['list__item--link']}>
                Login
              </Link>
            </li>
          )}
          {status === 'unauthenticated' && (
            <li className={styles.list__item}>
              <Link href={'/sign-up'} className={styles['list__item--btn']}>
                Get Started
              </Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li>
              <p>{session.user?.name}</p>
            </li>
          )}
          {status === 'authenticated' && (
            <li className={styles.list__item}>
              <Link href={'/dashboard'} className={styles['list__item--link']}>
                Dashboard
              </Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li className={styles.list__item}>
              <button
                onClick={logoutHandler}
                className={styles['list__item--btn']}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
