import { useState, useEffect } from 'react';

export interface FloatingListData {
  years: string;
  investors: string;
  project: string;
}

export const useFloatingList = () => {
  const [data, setData] = useState<FloatingListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/floating-list`)
      .then((res) => res.json())
      .then((res) => {
        if (cancelled) return;
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.error("Floating list fetch failed:", err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
