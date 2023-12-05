import React, { Fragment, ReactNode } from 'react';
import Header from './Header';
import Head from 'next/head';
import { useTimerContext } from '@/hooks/use-store-hooks';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { timer, documentTitle } = useTimerContext();
  return (
    <Fragment>
      <Head>
        <title>
          {timer
            ? documentTitle
            : 'Time Tracker: Versatile Time Tracking Software for Everyone'}
        </title>
      </Head>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
