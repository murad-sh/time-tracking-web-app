import React from 'react';
import { useSession } from 'next-auth/react';

// ! TEMPORARY
const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return null;
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
