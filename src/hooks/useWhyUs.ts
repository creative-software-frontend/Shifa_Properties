import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/imageUrl";

export interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  banner: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export const useWhyUs = () => {
  const [whyUsItems, setWhyUsItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/why-use-list`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (cancelled) return;
        const formatted: WhyUsItem[] = (res.data ?? []).map((item: Omit<WhyUsItem, 'image'>) => ({
          ...item,
          image: getImageUrl(item.banner),
        }));
        setWhyUsItems(formatted);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
        console.error("Why Us fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { whyUsItems, loading, error };
}
