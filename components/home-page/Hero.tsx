import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';
import PrimaryButton from '../ui/PrimaryButton';
const HeroSection = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>
            <h1>Enhance Your Time, Elevate Your Life</h1>
          </div>
          <div>
            <p>
              Welcome to TimeTracker - where time management meets productivity.
              Get started for free and take control of your day effortlessly.
            </p>
          </div>
          <div>
            <PrimaryButton href="/sign-up" className={styles.btn}>
              Get started with TimeTracker
            </PrimaryButton>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src="/images/hero-main.png"
            alt="Computer with dashboard"
            width={1024}
            height={1024}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
