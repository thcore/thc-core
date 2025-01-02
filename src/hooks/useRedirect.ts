import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useRedirectBasedOnAuth = (user: any, loading: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const path = user ? '/dashboard' : '/login';
    router.push(path);
  }, [user, loading, router]);
};
