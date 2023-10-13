import React, { Fragment } from 'react';
import Link from 'next/link';

import styles from '@/styles/Button.module.scss';

interface ButtonProps {
  type: 'link' | 'btn';
  href?: string;
  children?: React.ReactNode;
  // onClick?: () =>{}
}

const Button = (props: ButtonProps) => {
  const linkBtn = props.type === 'link';

  return (
    <Fragment>
      {linkBtn ? (
        <Link href={props.href!} className={styles['btn--link']}>
          {props.children}
        </Link>
      ) : (
        <button className={styles['btn--button']}>{props.children}</button>
      )}
    </Fragment>
  );
};

export default Button;
