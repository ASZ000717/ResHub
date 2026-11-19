import { useCallback, useEffect, useRef, useState } from 'react';
import { fetcher } from './api';

export function useResource<T>(endpoint: string | null, initialData: T) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const request = useRef<AbortController | null>(null);

  const reload = useCallback(async () => {
    if (!endpoint) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus('loading');

    try {
      const result: T = await fetcher(endpoint, { signal: controller.signal });
      if (!controller.signal.aborted) {
        setData(result);
        setStatus('success');
      }
    } catch {
      if (!controller.signal.aborted) setStatus('error');
    }
  }, [endpoint]);

  useEffect(() => {
    void reload();
    return () => request.current?.abort();
  }, [reload]);

  return { data, setData, status, reload };
}
