import React from 'react';
import styles from './Skeleton.module.scss';

const Skeleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={`${styles.skeleton} ${className}`}>{children}</div>;
};

export default Skeleton;
