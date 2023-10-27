import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './SecondaryButton.module.scss';

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Link
      href={props.href}
      className={`${styles.secondary} ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

export default SecondaryButton;
