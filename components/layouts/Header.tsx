import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

interface HeaderProps {
  isSticky?: boolean;
}

const Header = (props: HeaderProps) => {
  const { status } = useSession();
  const router = useRouter();
  const activeNav = router.pathname;

  async function logoutHandler() {
    await signOut({ redirect: false });
    router.replace('/');
  }

  return (
    <header className={`${styles.header} ${props.isSticky && styles.sticky}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Time Tracker
        </Link>
        <nav>
          <ul className={styles.list}>
            {status === 'unauthenticated' && (
              <li className={styles.item}>
                <SecondaryButton
                  isActive={activeNav === '/login'}
                  href={'/login'}
                >
                  Login
                </SecondaryButton>
              </li>
            )}
            {status === 'unauthenticated' && (
              <li className={styles.item}>
                <PrimaryButton href={'/sign-up'}>Get Started</PrimaryButton>
              </li>
            )}
            {status === 'authenticated' && (
              <li className={styles.item}>
                <SecondaryButton
                  isActive={activeNav === '/dashboard'}
                  href={'/dashboard'}
                >
                  Dashboard
                </SecondaryButton>
              </li>
            )}
            {status === 'authenticated' && (
              <li className={styles.item}>
                <PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
