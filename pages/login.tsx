import React, { Fragment } from 'react';
import Auth from '@/components/auth/Auth';

const LoginPage = () => {
  return (
    <Fragment>
      <Auth action="Login" />
    </Fragment>
  );
};

export default LoginPage;
