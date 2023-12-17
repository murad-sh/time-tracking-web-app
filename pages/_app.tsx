import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layouts/Layout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { TimerProvider } from '@/store/timer-context';
import { TimeTrackProvider } from '@/store/time-track-context';
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

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
          <style jsx global>
            {`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}
          </style>
          {getLayout(<Component {...pageProps} />)}
        </TimeTrackProvider>
      </TimerProvider>
    </SessionProvider>
  );
}
