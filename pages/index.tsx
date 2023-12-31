import { Fragment } from 'react';
import HeroSection from '@/components/home-page/Hero';
import Features from '@/components/home-page/Features';

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <Features />
    </Fragment>
  );
}
