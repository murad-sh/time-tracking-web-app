import { UseFormSetError } from 'react-hook-form';
import { LoginSchemaType, SignUpSchemaType } from '@/lib/validation/schemas';

import { signIn } from 'next-auth/react';

export async function createUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  setError: UseFormSetError<SignUpSchemaType>
) {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, confirmPassword }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 422) {
      setError('email', { type: 'server', message: data.message });
      throw new Error(data.message);
    } else {
      throw new Error(data.message || 'Sign-up request failed');
    }
  }

  return data;
}

export async function loginUser(
  email: string,
  password: string,
  setError: UseFormSetError<LoginSchemaType>
) {
  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    setError('password', {
      type: 'server',
      message:
        'Login Failed: Unable to verify your login information. Please double-check your email and password.',
    });
    throw new Error(res.error);
  }
}
