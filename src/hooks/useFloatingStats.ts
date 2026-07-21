import { useEffect, useState } from "react";

export interface FloatingStats {
  years: string;
  investors: string;
  project: string;
}

export const useFloatingStats = () => {
  const [stats, setStats] = useState<FloatingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/floating-list`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((res) => {
        if (cancelled) return;
        if (res.data && res.data.length > 0) {
          setStats(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Floating stats fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
};
