import React, { Fragment } from 'react';
import AuthForm from '@/components/auth/AuthForm';

const LoginPage = () => {
  return (
    <Fragment>
      <AuthForm action="Login" />
    </Fragment>
  );
};

export default LoginPage;
