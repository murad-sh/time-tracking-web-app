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
} from '@/lib/validation/schemas';
import { createUser } from '@/utils/user-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourceConflictError } from '@/utils/exceptions';

type ActionType = 'Login' | 'Sign-up';

type FormProps = {
  action: ActionType;
};

const AuthForm = ({ action }: FormProps) => {
  const isLogin = action === 'Login';

  type AuthSchemaType = typeof isLogin extends true
    ? LoginSchemaType
    : SignUpSchemaType;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
    // ! Experimental, options to test : 'onBlur', 'onChange', 'all'
    mode: 'onBlur',
  });

  async function onSubmit(enteredData: AuthSchemaType) {
    if (action === 'Login') {
      const res = await signIn('credentials', {
        email: enteredData.email,
        password: enteredData.password,
        redirect: false,
      });

      console.log(res);

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
          redirect: false,
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
          {errors.root?.serverError && <p>{errors.root.serverError.message}</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
