import React, { ReactNode } from 'react';
import Header from './Header';
import Head from 'next/head';
import { useTimerContext } from '@/hooks/use-store-hooks';
import { Footer } from './Footer';
import styles from './Layout.module.scss';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { timer, documentTitle } = useTimerContext();
  const pathName = usePathname();

  return (
    <div className={styles.main}>
      <Head>
        <title>
          {timer
            ? documentTitle
            : 'Time Tracker: Versatile Time Tracking Software for Everyone'}
        </title>
        <meta
          name="description"
          content="Discover efficient time management with our advanced time-tracking software. Create and organize projects with customizable tags, effortlessly record track durations, and gain insights with detailed weekly reports. Plus, receive comprehensive email summaries every week. Perfect for professionals seeking to optimize productivity."
        />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer homePage={pathName === '/'} />
    </div>
  );
};

export default Layout;
