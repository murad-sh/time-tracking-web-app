import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import {
  signUpSchema,
  SignUpSchemaType,
  loginSchema,
  LoginSchemaType,
} from '@/lib/validation/schemas';
import { createUser, loginUser } from '@/utils/user-actions';
import { zodResolver } from '@hookform/resolvers/zod';

type ActionType = 'Login' | 'Sign-up';

type FormProps = {
  action: ActionType;
};

const AuthForm = ({ action }: FormProps) => {
  const isLogin = action === 'Login';
  // ? to figure out how to handle server errors
  // Todo setError root.server

  type AuthSchemaType = typeof isLogin extends true
    ? LoginSchemaType
    : SignUpSchemaType;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
    // ? Experimental
    mode: 'onBlur',
  });

  const router = useRouter();

  async function onSubmit(enteredData: AuthSchemaType) {
    try {
      if (action === 'Login') {
        await loginUser(enteredData.email, enteredData.password, setError);
        router.replace('/dashboard');
      } else {
        await createUser(
          enteredData.name,
          enteredData.email,
          enteredData.password,
          enteredData.confirmPassword,
          setError
        );
        router.replace('/');
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{action}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input {...register('name')} type="text" id="name" />
            {errors.name && <p>{`${errors.name.message}`}</p>}
          </div>
        )}
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input {...register('email')} type="email" id="email" />
          {errors.email && <p>{`${errors.email.message}`}</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input {...register('password')} type="password" id="password" />
          {errors.password && <p>{`${errors.password.message}`}</p>}
        </div>
        {!isLogin && (
          <div className={styles.control}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <p>{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
        )}
        <div className={styles.actions}>
          <button>{!isLogin ? 'Create Account' : 'Login'}</button>

          <Link href={!isLogin ? '/login' : '/sign-up'}>
            {!isLogin ? 'Login with existing account' : 'Create new account'}
          </Link>
          {errors.root && <p>{errors.root.message}</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
