import React from 'react';
import Link from 'next/link';
import styles from './PrimaryButton.module.scss';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const buttonType = props.type || 'button';

    if (props.href) {
      return (
        <Link
          className={`${styles.primary} ${props.className}`}
          href={props.href}
        >
          {props.children}
        </Link>
      );
    }

    return (
      <button
        className={`${styles.primary} ${props.className}`}
        onClick={props.onClick}
        type={buttonType}
        ref={ref}
      >
        {props.children}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
