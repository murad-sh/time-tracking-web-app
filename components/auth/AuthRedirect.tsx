import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status === 'authenticated') {
    router.replace('/dashboard');
  }
  return null;
};

export default AuthRedirect;
