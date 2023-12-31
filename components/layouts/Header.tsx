import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import UserNav from './UserNav';

interface HeaderProps {
  isSticky?: boolean;
}

const Header = (props: HeaderProps) => {
  const { status, data } = useSession();
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
            {activeNav === '/' && (
              <li className={styles.item}>
                <SecondaryButton href="#features">Features</SecondaryButton>
              </li>
            )}
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
            {status === 'authenticated' && activeNav === '/' && (
              <li className={styles.item}>
                <SecondaryButton href={'/dashboard'}>Dashboard</SecondaryButton>
              </li>
            )}
            {status === 'authenticated' && (
              <li className={styles.item}>
                <UserNav
                  username={data.user.name!}
                  email={data.user.email!}
                  action={logoutHandler}
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
