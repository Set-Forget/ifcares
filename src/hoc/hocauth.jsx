import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.push('/auth/login');
      }
    }, [auth]);

    if (!auth) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <LoadingSpinner />
          <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
