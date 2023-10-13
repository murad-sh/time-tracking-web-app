import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { signIn } from 'next-auth/react';
import {
  signUpSchema,
  SignUpSchemaType,
  loginSchema,
  LoginSchemaType,
} from '@/lib/validation/schemas';
import { createUser } from '@/utils/user-actions/create-user';
import { zodResolver } from '@hookform/resolvers/zod';

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
  });

  const router = useRouter();

  async function onSubmit(enteredData: AuthSchemaType) {
    if (action === 'Login') {
      const res = await signIn('credentials', {
        email: enteredData.email,
        password: enteredData.password,
        redirect: false,
      });

      if (res!.error) {
        console.log(res!.error);
        return;
      }

      router.push('/');
    } else {
      try {
        console.log(enteredData);
        const result = await createUser(
          enteredData.name,
          enteredData.email,
          enteredData.password,
          enteredData.confirmPassword
        );
        router.push('/');
        reset();
        console.log(result);
      } catch (error) {
        console.log(error);
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
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
