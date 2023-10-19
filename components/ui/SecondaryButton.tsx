import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './SecondaryButton.module.scss';

type ButtonProps = {
  href: string;
  children: ReactNode;
};

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Link href={props.href} className={styles.secondary}>
      {props.children}
    </Link>
  );
};

export default SecondaryButton;
