import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

interface UseFetchOptions {
  reload: any;
  autoFetch?: boolean;
}

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  reload?: UseFetchOptions["reload"],
  autoFetch: UseFetchOptions["autoFetch"] = true,
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [reload]);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
