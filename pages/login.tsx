import React, { Fragment } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import AuthRedirect from '@/components/auth/AuthRedirect';

const LoginPage = () => {
  return (
    <Fragment>
      <AuthRedirect />
      <AuthForm action="Login" />
    </Fragment>
  );
};

export default LoginPage;
