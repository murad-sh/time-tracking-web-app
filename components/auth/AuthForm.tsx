import React from 'react';
import Link from 'next/link';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import PrimaryButton from '../ui/PrimaryButton';
import Loader from '../ui/Loader';

interface FormProps {
  isLogin: boolean;
  onSubmit: () => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isSubmitting: boolean;
}

const AuthForm = ({
  onSubmit,
  isLogin,
  register,
  errors,
  isSubmitting,
}: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {!isLogin && (
        <div className={styles.control}>
          <label htmlFor="name">Your Name</label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Full Name"
          />
          {errors.name && (
            <span className={styles.error}>{`${errors.name.message}`}</span>
          )}
        </div>
      )}
      <div className={styles.control}>
        <label htmlFor="email">Your Email</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <span className={styles.error}>{`${errors.email.message}`}</span>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="password">Your Password</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={styles.error}>{`${errors.password.message}`}</span>
        )}
      </div>
      {!isLogin && (
        <div className={styles.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span
              className={styles.error}
            >{`${errors.confirmPassword.message}`}</span>
          )}
        </div>
      )}
      <div className={styles.actions}>
        <PrimaryButton disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loader /> : !isLogin ? 'Create Account' : 'Login'}
        </PrimaryButton>
        <Link className={styles.toggle} href={!isLogin ? '/login' : '/sign-up'}>
          {!isLogin ? 'Login with existing account' : 'Create new account'}
        </Link>
        {errors.root?.serverError && (
          <span className={styles.server}>
            {errors.root.serverError.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
