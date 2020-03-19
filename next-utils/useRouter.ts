import { useRouter as useBaseRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useRouter = () => {
  const router = useBaseRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  return {
    ...router,
    ready,
  };
};
