import React from 'react';
import Link from 'next/link';
import styles from './PrimaryButton.module.scss';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  ariaLabel?: string;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const buttonType = props.type || 'button';

    if (props.href) {
      return (
        <Link
          className={`${styles.primary} ${props.className}`}
          href={props.href}
          aria-label={props.ariaLabel}
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
        disabled={props.disabled}
        aria-label={props.ariaLabel}
      >
        {props.children}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
