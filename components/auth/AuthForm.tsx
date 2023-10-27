import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { signIn } from 'next-auth/react';
import {
  signUpSchema,
  SignUpSchemaType,
  loginSchema,
  LoginSchemaType,
} from '@/lib/validations/auth';
import { createUser } from '@/lib/user-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourceConflictError } from '@/lib/utils/exceptions';
import PrimaryButton from '../ui/PrimaryButton';
import { useRouter } from 'next/router';

type ActionType = 'Login' | 'Sign-up';

interface FormProps {
  action: ActionType;
}

const AuthForm = ({ action }: FormProps) => {
  const isLogin = action === 'Login';
  const router = useRouter();

  type AuthSchemaType = typeof isLogin extends true
    ? LoginSchemaType
    : SignUpSchemaType;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
    mode: 'all',
  });

  async function onSubmit(enteredData: AuthSchemaType) {
    if (action === 'Login') {
      const res = await signIn('credentials', {
        email: enteredData.email,
        password: enteredData.password,
        redirect: true,
        callbackUrl: (router.query?.from as string) || '/dashboard',
      });

      if (res?.error && res.status === 401) {
        setError('root.serverError', {
          type: 'server',
          message: 'Login Failed: Unable to verify your login information.',
        });
      }
      if (res?.error && res.status === 500) {
        setError('root.serverError', {
          type: 'server',
          message: 'Internal server-side error.',
        });
      }
    } else {
      try {
        await createUser(
          enteredData.name,
          enteredData.email,
          enteredData.password,
          enteredData.confirmPassword
        );
        await signIn('credentials', {
          email: enteredData.email,
          password: enteredData.password,
          redirect: true,
          callbackUrl: '/dashboard',
        });
      } catch (error) {
        if (error instanceof ResourceConflictError) {
          setError('email', {
            type: 'server',
            message: error.message,
          });
        } else {
          setError('root.serverError', {
            type: 'server',
            message: 'Signing up failed. Please try again',
          });
        }
      }
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{action === 'Login' ? 'Welcome back' : 'Start Tracking Time'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['auth-form']}>
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
              <p className={styles['error-msg']}>{`${errors.name.message}`}</p>
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
            <p className={styles['error-msg']}>{`${errors.email.message}`}</p>
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
            <p
              className={styles['error-msg']}
            >{`${errors.password.message}`}</p>
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
              <p
                className={styles['error-msg']}
              >{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
        )}
        <div className={styles.actions}>
          <PrimaryButton className={isSubmitting ? styles.submitting : ''}>
            {!isLogin ? 'Create Account' : 'Login'}
          </PrimaryButton>

          <Link
            className={styles.toggle}
            href={!isLogin ? '/login' : '/sign-up'}
          >
            {!isLogin ? 'Login with existing account' : 'Create new account'}
          </Link>
          {errors.root?.serverError && (
            <p className={styles['error-msg']}>
              {errors.root.serverError.message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
