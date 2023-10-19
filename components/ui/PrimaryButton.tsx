import React from 'react';
import Link from 'next/link';
import styles from './PrimaryButton.module.scss';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function PrimaryButton(props: ButtonProps) {
  if (props.href) {
    return (
      <Link className={styles.primary} href={props.href}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={styles.primary} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default PrimaryButton;
