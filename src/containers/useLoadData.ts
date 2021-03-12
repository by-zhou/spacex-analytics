import { useEffect, useState } from 'react';

export const useLoadData = <R, E extends Error = Error> (fetchFn: () => Promise<R>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<E | undefined>(undefined);

  useEffect(() => {
    fetchFn()
      .then(result => setData(result))
      .catch((err: E) => setError(err))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { loading, data, error };
};
