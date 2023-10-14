import React from 'react';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  return (
    <section>
      <h1>{`Welcome back ${session?.user?.name}!`}</h1>
    </section>
  );
};

export default DashboardPage;
