import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>404</h1>
        <p>Page not found!</p>
      </div>
    </div>
  );
};

export default NotFound;
