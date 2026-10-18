import { useEffect, useState } from "react";
import type { ApiResponse } from "./mock-api";

/** Generic loader for the API layer: loading, latency, error state and reload trigger. */
export function useApi<T>(call: () => Promise<ApiResponse<T>>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLatency(null);
    setError(null);

    call()
      .then((response) => {
        if (cancelled) return;
        setData(response.data);
        setLatency(response.latencyMs);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, ...deps]);

  return {
    data,
    loading,
    latency,
    error,
    reload: () => setReloadKey((key) => key + 1),
  };
}
