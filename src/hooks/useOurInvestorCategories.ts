import { useEffect, useState } from "react";

export interface OurInvestorCategory {
  id: number;
  investment_category_id: string;
  title: string;
  rating: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export const useOurInvestorCategories = () => {
  const [categories, setCategories] = useState<OurInvestorCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/our-investor-category`)
      .then((res) => res.json())
      .then((res) => {
        if (cancelled) return;
        setCategories(res.data ?? []);
      })
      .catch((err) => {
        console.error("Our investor categories fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading };
};
