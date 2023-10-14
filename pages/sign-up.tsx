import React, { Fragment } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import AuthRedirect from '@/components/auth/AuthRedirect';

const SignUpPage = () => {
  return (
    <Fragment>
      <AuthRedirect />
      <AuthForm action="Sign-up" />
    </Fragment>
  );
};

export default SignUpPage;
