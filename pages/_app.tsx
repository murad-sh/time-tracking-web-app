import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layouts/Layout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { TimerProvider } from '@/store/timer-context';
import { TimeTrackProvider } from '@/store/time-track-context';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={pageProps.session}>
      <TimerProvider>
        <TimeTrackProvider>
          {getLayout(<Component {...pageProps} />)}
        </TimeTrackProvider>
      </TimerProvider>
    </SessionProvider>
  );
}
