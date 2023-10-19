import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../ui/PrimaryButton';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function logoutHandler() {
    await signOut({ redirect: false });
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
              <PrimaryButton href={'/sign-up'}>Get Started</PrimaryButton>
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
              <PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
