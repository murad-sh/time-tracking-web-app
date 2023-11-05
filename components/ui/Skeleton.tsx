import React from 'react';
import styles from './Skeleton.module.scss';

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`${styles.skeleton} ${className}`}></div>;
};

export default Skeleton;
