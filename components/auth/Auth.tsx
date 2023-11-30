import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Auth.module.scss';
import { signIn } from 'next-auth/react';
import {
  signUpSchema,
  SignUpSchemaType,
  loginSchema,
  LoginSchemaType,
} from '@/lib/validations/auth';
import { createUser } from '@/lib/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import AuthForm from './AuthForm';

type ActionType = 'Login' | 'Sign-up';

interface AuthProps {
  action: ActionType;
}

const Auth = ({ action }: AuthProps) => {
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
        redirect: false,
      });
      if (res?.ok) {
        router.push((router.query?.from as string) || '/dashboard');
      } else if (res?.error) {
        if (res.status === 401) {
          setError('root.serverError', {
            type: 'server',
            message: 'Login Failed: Unable to verify your login information.',
          });
        } else {
          setError('root.serverError', {
            type: 'server',
            message: 'An error occurred on the server. Please try again.',
          });
        }
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
        if (error instanceof AxiosError && error.response?.status === 409) {
          console.log('error ', error.response.data);
          setError('email', {
            type: 'server',
            message: error.response.data.message,
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
      <AuthForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        isLogin={isLogin}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default Auth;
