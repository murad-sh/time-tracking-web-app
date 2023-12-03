import React from 'react';
import styles from './ErrorMessage.module.scss';
import { AlertTriangleIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const ErrorMessage = () => {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <div>
        <p>
          <span>
            <AlertTriangleIcon />
          </span>
          Oops! Something went wrong!
        </p>
        <div className={styles.btn__container}>
          <button onClick={() => router.reload()}>Try again</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
