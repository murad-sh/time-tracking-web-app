import React, { Fragment, ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
