import React from 'react';
import { Loader2 as Spinner } from 'lucide-react';
import styles from './Loader.module.scss';

const Loader = () => {
  return <Spinner className={styles.spinner} />;
};

export default Loader;
