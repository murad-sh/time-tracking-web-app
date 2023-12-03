import React from 'react';
import { Loader2 as Spinner } from 'lucide-react';
import styles from './Loader.module.scss';

const Loader = ({ className }: { className?: string }) => {
  return <Spinner className={`${styles.spinner} ${className}`} />;
};

export default Loader;
